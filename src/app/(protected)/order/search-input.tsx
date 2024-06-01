"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput() {
  const { replace } = useRouter();
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const input = useRef<HTMLInputElement>(null);
  const handle = useDebouncedCallback(
    (term: string) => {
      const params = new URLSearchParams(searchparams);
      if (term) params.set("q", term);
      else params.delete("q");
      replace(`${pathname}?${params.toString()}`);
    },
    300,
    { leading: true }
  );

  useEffect(() => {
    if (searchparams.get("q")?.toString()) input.current?.focus();
  }, [searchparams]);
  return (
    <>
      <Input
        ref={input}
        className="pr-10"
        placeholder="Search dishes..."
        type="text"
        onChange={(e) => {
          handle(e.target.value);
        }}
        defaultValue={searchparams.get("q")?.toString()}
      />
      <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2" />
    </>
  );
}
