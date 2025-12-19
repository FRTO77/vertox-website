// Secure auth utilities using Supabase authentication
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  nickname: string;
  email?: string;
  phone?: string;
  country?: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'premium' | 'enterprise';
  created_at: string;
  updated_at: string;
}

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

// Convert profile to User format for backward compatibility
function profileToUser(profile: Profile): User {
  return {
    id: profile.id,
    nickname: profile.nickname,
    email: profile.email,
    phone: profile.phone,
    country: profile.country,
    avatar: profile.avatar,
    plan: profile.plan as User['plan'],
    createdAt: profile.created_at,
  };
}

export async function signUp(email: string, password: string, nickname: string): Promise<User> {
  const redirectUrl = `${window.location.origin}/`;
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        nickname,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('Failed to create account');
  }

  // Wait briefly for the trigger to create the profile
  await new Promise(resolve => setTimeout(resolve, 500));

  const profile = await getProfile(data.user.id);
  if (!profile) {
    throw new Error('Failed to create user profile');
  }

  return profileToUser(profile);
}

export async function signIn(email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('Invalid credentials');
  }

  const profile = await getProfile(data.user.id);
  if (!profile) {
    throw new Error('User profile not found');
  }

  return profileToUser(profile);
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }

  const profile = await getProfile(user.id);
  if (!profile) {
    return null;
  }

  return profileToUser(profile);
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Profile;
}

export async function updateUser(userId: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
  const updateData: Record<string, unknown> = {};
  
  if (updates.nickname !== undefined) updateData.nickname = updates.nickname;
  if (updates.email !== undefined) updateData.email = updates.email;
  if (updates.phone !== undefined) updateData.phone = updates.phone;
  if (updates.country !== undefined) updateData.country = updates.country;
  if (updates.avatar !== undefined) updateData.avatar = updates.avatar;
  if (updates.plan !== undefined) updateData.plan = updates.plan;

  const { data, error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return profileToUser(data as Profile);
}

export async function deleteAccount(userId: string): Promise<void> {
  // Note: The profile will be deleted automatically due to CASCADE
  // For complete account deletion, you would need a server-side function
  // to delete the auth.users entry
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }

  await signOut();
}

export function isAuthenticated(): boolean {
  // This is a synchronous check - for actual auth state, use getSession()
  return false;
}

// Subscribe to auth state changes
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      // Defer profile fetch to avoid deadlock
      setTimeout(async () => {
        const profile = await getProfile(session.user.id);
        if (profile) {
          callback(profileToUser(profile));
        } else {
          callback(null);
        }
      }, 0);
    } else {
      callback(null);
    }
  });
}
