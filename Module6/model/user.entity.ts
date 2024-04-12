export type Role = 'admin' | 'user';

export interface UserEntity {
  id: string;
  role: Role;
  email: string;
  password: string;
}

