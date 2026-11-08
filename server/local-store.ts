import { link, mkdir, readFile, rename, readdir, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import type { Storage } from './api';

export function localStore(directory: string): Storage {
  const file = (key: string) => join(directory, `${Buffer.from(key).toString('hex')}.json`);
  return {
    async create(key, value) {
      await mkdir(directory, { recursive: true, mode: 0o700 });
      // A hard link publishes a complete file only if the destination is absent.
      const temporary = join(directory, `.tmp-${randomUUID()}`);
      await writeFile(temporary, JSON.stringify(value), { mode: 0o600 });
      try { await link(temporary, file(key)); return true; }
      catch (error) { if ((error as NodeJS.ErrnoException).code === 'EEXIST') return false; throw error; }
      finally { await unlink(temporary); }
    },
    async get<T>(key: string): Promise<T | null> {
      try { return JSON.parse(await readFile(file(key), 'utf8')) as T; }
      catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null; throw error; }
    },
    async set(key, value) {
      await mkdir(directory, { recursive: true, mode: 0o700 });
      const temporary = join(directory, `.tmp-${randomUUID()}`);
      await writeFile(temporary, JSON.stringify(value), { mode: 0o600 });
      await rename(temporary, file(key));
    },
    async list(prefix) {
      await mkdir(directory, { recursive: true, mode: 0o700 });
      return (await readdir(directory)).filter(name => name.endsWith('.json')).map(name => Buffer.from(name.slice(0, -5), 'hex').toString()).filter(key => key.startsWith(prefix));
    },
    async delete(key) {
      try { await unlink(file(key)); } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
    },
  };
}
