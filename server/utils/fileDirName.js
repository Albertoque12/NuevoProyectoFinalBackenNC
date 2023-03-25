import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default function fileDirName(meta) {
  const __filename = fileURLToPath(meta.url);

  const __dirname = dirname(__filename);

  return { __dirname, __filename };
}

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);