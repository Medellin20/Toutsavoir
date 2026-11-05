import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { services } from '../src/data';
import { commonQuestions, serviceQuestions, closingQuestions } from '../src/consultation-data';
import { defaultProfile, type ConsultationRecord, type FeedbackRecord, type VoyantProfile } from '../src/platform-types';

export interface Storage {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown): Promise<void>;
  list(prefix: string): Promise<string[]>;
  delete(key: string): Promise<void>;
}
class HttpError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
const hash = (text: string) => createHash('sha256').update(text).digest('hex');
const json = (data: unknown, status = 200, headers: Record<string, string> = {}) => new Response(JSON.stringify(data), {
  status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers },
});
function requireText(value: unknown, max: number, required = false): string {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new HttpError(400, 'Informations invalides ou incomplètes.');
  return value.trim();
}
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateProfile(data: Record<string, unknown>): VoyantProfile {
  const result = Object.fromEntries(Object.keys(defaultProfile).map(key => [key, requireText(data[key], key === 'description' ? 1000 : 254, key === 'name')])) as unknown as VoyantProfile;
  if (result.email && !emailPattern.test(result.email)) throw new HttpError(400, 'Adresse e-mail invalide.');
  for (const value of [result.phone, result.whatsapp]) if (value && !/^\+[1-9][\d ()-]{5,24}$/.test(value)) throw new HttpError(400, 'Indiquez les numéros avec leur indicatif international (+...).');
  return result;
}
function validateConsultation(data: Record<string, unknown>): ConsultationRecord {
  const serviceId = requireText(data.serviceId, 40, true);
  if (!services.some(service => service.id === serviceId)) throw new HttpError(400, 'Service inconnu.');
  const id = requireText(data.id, 36, true);
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(id)) throw new HttpError(400, 'Identifiant invalide.');
  if (!data.answers || typeof data.answers !== 'object' || Array.isArray(data.answers)) throw new HttpError(400, 'Réponses invalides.');
  const raw = data.answers as Record<string, unknown>;
  const answers: Record<string, string> = {};
  for (const field of ['lastName', 'firstName', 'age', 'email']) answers[field] = requireText(raw[field], field === 'email' ? 254 : 80, true);
  if (!/^\d{1,3}$/.test(answers.age) || Number(answers.age) < 1 || Number(answers.age) > 120 || !emailPattern.test(answers.email)) throw new HttpError(400, 'Âge ou adresse e-mail invalide.');
  for (const question of [...commonQuestions, ...serviceQuestions[serviceId], ...closingQuestions]) {
    const answer = requireText(raw[question.id] ?? '', 500, question.required);
    if (answer && question.options && !question.options.includes(answer)) throw new HttpError(400, 'Réponse non reconnue.');
    answers[question.id] = answer;
  }
  const language = requireText(data.language, 2, true);
  if (!['fr','nl','en','es','it','de','pt','ar','pl'].includes(language)) throw new HttpError(400, 'Langue invalide.');
  return { id, serviceId, language, answers, createdAt: new Date().toISOString() };
}

function validateFeedback(data: Record<string, unknown>): FeedbackRecord {
  const id = requireText(data.id, 36, true);
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(id)) throw new HttpError(400, 'Identifiant invalide.');
  if (data.kind !== 'review' && data.kind !== 'suggestion') throw new HttpError(400, 'Type de message invalide.');
  const name = requireText(data.name, 80, true);
  const email = requireText(data.email ?? '', 254);
  const message = requireText(data.message, 3000, true);
  if (email && !emailPattern.test(email)) throw new HttpError(400, 'Adresse e-mail invalide.');
  if (data.kind === 'review' && (typeof data.rating !== 'number' || !Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5)) throw new HttpError(400, 'Choisissez une note de 1 à 5.');
  return { id, kind: data.kind, name, email, message, rating: data.kind === 'review' ? data.rating as number : null, createdAt: new Date().toISOString() };
}

export function createApi(store: Storage, options: { password: () => string | undefined; secure: boolean }) {
  const cookie = (token: string, maxAge = 28800) => `oryalune_admin=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${options.secure ? '; Secure' : ''}`;
  return async (request: Request, clientIp = 'unknown'): Promise<Response> => {
    try {
      const url = new URL(request.url);
      const path = url.pathname.replace(/^\/api/, '').replace(/\/$/, '') || '/';
      if (!['GET', 'POST', 'PUT'].includes(request.method)) throw new HttpError(405, 'Méthode non autorisée.');
      if (request.method !== 'GET') {
        const origin = request.headers.get('origin');
        if (origin && origin !== url.origin) throw new HttpError(403, 'Origine non autorisée.');
        if (!request.headers.get('content-type')?.startsWith('application/json')) throw new HttpError(415, 'Format JSON requis.');
      }
      const readBody = async () => {
        const text = await request.text();
        if (text.length > 16000) throw new HttpError(413, 'La demande est trop volumineuse.');
        let body;
        try { body = JSON.parse(text); } catch { throw new HttpError(400, 'Format JSON invalide.'); }
        if (!body || typeof body !== 'object' || Array.isArray(body)) throw new HttpError(400, 'Données invalides.');
        return body as Record<string, unknown>;
      };
      if (path === '/profile' && request.method === 'GET') return json(await store.get<VoyantProfile>('profile') ?? defaultProfile);
      if (path === '/consultations' && request.method === 'POST') {
        const entry = validateConsultation(await readBody());
        const key = `consultations/${entry.id}`;
        // Stable client UUID makes retries overwrite the same request rather than create duplicates.
        const existing = await store.get<ConsultationRecord>(key);
        if (existing && (existing.serviceId !== entry.serviceId || JSON.stringify(existing.answers) !== JSON.stringify(entry.answers))) throw new HttpError(409, 'Cette demande existe déjà.');
        await store.set(key, existing ?? entry);
        return json({ saved: true }, 201);
      }
      if (path === '/feedback' && request.method === 'POST') {
        const entry = validateFeedback(await readBody());
        const key = `feedback/${entry.id}`;
        const existing = await store.get<FeedbackRecord>(key);
        if (existing && ['kind', 'name', 'email', 'message', 'rating'].some(field => existing[field as keyof FeedbackRecord] !== entry[field as keyof FeedbackRecord])) throw new HttpError(409, 'Ce message existe déjà.');
        await store.set(key, existing ?? entry);
        return json({ saved: true }, 201);
      }
      const password = options.password();
      if (!password) throw new HttpError(503, 'Accès admin indisponible : configurez ORYALUNE_ADMIN_PASSWORD dans les variables serveur de l’hébergement, puis redéployez le site.');
      if (password.length < 12 || password.length > 256) throw new HttpError(503, 'Configuration admin invalide : ORYALUNE_ADMIN_PASSWORD doit contenir entre 12 et 256 caractères. Corrigez la variable serveur, puis redéployez le site.');
      if (path === '/admin/login' && request.method === 'POST') {
        const key = `login-attempts/${hash(clientIp)}`;
        const attempts = await store.get<{ count: number; until: number }>(key);
        if (attempts && attempts.until > Date.now() && attempts.count >= 5) throw new HttpError(429, 'Trop de tentatives. Réessayez dans 15 minutes.');
        const data = await readBody();
        const supplied = requireText(data.password, 256, true);
        if (!timingSafeEqual(Buffer.from(hash(supplied)), Buffer.from(hash(password)))) {
          await store.set(key, { count: attempts && attempts.until > Date.now() ? attempts.count + 1 : 1, until: attempts && attempts.until > Date.now() ? attempts.until : Date.now() + 900000 });
          throw new HttpError(401, 'Mot de passe incorrect.');
        }
        await store.delete(key);
        const token = randomBytes(32).toString('hex');
        await store.set(`sessions/${hash(token)}`, { expires: Date.now() + 28800000, passwordHash: hash(password) });
        return json({ authenticated: true }, 200, { 'Set-Cookie': cookie(token) });
      }
      const token = request.headers.get('cookie')?.split(';').map(part => part.trim()).find(part => part.startsWith('oryalune_admin='))?.slice('oryalune_admin='.length);
      const sessionKey = token && /^[a-f0-9]{64}$/.test(token) ? `sessions/${hash(token)}` : '';
      const session = sessionKey ? await store.get<{ expires: number; passwordHash: string }>(sessionKey) : null;
      if (!session || session.expires <= Date.now() || session.passwordHash !== hash(password)) throw new HttpError(401, 'Connectez-vous à l’espace admin.');
      if (request.method !== 'GET' && request.headers.get('origin') !== url.origin) throw new HttpError(403, 'Origine non autorisée.');
      if (path === '/admin/session' && request.method === 'GET') return json({ authenticated: true });
      if (path === '/admin/logout' && request.method === 'POST') {
        await store.delete(sessionKey);
        return json({ authenticated: false }, 200, { 'Set-Cookie': cookie('', 0) });
      }
      if (path === '/admin/consultations' && request.method === 'GET') {
        const keys = (await store.list('consultations/')).sort().reverse();
        const records = await Promise.all(keys.map(key => store.get<ConsultationRecord>(key)));
        return json(records.filter(Boolean).sort((a, b) => b!.createdAt.localeCompare(a!.createdAt)));
      }
      if (path === '/admin/feedback' && request.method === 'GET') {
        const keys = await store.list('feedback/');
        const records = await Promise.all(keys.map(key => store.get<FeedbackRecord>(key)));
        return json(records.filter(Boolean).sort((a, b) => b!.createdAt.localeCompare(a!.createdAt)));
      }
      if (path === '/admin/profile' && request.method === 'PUT') {
        const profile = validateProfile(await readBody());
        await store.set('profile', profile);
        return json(profile);
      }
      throw new HttpError(404, 'Page introuvable.');
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message }, error.status);
      // Never log submitted answers, credentials or storage errors containing request data.
      return json({ error: 'Le stockage est momentanément indisponible. Veuillez réessayer.' }, 503);
    }
  };
}
