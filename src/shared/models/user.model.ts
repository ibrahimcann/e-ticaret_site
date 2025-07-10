export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  avatar?: string;
  /** Kullanıcının adı */
  firstName?: string;
  /** Kullanıcının soyadı */
  lastName?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface UserProfile {
  id: string;
  userId: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
}