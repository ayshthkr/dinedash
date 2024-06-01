"use client";

import { useFormStatus } from "react-dom";
import { ReactNode, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  formAction: () => Promise<never>;
  pendingText: string;
  children: ReactNode;
};

export function SubmitButton({ children, pendingText, formAction }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" formAction={formAction} aria-disabled={pending} >
      {pending ? pendingText : children}
    </Button>
  );
}
