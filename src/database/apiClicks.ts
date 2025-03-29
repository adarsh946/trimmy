import supabase from "./db";

export async function getClicks(urlIds: any) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", urlIds);
  if (error) {
    console.error(error);
    throw new Error("Unable to load clicks");
  }
  return data;
}
