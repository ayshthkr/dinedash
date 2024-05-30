"use client";

import { Button } from "@/components/ui/button";
import { cartStore } from "@/store";
import { useEffect, useState } from "react";
import { placeOrder } from "../actions/actions";
import Link from "next/link";
import { useFormStatus } from "react-dom";

export default function Cart() {
  const { items } = cartStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  // Rehydrate the store on page load
  useEffect(() => {
    cartStore.persist.rehydrate();
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) return null;

  const amount = items
    .map((item) => item.amount * item.price)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="w-full flex justify-evenly items-center">
      <span>Your Amount: {amount}</span>
      {amount != 0 ? (
        <form action={placeOrder}>
          <SubmitButton />
        </form>
      ) : (
        <Link href="/order">
          <Button>Order now</Button>
        </Link>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant={"outline"} disabled={pending}>
      {pending ? "Placing order" : "Place your order"}
    </Button>
  );
}
