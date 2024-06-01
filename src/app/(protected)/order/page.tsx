import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { FilterIcon, SearchIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Grid, { Skeleton } from "./grid";
import { Suspense } from "react";
import SearchInput from "./search-input";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4 py-4 px-12 md:px-16 lg:px-24">
          <h2 className="text-2xl font-bold">Dishes</h2>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <div className="relative">
              <SearchInput />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4 px-8 md:px-16 lg:px-24">
          <Suspense fallback={<Spinner />}>
            <Loader
              param={typeof searchParams.q === "string" ? searchParams.q : ""}
            />
          </Suspense>
        </div>
      </main>
      <footer className=" py-4 px-6 m-6 font-funky border text-center">
        <p>And more coming soon...</p>
      </footer>
    </div>
  );
}

async function Loader({ param }: { param: string }) {
  setInterval(() => {}, 5000);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user == null) return redirect("/");

  const { data } = await supabase.from("dishes").select("*");
  const dishes = data?.filter(
    (dish) =>
      dish.slug.toLocaleLowerCase().includes(param.toLocaleLowerCase()) ||
      dish.name.toLocaleLowerCase().includes(param.toLocaleLowerCase())
  );

  return <Grid dishes={dishes || []} />;
}

function Spinner() {
  return <Skeleton />;
}
