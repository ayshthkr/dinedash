"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  return (
    <div>
      Hi, your ticket is created - {searchParams.get("id")?.toString()}. Use it
      for further follow-ups.
      <Link href={"/"}>
        <Button variant={"outline"}>Go Back to Home</Button>
      </Link>
    </div>
  );
}
