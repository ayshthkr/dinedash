import { createClient } from "@/utils/supabase/server";
import Grid from "./grid";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Cart from "./cart";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from("dishes").select("*");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4 py-4 px-12 md:px-16 lg:px-24">
          <h2 className="text-2xl font-bold">Your cart</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4 px-8 md:px-16 lg:px-24">
          <Grid dishes={data || []} />
        </div>
        <div className="w-full py-4 px-8 md:px-16 lg:px-24">
          <AccountPage user={user} />
        </div>
      </main>
      <footer className=" py-4 px-6 m-6 font-funky border text-center">
        <p>And more coming soon...</p>
      </footer>
    </div>
  );
}

function AccountPage({ user }: { user: User | null }) {
  if (user == null)
    return (
      <Link href="/login">
        <Button
          variant={"destructive"}
          className="p-4 font-funky font-bold w-full text-center"
        >
          No Account found. Click to redirect to login page
        </Button>
      </Link>
    );

  return (
    <div className="border font-funky p-4 ">
      <Cart />
    </div>
  );
}
