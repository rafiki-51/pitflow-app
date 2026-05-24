import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/types/auth";

type UserProfile = {
  id: string;
  full_name: string;
  role: UserRole;
};

export async function signInWithPassword(email: string, password: string) {
  const supabase = createClient();

  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function getProfileByUserId(userId: string): Promise<UserProfile> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", userId)
    .is("deleted_at", null)
    .single();

  if (error) {
    throw new Error(`Could not load active profile: ${error.message}`);
  }

  if (!data) {
    throw new Error("No active profile found");
  }

  return data as UserProfile;
}

export async function getCurrentProfile(): Promise<UserProfile> {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(`Could not load authenticated user: ${userError.message}`);
  }

  if (!user) {
    throw new Error("No authenticated user found");
  }

  return getProfileByUserId(user.id);
}

export async function signOut() {
  const supabase = createClient();

  return supabase.auth.signOut();
}
