import type { ConsultationRecord, VoyantProfile } from './platform-types';

export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`/api${path}`, { ...options, credentials: 'same-origin', headers: { 'Content-Type': 'application/json', ...options.headers } });
  } catch { throw new ApiError(0, 'Connexion impossible. Vos réponses sont conservées dans ce formulaire ; veuillez réessayer.'); }
  let data;
  try { data = await response.json(); }
  catch { throw new ApiError(response.status, 'Le service est indisponible. Veuillez réessayer.'); }
  if (!response.ok) throw new ApiError(response.status, data.error || 'La demande a échoué.');
  return data as T;
}
export const saveConsultation = (entry: Omit<ConsultationRecord, 'createdAt'>) => api<{ saved: boolean }>('/consultations', { method: 'POST', body: JSON.stringify(entry) });
export const getProfile = () => api<VoyantProfile>('/profile');
