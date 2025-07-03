export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  avatar?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface UserProfile {
  id: string;
  userId: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
}