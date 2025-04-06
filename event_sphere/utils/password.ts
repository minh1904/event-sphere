import crypto from 'crypto';

export function saltAndHashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}
