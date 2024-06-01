import { createClient } from "@/utils/supabase/server";
import { ClientButton } from "./navbar";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import ClientCart from "./navbar";
import { signOut } from "@/app/actions/actions";
import Image from "next/image";
import { LoaderIcon } from "lucide-react";
import ThemeSwitcher from "./theme-switcher";

export default function Navbar() {
  const links = [
    { label: "Order", link: "/order" },
    { label: "About Us", link: "/about" },
    { label: "Customer Service", link: "/customer-service" },
  ];

  return (
    <nav className="w-full flex flex-col md:flex-row justify-between items-center md:h-32 border-b-4 border-primary/75 md:sticky md:top-0 md:z-10 bg-background/90">
      <div className="h-full">
        <Link href="/" className="flex items-center h-full">
          <Image
            src="/dinedash.png"
            alt="Logo"
            className="h-32 w-full md:h-full rounded-full p-4"
            width={500}
            height={500}
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
        <Suspense fallback={<Skeleton />}>
          <Loader />
        </Suspense>
        <Link href="/cart" className="w-full p-0.5">
          <ClientCart />
        </Link>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

async function Loader() {
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

  return (
    <form action={signOut} className="w-full p-0.5">
      <Button variant={"outline"} className="w-full">
        SignOut
      </Button>
    </form>
  );
}

function Skeleton() {
  return (
    <div className="w-full p-0.5">
      <Button className="w-full" variant={"outline"}>
        <LoaderIcon className="animate-spin" />
      </Button>
    </div>
  );
}
