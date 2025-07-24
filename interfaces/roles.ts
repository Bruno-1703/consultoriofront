// roles.ts
export type Role = 'admin' | 'doctor' | 'secretaria';

export const MENU_PERMISSIONS: Record<Role, string[]> = {
  admin: ['/', '/citas', '/pacientes', '/estudios', '/medicamentos', '/enfermedades', '/admin'],
  doctor: ['/citas', '/medicamentos', '/enfermedades'],
  secretaria: ['/', '/pacientes'],
};
