"use client";

import { Button } from "@/components/ui/button";
import { cartStore } from "@/store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartButton({ slug, price }: { slug: string, price: number }) {
  const { addItem, items, reduceAmount } = cartStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  // Rehydrate the store on page load
  useEffect(() => {
    cartStore.persist.rehydrate();
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) return null;

  return (
    <BButton
      addItem={() => addItem(slug, price)}
      items={items}
      slug={slug}
      reduce={() => reduceAmount(slug)}
    />
  );
}

type Props = {
  addItem: () => void;
  items: {
    slug: string;
    amount: number;
  }[];
  slug: string;
  reduce: () => void;
};

function BButton({ addItem, items, slug, reduce }: Props) {
  const item = items.find((item) => item.slug == slug);

  if (item != undefined)
    return (
      <div className="flex flex-col gap-2 sm:flex-row justify-between mt-4 pt-2">
        <Button onClick={reduce} variant={"outline"}>
          <MinusIcon />
        </Button>
        <Button className="w-full" variant={"outline"}>
          Amount: {item.amount}
        </Button>
        <Button onClick={addItem} variant={"outline"}>
          <PlusIcon />
        </Button>
      </div>
    );
  return (
    <Button className="w-full mt-4" variant={"default"} onClick={addItem}>
      Add to Cart
    </Button>
  );
}
