import { getStore } from '@netlify/blobs';
import { createApi, type Storage } from '../../server/api';

export default async function handler(request: Request, context: { ip?: string }) {
  const blobs = getStore({ name: 'oryalune-platform', consistency: 'strong' });
  const store: Storage = {
    get: <T>(key: string) => blobs.get(key, { type: 'json' }) as Promise<T | null>,
    set: async (key, value) => { await blobs.setJSON(key, value); },
    delete: (key) => blobs.delete(key),
    list: async (prefix) => {
      const keys: string[] = [];
      for await (const page of blobs.list({ prefix, paginate: true })) keys.push(...page.blobs.map(blob => blob.key));
      return keys;
    },
  };
  return createApi(store, { password: () => process.env.ORYALUNE_ADMIN_PASSWORD, secure: true })(request, context.ip);
}

export const config = { path: '/api/*' };
