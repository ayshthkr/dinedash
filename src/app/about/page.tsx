import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CalendarDaysIcon,
  MapPinIcon,
  PackageIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <Image
              src="/about.jpg"
              width="500"
              height="500"
              alt="Hero"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Delicious Meals, Delivered
                </h1>
                {/* <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400"> */}
                <p className="max-w-[600px] md:text-xl">
                  At our restaurant, we&apos;re passionate about serving up
                  mouthwatering dishes that bring people together. For the past
                  few years, we&apos;ve been crafting innovative recipes and
                  delivering exceptional dining experiences to our community.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Achievements
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We&apos;re proud of the impact we&apos;ve made in our community
                and the growth we&apos;ve experienced over the years.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium w-full flex justify-between">
                    Orders Fulfilled
                    <PackageIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+25,000</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Since 2020
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium w-full flex justify-between">
                    Customer Ratings
                    <StarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.9/5</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Average rating (Via Zomato)
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium w-full flex justify-between">
                    Years in Business
                    <CalendarDaysIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4+</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Since 2020
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium w-full flex justify-between">
                    Locations
                    <MapPinIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Across the Delhi, India
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
