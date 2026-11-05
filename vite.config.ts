import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { createApi } from './server/api';
import { localStore } from './server/local-store';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'ORYALUNE_');
  const handler = createApi(localStore(resolve(process.env.ORYALUNE_DATA_DIR || '.oryalune-data')), {
    password: () => process.env.ORYALUNE_ADMIN_PASSWORD || env.ORYALUNE_ADMIN_PASSWORD,
    secure: false,
  });
  return {
    plugins: [react(), {
      name: 'oryalune-local-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.split('?')[0].includes('/.oryalune-data')) { res.writeHead(404); res.end(); return; }
          next();
        });
        server.middlewares.use('/api', async (req, res) => {
          try {
            let body = '';
            for await (const chunk of req) {
              body += String(chunk);
              if (body.length > 16000) { res.writeHead(413); res.end('{"error":"Demande trop volumineuse."}'); return; }
            }
            const headers = new Headers();
            for (const [key, value] of Object.entries(req.headers)) if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
            const response = await handler(new Request(`http://${req.headers.host}/api${req.url}`, {
              method: req.method, headers, ...(body ? { body } : {}),
            }), req.socket.remoteAddress);
            res.writeHead(response.status, Object.fromEntries(response.headers));
            res.end(await response.text());
          } catch { res.writeHead(503, { 'Content-Type': 'application/json' }); res.end('{"error":"Service indisponible."}'); }
        });
      },
    }],
    server: { fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/.oryalune-data/**'] } },
    optimizeDeps: { exclude: ['lucide-react'] },
  };
});
