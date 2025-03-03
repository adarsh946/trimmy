import supabase, { supabaseUrl } from "./db";

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

export interface signupProps {
  name: string;
  email: string;
  password: string;
  profile_pic: string;
}

export async function signup({
  email,
  password,
  profile_pic,
  name,
}: signupProps | Record<string, string>) {
  const fileName = `image-${name.split(" ").join("-")}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}
