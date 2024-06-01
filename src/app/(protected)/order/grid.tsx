"use client";

import { Button } from "@/components/ui/button";
import { cartStore } from "@/store";
import { LoaderCircleIcon, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const images = ["placeholder-1.jpg", "placeholder-2.jpg", "placeholder-3.jpg"];

const imageLoader = ({ src, width }: { src: string; width: number }) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dishes/${src}`;
};

function SImage({ url, name }: { url: string; name: string }) {
  return (
    <Image
      loader={imageLoader}
      src={url}
      alt={name}
      width={1920}
      height={1080}
      blurDataURL={"/" + images[1]}
    />
  );
}

export default function Grid({ dishes }: { dishes: Dish[] | [] }) {
  const { addItem, items, reduceAmount } = cartStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  // Rehydrate the store on page load
  useEffect(() => {
    cartStore.persist.rehydrate();
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) return null;

  return dishes.map((dish) => {
    return (
      <div
        className="rounded-lg shadow-sm shadow-primary/50 border border-primary overflow-hidden p-1"
        key={dish.id}
      >
        <Link
          href={`/order/${dish.slug}`}
          prefetch={false}
        >
          <SImage name={dish.name} url={dish.imgUrl} />
        </Link>
        <div className="p-4">
          <Link
            href={`/order/${dish.slug}`}
            prefetch={false}
            className="hover:underline"
          >
            <h3 className="text-lg font-bold">{dish.name}</h3>
          </Link>
          <p className=" mb-2">Price: ₹{dish.price}</p>
          <BButton
            addItem={() => addItem(dish.slug, dish.price)}
            items={items}
            slug={dish.slug}
            reduce={() => reduceAmount(dish.slug)}
          />
        </div>
      </div>
    );
  });
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

export function Skeleton() {
  const arr = Array(6)
    .fill(0)
    .map((_dish, i) => {
      return (
        <div
          className="rounded-lg shadow-sm shadow-primary/50 border border-primary overflow-hidden p-1"
          key={i + 1}
        >
          <Image
            alt="placeholder"
            src={"/" + images[i % 3]}
            width={1920}
            height={1080}
          />
          <div className="p-4 space-y-5">
            <div className={`h-6 w-full rounded-lg bg-gray-900 ${shimmer}`} />
            <div className={`h-4 w-full rounded-lg bg-gray-900 ${shimmer}`} />
            <Button className="w-full mt-4" variant={"default"}>
              <Spinner />
            </Button>
          </div>
        </div>
      );
    });
  return arr;
}

function Spinner() {
  return <LoaderCircleIcon className="animate-spin" />;
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
      <div className="flex flex-col gap-2 sm:flex-row justify-between mt-4 px-4 pt-2">
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
