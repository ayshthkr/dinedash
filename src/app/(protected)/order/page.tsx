import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { FilterIcon, SearchIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user == null) return redirect("/");

  const { data } = await supabase.from("dishes").select("*");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Orders</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                className="pr-10"
                placeholder="Search orders..."
                type="text"
              />
              <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <Button variant="outline">
              <FilterIcon className="mr-2" />
              Filter
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((dish) => {
            return (
              <div
                className="rounded-lg shadow-md overflow-hidden"
                key={dish.id}
              >
                  <img
                    src={dish.imgUrl}
                    alt={dish.name}
                    className="w-full bg-cover bg-center"
                  />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{dish.name}</h3>
                  <p className=" mb-2">Price: ${dish.price}</p>
                  <Button className="w-full mt-4" variant={"default"}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="h-40 bg-cover bg-center"
              style={{
                backgroundImage: "\"url('/placeholder.svg')\"",
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Chicken Salad</h3>
              <p className="text-gray-500 mb-2">Quantity: 1</p>
              <p className="text-gray-500 mb-2">Price: $9.99</p>
              <p className="text-gray-500 mb-2">Total: $9.99</p>
              <Button className="w-full mt-4" variant="outline">
                Add to Cart
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="h-40 bg-cover bg-center"
              style={{
                backgroundImage: "\"url('/placeholder.svg')\"",
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Vegetable Curry</h3>
              <p className="text-gray-500 mb-2">Quantity: 3</p>
              <p className="text-gray-500 mb-2">Price: $14.99</p>
              <p className="text-gray-500 mb-2">Total: $44.97</p>
              <Button className="w-full mt-4" variant="outline">
                Add to Cart
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="h-40 bg-cover bg-center"
              style={{
                backgroundImage: "\"url('/placeholder.svg')\"",
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Grilled Salmon</h3>
              <p className="text-gray-500 mb-2">Quantity: 1</p>
              <p className="text-gray-500 mb-2">Price: $19.99</p>
              <p className="text-gray-500 mb-2">Total: $19.99</p>
              <Button className="w-full mt-4" variant="outline">
                Add to Cart
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="h-40 bg-cover bg-center"
              style={{
                backgroundImage: "\"url('/placeholder.svg')\"",
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Pasta Primavera</h3>
              <p className="text-gray-500 mb-2">Quantity: 2</p>
              <p className="text-gray-500 mb-2">Price: $12.99</p>
              <p className="text-gray-500 mb-2">Total: $25.98</p>
              <Button className="w-full mt-4" variant="outline">
                Add to Cart
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="h-40 bg-cover bg-center"
              style={{
                backgroundImage: "\"url('/placeholder.svg')\"",
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Grilled Chicken Salad</h3>
              <p className="text-gray-500 mb-2">Quantity: 1</p>
              <p className="text-gray-500 mb-2">Price: $14.99</p>
              <p className="text-gray-500 mb-2">Total: $14.99</p>
              <Button className="w-full mt-4" variant="outline">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-4 px-6">
        <p>© 2023 Acme Restaurant. All rights reserved.</p>
      </footer>
    </div>
  );
}
