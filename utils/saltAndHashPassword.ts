// utils/password.ts
import bcrypt from 'bcryptjs'; // O la librería que estés usando para el hashing

export const saltAndHashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10); // Genera un salt
  const hash = bcrypt.hashSync(password, salt); // Hashea el password
  return hash;
};
