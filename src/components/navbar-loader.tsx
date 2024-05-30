import { createClient } from "@/utils/supabase/server";
import NavbarClient, { ClientButton } from "./navbar";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import ClientCart from "./navbar";
import { signOut } from "@/app/actions/actions";

export default function Navbar() {
  const links = [{ label: "Order", link: "/order" }];

  return (
    <nav className="w-full flex flex-col md:flex-row justify-between items-center md:h-32 border-b-4 border-primary/75 sticky top-0 z-10 bg-background/90">
      <div className="h-full">
        <Link href="/" className="flex items-center h-full">
          <img
            src="dinedash.png"
            alt="Logo"
            className="h-32 md:h-full rounded-full p-4"
          />
          <span className="text-3xl font-funky">DineDash</span>
        </Link>
      </div>

      <div className="flex flex-col w-full md:w-auto md:flex-row gap-1 md:gap-4 p-2">
        {links.map((link) => (
          <Link href={link.link} key={link.link} className="w-full p-0.5">
            <ClientButton href={link.link} className="w-full">
              {link.label}
            </ClientButton>
          </Link>
        ))}
        <Suspense>
          <Loader />
        </Suspense>
        <Link href="/cart" className="w-full p-0.5">
          <ClientCart />
        </Link>
      </div>
    </nav>
  );
}

async function Loader() {
  setInterval(() => {}, 5000);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user == null)
    return (
      <Link href="/login" className="w-full p-0.5">
        <ClientButton href={"/login"} className="w-full">
          Login
        </ClientButton>
      </Link>
    );

  const link = { label: "My Account", link: "/my-account" };

  return (
    <>
      <Link href={link.link} key={link.link} className="w-full p-0.5">
        <ClientButton href={link.link} className="w-full">
          {link.label}
        </ClientButton>
      </Link>
      <form action={signOut} className="w-full p-0.5">
        <Button variant={"outline"} className="w-full">
          SignOut
        </Button>
      </form>
    </>
  );
}