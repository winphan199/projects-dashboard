import { getSupabaseServerClient } from "@/lib/supabase/server";

import { Tables } from "../../../database.types";

export async function getAccount(): Promise<Tables<"accounts">> {
  const serverClient = getSupabaseServerClient();
  const user = await serverClient.auth.getUser();
  if (!user.data.user) {
    throw new Error("User not found");
  }

  const { data: account, error } = await serverClient.from("accounts").select("*").eq("id", user.data.user.id).single();
  if (error) {
    throw new Error("Account not found");
  }
  return account;
}
