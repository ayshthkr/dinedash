import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { CircleIcon, FilterIcon, Loader2Icon, SearchIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Grid, { Skeleton } from "./grid";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4 py-4 px-12 md:px-16 lg:px-24">
          <h2 className="text-2xl font-bold">Dishes</h2>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <div className="relative">
              <Input
                className="pr-10"
                placeholder="Search dishes..."
                type="text"
              />
              <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <FilterIcon className="mr-2" />
              Filter
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4 px-8 md:px-16 lg:px-24">
          <Suspense fallback={<Spinner />}>
            <Loader />
          </Suspense>
        </div>
      </main>
      <footer className=" py-4 px-6 m-6 font-funky border text-center">
        <p>And more coming soon...</p>
      </footer>
    </div>
  );
}

async function Loader() {
  setInterval(() => {}, 5000);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user == null) return redirect("/");

  const { data } = await supabase.from("dishes").select("*");

  return <Grid dishes={data || []} />;
}

function Spinner() {
  return <Skeleton />;
}
