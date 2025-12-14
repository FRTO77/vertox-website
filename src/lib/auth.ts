// Simple auth utilities using localStorage and Web Crypto API for SHA-256 hashing

export interface User {
  id: string;
  nickname: string;
  email?: string;
  phone?: string;
  country?: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'premium' | 'enterprise';
  createdAt: string;
}

const USERS_KEY = 'vertox_users';
const CURRENT_USER_KEY = 'vertox_current_user';

// SHA-256 hash function using Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function getUsers(): Record<string, { user: User; passwordHash: string }> {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : {};
}

export function saveUsers(users: Record<string, { user: User; passwordHash: string }>): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function signUp(nickname: string, password: string): Promise<User> {
  const users = getUsers();
  
  // Check if nickname already exists
  const exists = Object.values(users).some(u => u.user.nickname.toLowerCase() === nickname.toLowerCase());
  if (exists) {
    throw new Error('Nickname already taken');
  }
  
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
  
  const passwordHash = await hashPassword(password);
  const user: User = {
    id: generateId(),
    nickname,
    plan: 'free',
    createdAt: new Date().toISOString(),
  };
  
  users[user.id] = { user, passwordHash };
  saveUsers(users);
  
  return user;
}

export async function signIn(nickname: string, password: string): Promise<User> {
  const users = getUsers();
  const passwordHash = await hashPassword(password);
  
  const entry = Object.values(users).find(
    u => u.user.nickname.toLowerCase() === nickname.toLowerCase() && u.passwordHash === passwordHash
  );
  
  if (!entry) {
    throw new Error('Invalid nickname or password');
  }
  
  return entry.user;
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function getCurrentUser(): User | null {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function updateUser(userId: string, updates: Partial<User>): User {
  const users = getUsers();
  const entry = users[userId];
  
  if (!entry) {
    throw new Error('User not found');
  }
  
  entry.user = { ...entry.user, ...updates };
  saveUsers(users);
  setCurrentUser(entry.user);
  
  return entry.user;
}

export async function changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
  const users = getUsers();
  const entry = users[userId];
  
  if (!entry) {
    throw new Error('User not found');
  }
  
  const oldHash = await hashPassword(oldPassword);
  if (entry.passwordHash !== oldHash) {
    throw new Error('Current password is incorrect');
  }
  
  if (newPassword.length < 8) {
    throw new Error('New password must be at least 8 characters');
  }
  
  entry.passwordHash = await hashPassword(newPassword);
  saveUsers(users);
}

export function deleteAccount(userId: string): void {
  const users = getUsers();
  delete users[userId];
  saveUsers(users);
  setCurrentUser(null);
}

export function signOut(): void {
  setCurrentUser(null);
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
