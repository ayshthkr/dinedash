"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { ShoppingBagIcon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { cartStore } from "@/store";
import { cn } from "@/lib/utils";

function ClientCart() {
  const { itemsCount } = cartStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  // Rehydrate the store on page load
  useEffect(() => {
    cartStore.persist.rehydrate();
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) return null;

  return (
    <Button variant={"outline"} className="gap-2">
      {itemsCount} <ShoppingBagIcon />
    </Button>
  );
}

const cl = (href: string, pathname: string) =>
  href == pathname ? "secondary" : "outline";

export function ClientButton({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Button variant={cl(href, pathname)} className={cn(className)}>
      {children}
    </Button>
  );
}

export default ClientCart;
