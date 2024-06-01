'use client'

import { ArrowUpIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function UpButton() {
  return (
    <Button
      className="block md:hidden fixed z-20 bottom-3 right-3 p-1 rounded-full"
      variant={"outline"}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUpIcon className="rounded-full" />
    </Button>
  );
}
