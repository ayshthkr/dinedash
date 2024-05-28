"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signInWithGithub = async () => {
  const supabase = createClient();
  const origin = headers().get("origin");
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) console.error(error.message);

  if (data.url) return redirect(data.url);

  redirect("/error");
};

export const signOut = async () => {
  const supabase = createClient();
  const {error} = await supabase.auth.signOut();
  if(error) console.error(error.message);
  return redirect('/login');
};

export const addDish = async () => {
  
}
