import { randomBytes } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { loadEnv } from 'vite';
const file = new URL('../.env.local', import.meta.url);
let content = '';
try { content = await readFile(file, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
if (!/^ORYALUNE_ADMIN_PASSWORD=.+$/m.test(content)) {
  content = content.replace(/^ORYALUNE_ADMIN_PASSWORD=.*\n?/m, '');
  await writeFile(file, `${content.trimEnd()}\nORYALUNE_ADMIN_PASSWORD=${randomBytes(24).toString('base64url')}\n`, { mode: 0o600 });
  console.log('Accès admin local créé. Le mot de passe est dans .env.local (non affiché, non versionné).');
} else {
  const password = loadEnv('development', process.cwd(), 'ORYALUNE_').ORYALUNE_ADMIN_PASSWORD;
  if (!password || password.length < 12 || password.length > 256) {
    console.error('Mot de passe admin invalide dans .env.local : utilisez entre 12 et 256 caractères, puis redémarrez Vite.');
    process.exitCode = 1;
  } else {
    console.log('Le mot de passe admin local est valide ; il a été conservé.');
  }
}
