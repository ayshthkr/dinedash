import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { createClient as createBrowserClient } from "@/utils/supabase/client";
import { notFound } from "next/navigation";
import SImage from "./image-loader";
import { ArrowLeft, CircleUserIcon } from "lucide-react";
import Form from "./form";
import { Suspense } from "react";
import Image from "next/image";
import CartButton from "./button";
import Link from "next/link";

export async function generateStaticParams() {
  const supabase = createBrowserClient();
  const { data } = await supabase.from("dishes").select("slug");

  if (data == null) return [];

  return data.map((_) => ({
    slug: _.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<Skeleton />}>
      <Loader slug={params.slug} />
    </Suspense>
  );
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

function Skeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div>
        <Link
          href="/order"
          className="m-4 rounded-full border px-4 py-2 hover:underline hover:bg-white/20 transition-all flex gap-2 "
        >
          <ArrowLeft />
        </Link>
        <Image
          src={"/placeholder-1.jpg"}
          height={1920}
          width={1080}
          alt="Placeholder"
        />
      </div>
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div
              className={`h-6 mb-4 w-full rounded-lg bg-gray-700 ${shimmer}`}
            />
            <div className={`h-36 w-full rounded-lg bg-gray-700 ${shimmer}`} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="text-xl font-bold">Price</h3>
              <div className={`h-6 w-full rounded-lg bg-gray-700 ${shimmer}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Prep Time</h3>
              <p className="text-gray-500 dark:text-gray-400">
                <div
                  className={`h-6 w-full rounded-lg bg-gray-700 ${shimmer}`}
                />
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Vegetarian</h3>
              <p className="text-gray-500 dark:text-gray-400">
                <div
                  className={`h-6 w-full rounded-lg bg-gray-700 ${shimmer}`}
                />
              </p>
            </div>
          </div>
          <Button size="lg" className="mt-4">
            Add to Cart
          </Button>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Comments</h2>
          <div className={`h-36 w-full rounded-lg bg-gray-700 ${shimmer}`} />
        </div>
      </div>
    </div>
  );
}

async function Loader({ slug }: { slug: string }) {
  const supabase = createClient();
  const { data } = await supabase
    .from("dishes")
    .select("*")
    .eq("slug", slug)
    .single();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (data == null || user == null) return notFound();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  if (profile == null) return notFound();

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div>
        <Link
          href="/order"
          className="m-4 rounded-full border px-4 py-2 hover:underline hover:bg-white/20 transition-all flex gap-2 "
        >
          <ArrowLeft className="hover:bg-white/20 rounded-full" /> Go Back
        </Link>
        <SImage url={data.imgUrl} name={data.name} />
      </div>
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">{data.desc}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="text-xl font-bold">Price</h3>
              <p className="text-gray-500 dark:text-gray-400">₹{data.price}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Prep Time</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {data.prepTime} mins
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Vegetarian</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {data.isVeg ? "Yes" : "No"}
              </p>
            </div>
          </div>
          <CartButton price={data.price} slug={data.slug} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Comments</h2>
          <Form slug={slug} name={profile.username ?? ""} />
          <div className="mt-4 space-y-4">
            {data.comments.map((comment, i) => {
              return (
                <div className="flex gap-4 " key={i + 1}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium flex gap-2">
                        <CircleUserIcon />
                        {comment.name}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
