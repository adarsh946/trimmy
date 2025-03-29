import supabase from "./db";

export async function getUrls(user_id: any) {
  const { data, error } = await supabase
    .from("url")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error);
    throw new Error("unable to load urls..");
  }

  return data;
}
