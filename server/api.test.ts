import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomBytes, randomUUID } from 'node:crypto';
import { createApi, type Storage } from './api';
import { localStore } from './local-store';
import { services } from '../src/data';
import { commonQuestions, serviceQuestions, closingQuestions } from '../src/consultation-data';
import { defaultProfile, type ConsultationRecord } from '../src/platform-types';

const origin = 'http://localhost:5173';
function request(path: string, method = 'GET', body?: unknown, cookie?: string, requestOrigin = origin) {
  return new Request(`${origin}/api${path}`, { method, headers: { 'Content-Type': 'application/json', Origin: requestOrigin, ...(cookie ? { Cookie: cookie } : {}) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
}
const entry = () => ({ id: randomUUID(), serviceId: 'amour', language: 'fr', answers: { lastName: 'Exemple', firstName: 'Client', age: '35', email: 'client@example.com', reason: 'Préparer ma consultation', relationship: 'En couple' } });

test('enregistrement durable, accès privé, édition du profil et sessions', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'oryalune-api-'));
  let password = randomBytes(24).toString('hex');
  const store = localStore(directory);
  const make = () => createApi(store, { password: () => password, secure: false });
  let handle = make();
  try {
    assert.equal((await handle(request('/admin/consultations'))).status, 401);
    assert.equal((await handle(request('/admin/profile', 'PUT', defaultProfile))).status, 401);
    assert.equal((await handle(request('/consultations', 'GET'))).status, 401);
    const data = entry();
    assert.equal((await handle(request('/consultations', 'POST', data))).status, 201);
    assert.equal((await handle(request('/consultations', 'POST', data))).status, 201);
    assert.equal((await store.list('consultations/')).length, 1);
    // Construct a fresh handler and storage adapter, as after a server restart.
    handle = createApi(localStore(directory), { password: () => password, secure: false });
    const login = await handle(request('/admin/login', 'POST', { password }));
    assert.equal(login.status, 200);
    assert.ok(login.headers.get('set-cookie')?.includes('HttpOnly'));
    assert.ok(login.headers.get('set-cookie')?.includes('SameSite=Strict'));
    const cookie = login.headers.get('set-cookie')!.split(';')[0];
    const response = await handle(request('/admin/consultations', 'GET', undefined, cookie));
    const records = await response.json() as ConsultationRecord[];
    assert.equal(records.length, 1);
    assert.equal(records[0].answers.firstName, data.answers.firstName);
    assert.equal(records[0].serviceId, 'amour');
    assert.ok(records[0].createdAt);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    const profile = { ...defaultProfile, name: 'Voyante de test', phone: '+33123456789', whatsapp: '+33612345678', hours: 'Sur rendez-vous' };
    assert.equal((await handle(request('/admin/profile', 'PUT', profile, cookie, 'https://attacker.example'))).status, 403);
    assert.equal((await handle(request('/admin/profile', 'PUT', profile, cookie))).status, 200);
    assert.deepEqual(await (await handle(request('/profile'))).json(), profile);
    assert.equal((await handle(request('/admin/logout', 'POST', {}, cookie))).status, 200);
    assert.equal((await handle(request('/admin/session', 'GET', undefined, cookie))).status, 401);
    const second = await handle(request('/admin/login', 'POST', { password }));
    const secondCookie = second.headers.get('set-cookie')!.split(';')[0];
    password = randomBytes(24).toString('hex');
    assert.equal((await handle(request('/admin/session', 'GET', undefined, secondCookie))).status, 401);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('validation serveur et refus de fausses confirmations en cas de panne', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'oryalune-validation-'));
  const store = localStore(directory);
  const handle = createApi(store, { password: () => undefined, secure: true });
  try {
    for (const data of [
      { ...entry(), serviceId: 'inconnu' },
      { ...entry(), answers: { ...entry().answers, firstName: '   ' } },
      { ...entry(), answers: { ...entry().answers, age: '-2' } },
      { ...entry(), answers: { ...entry().answers, email: 'incorrect' } },
      { ...entry(), answers: { ...entry().answers, relationship: 'valeur inconnue' } },
      { ...entry(), serviceId: 'tarot' },
    ]) assert.equal((await handle(request('/consultations', 'POST', data))).status, 400);
    assert.equal((await handle(request('/consultations', 'POST', entry(), undefined, 'https://attacker.example'))).status, 403);
    const huge = { ...entry(), padding: 'x'.repeat(17000) };
    assert.equal((await handle(request('/consultations', 'POST', huge))).status, 413);
    assert.equal((await store.list('consultations/')).length, 0);
    assert.equal((await handle(request('/admin/login', 'POST', { password: 'example' }))).status, 503);
    const unavailable: Storage = { ...store, set: async () => { throw new Error('Storage offline'); } };
    const failed = await createApi(unavailable, { password: () => undefined, secure: true })(request('/consultations', 'POST', entry()));
    assert.equal(failed.status, 503);
    assert.equal((await failed.json()).saved, undefined);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('limitation des essais et cookies de production sécurisés', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'oryalune-auth-'));
  const password = randomBytes(24).toString('hex');
  const handle = createApi(localStore(directory), { password: () => password, secure: true });
  try {
    for (let i = 0; i < 5; i++) assert.equal((await handle(request('/admin/login', 'POST', { password: 'incorrect' }), 'ip-one')).status, 401);
    assert.equal((await handle(request('/admin/login', 'POST', { password }), 'ip-one')).status, 429);
    const login = await handle(request('/admin/login', 'POST', { password }), 'ip-two');
    assert.equal(login.status, 200);
    assert.ok(login.headers.get('set-cookie')?.includes('; Secure'));
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('tous les services et toutes les réponses restent lisibles après redémarrage', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'oryalune-services-'));
  const password = randomBytes(24).toString('hex');
  const make = () => createApi(localStore(directory), { password: () => password, secure: false });
  try {
    let handle = make();
    const submitted = services.map(service => ({
      ...entry(), serviceId: service.id,
      answers: {
        ...entry().answers,
        ...Object.fromEntries([...commonQuestions, ...serviceQuestions[service.id], ...closingQuestions]
          .map(question => [question.id, question.options?.[0] ?? `Réponse ${question.id} : accents éà, apostrophe ' et\nseconde ligne`])),
      },
    }));
    for (const data of submitted) {
      const response = await handle(request('/consultations', 'POST', data));
      assert.equal(response.status, 201);
      assert.deepEqual(await response.json(), { saved: true });
    }
    const changed = { ...submitted[0], answers: { ...submitted[0].answers, reason: 'Modification' } };
    assert.equal((await handle(request('/consultations', 'POST', changed))).status, 409);
    handle = make();
    const login = await handle(request('/admin/login', 'POST', { password }));
    const cookie = login.headers.get('set-cookie')!.split(';')[0];
    const records = await (await handle(request('/admin/consultations', 'GET', undefined, cookie))).json() as ConsultationRecord[];
    assert.equal(records.length, submitted.length);
    for (const data of submitted) {
      const stored = records.find(record => record.id === data.id)!;
      assert.equal(stored.serviceId, data.serviceId);
      assert.equal(stored.language, data.language);
      const expected: Record<string, string> = { ...data.answers };
      delete expected.relationship;
      if (data.serviceId === 'amour') expected.relationship = data.answers.relationship;
      assert.deepEqual(stored.answers, expected);
    }
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('tous les champs du profil persistent ; les saisies invalides ne les écrasent pas', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'oryalune-profile-'));
  const password = randomBytes(24).toString('hex');
  const make = () => createApi(localStore(directory), { password: () => password, secure: false });
  try {
    let handle = make();
    const login = await handle(request('/admin/login', 'POST', { password }));
    const cookie = login.headers.get('set-cookie')!.split(';')[0];
    const profile = { name: 'Voyante de test', description: "Présentation avec accents et\nplusieurs lignes.", phone: '+33123456789', whatsapp: '+2290100000000', email: 'test@example.com', hours: 'Lundi : 9 h – 18 h' };
    assert.deepEqual(await (await handle(request('/admin/profile', 'PUT', profile, cookie))).json(), profile);
    handle = make();
    assert.equal((await handle(request('/admin/session', 'GET', undefined, cookie))).status, 200);
    assert.deepEqual(await (await handle(request('/profile'))).json(), profile);
    for (const invalid of [{ name: ' ' }, { description: 'x'.repeat(1001) }, { phone: '0123456789' }, { whatsapp: 'invalide' }, { email: 'incorrect' }, { hours: 'x'.repeat(255) }]) {
      assert.equal((await handle(request('/admin/profile', 'PUT', { ...profile, ...invalid }, cookie))).status, 400);
      assert.deepEqual(await (await handle(request('/profile'))).json(), profile);
    }
    const cleared = { ...profile, description: '', phone: '', whatsapp: '', email: '', hours: '' };
    assert.equal((await handle(request('/admin/profile', 'PUT', cleared, cookie))).status, 200);
    assert.deepEqual(await (await make()(request('/profile'))).json(), cleared);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('une panne pendant la sauvegarde admin conserve le profil précédent', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'oryalune-profile-failure-'));
  const password = randomBytes(24).toString('hex');
  const store = localStore(directory);
  try {
    const handle = createApi(store, { password: () => password, secure: false });
    const login = await handle(request('/admin/login', 'POST', { password }));
    const cookie = login.headers.get('set-cookie')!.split(';')[0];
    await store.set('profile', defaultProfile);
    const failing = createApi({ ...store, set: async () => { throw new Error('Storage offline'); } }, { password: () => password, secure: false });
    const response = await failing(request('/admin/profile', 'PUT', { ...defaultProfile, name: 'Non enregistré' }, cookie));
    assert.equal(response.status, 503);
    assert.ok((await response.json()).error);
    assert.deepEqual(await store.get('profile'), defaultProfile);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
