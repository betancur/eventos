export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'attendee' | 'organizer' | 'admin';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export const USER_ROLES: Record<UserRole, string> = {
  attendee: 'Attendee',
  organizer: 'Organizer', 
  admin: 'Administrator'
};

export const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roleHierarchy: Record<UserRole, number> = {
    attendee: 1,
    organizer: 2,
    admin: 3
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};

export const isOrganizer = (user: User | null): boolean => {
  return user?.role === 'organizer' || user?.role === 'admin';
};

export const isAttendee = (user: User | null): boolean => {
  return user?.role === 'attendee';
};
