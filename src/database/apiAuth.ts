import supabase from "./db";

export async function login({ email, password }: Record<string, string>) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);
  if (!session.session) return null;
  return session.session?.user;
}
