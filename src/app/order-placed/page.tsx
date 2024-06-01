"use client";

import { Button } from "@/components/ui/button";
import { cartStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const { clear } = cartStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  // Rehydrate the store on page load
  useEffect(() => {
    cartStore.persist.rehydrate();
    setHasHydrated(true);
    clear();
  }, [clear]);

  if (!hasHydrated) return null;

  return (
    <div className="w-full font-funky text-3xl font-semibold text-center">
      <div>Order placed and cart cleared</div>
      <div>
        <Link href={"/"}>
          <Button variant={"outline"}>Go to home</Button>
        </Link>
      </div>
    </div>
  );
}
