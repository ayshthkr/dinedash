import { Button } from "@/components/ui/button";
import { ArrowRightCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center gap-3 flex-col-reverse lg:flex-row">
      <div className=" p-12 lg:p-0 mx-auto lg:max-w-[25vw] text-2xl lg:text-5xl font-funky lg:leading-[4rem] lg:tracking-wide relative break-words">
        <span className="decor">
          Authentic Indian Flavors Delivered: Enjoy Traditional Dishes from All
          Over India at Your Doorstep
        </span>
        <Link href={"/order"}>
          <Button variant={"link"} className="flex gap-2">
            Order now
            <ArrowRightCircleIcon />
          </Button>
        </Link>
      </div>
      <Image src={"/video.gif"} height={1920} width={1080} alt="Video" />
    </div>
  );
}
