import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm = 'aes-256-cbc';

export const encrypted = async (password: string) => {
  const cipher = createCipheriv(
    algorithm,
    Buffer.from(process.env.ENCRYPTED_KEY, 'hex'),
    Buffer.from(process.env.ENCRYPTED_IV, 'hex'),
  );
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export const decrypted = async (encryptedText: string) => {
  const decipher = createDecipheriv(
    algorithm,
    Buffer.from(process.env.ENCRYPTED_KEY, 'hex'),
    Buffer.from(process.env.ENCRYPTED_IV, 'hex'),
  );
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
