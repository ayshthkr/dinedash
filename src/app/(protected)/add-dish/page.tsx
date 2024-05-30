import { createClient } from "@/utils/supabase/server";
import Client from "./client";
import { redirect } from "next/navigation";
import Form from "./form";

async function Page() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!session) return redirect("/login");

  return <Form />;
}

export default Page;
