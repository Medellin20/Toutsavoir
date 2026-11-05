import { randomBytes } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
const file = new URL('../.env.local', import.meta.url);
let content = '';
try { content = await readFile(file, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
if (!/^ORYALUNE_ADMIN_PASSWORD=.+$/m.test(content)) {
  content = content.replace(/^ORYALUNE_ADMIN_PASSWORD=.*\n?/m, '');
  await writeFile(file, `${content.trimEnd()}\nORYALUNE_ADMIN_PASSWORD=${randomBytes(24).toString('base64url')}\n`, { mode: 0o600 });
  console.log('Accès admin local créé. Le mot de passe est dans .env.local (non affiché, non versionné).');
} else {
  console.log('Le mot de passe admin existe déjà dans .env.local ; il a été conservé.');
}
