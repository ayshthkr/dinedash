"use server";

import { createClient } from "@/utils/supabase/server";
import { parseWithZod } from "@conform-to/zod";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { schema as commentSchema } from "../(protected)/order/[slug]/schema";
import { schema as helpSchema } from "../customer-service/schema";
import { revalidatePath } from "next/cache";

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
  const { error } = await supabase.auth.signOut();
  if (error) console.error(error.message);
  revalidatePath("/", "layout");
  return redirect("/login");
};

export const placeOrder = () => {
  setInterval(() => {}, 3000);

  return redirect("/order-placed");
};

export const addComment = async (
  slug: string,
  prevState: unknown,
  formdata: FormData
) => {
  const submission = parseWithZod(formdata, {
    schema: commentSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const supabase = createClient();
  const { data } = await supabase
    .from("dishes")
    .select("comments")
    .eq("slug", slug)
    .single();

  const comments = [
    { comment: submission.value.comment, name: submission.value.name },
    ...(data?.comments ?? []),
  ];
  const { error } = await supabase
    .from("dishes")
    .update({
      comments,
    })
    .eq("slug", slug);

  revalidatePath("/", "layout");
};

export async function addHelp(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: helpSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("tickets")
    .insert({
      name: submission.value.name,
      message: submission.value.message,
      email: submission.value.email,
    })
    .select()
    .single();

  if (error) console.error(error);

  revalidatePath("/", "layout");
  redirect(`/customer-service/success?id=${data?.id}`);
}

export const signUp = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: "test@gmail.com",
    password: "testuser",
  });

  if (error) console.error(error.message);

  redirect("/order");
};
