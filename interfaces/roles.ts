// roles.ts
export type Role = 'admin' | 'doctor' | 'secretaria';

export const MENU_PERMISSIONS: Record<Role, string[]> = {
  admin: ['/', '/citas', '/pacientes', '/estudios', '/medicamentos', '/enfermedades', '/admin', '/manual','/pageIA'],
  doctor: ['/citas', '/medicamentos', '/enfermedades', '/manual','/pageIA'],
  secretaria: ['/', '/pacientes', '/manual','/pageIA'],
};
