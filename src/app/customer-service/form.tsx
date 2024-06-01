"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState, useFormStatus } from "react-dom";
import { addHelp } from "../actions/actions";
import { schema } from "./schema";

export default function Form() {
  const [lastResult, action] = useFormState(addHelp, undefined);

  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,
    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      className="space-y-4"
      action={action}
      id={form.id}
      onSubmit={form.onSubmit}
      noValidate
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          name={fields.name.name}
          key={fields.name.key}
          placeholder="Enter your name"
        />
        <div className="text-destructive">{fields.name.errors}</div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          key={fields.email.key}
          name={fields.email.name}
          placeholder="Enter your email"
        />
        <div className="text-destructive">{fields.email.errors}</div>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          name={fields.message.name}
          key={fields.message.key}
          placeholder="Enter your message"
          className="min-h-[100px]"
        />
        <div className="text-destructive">{fields.message.errors}</div>
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="outline" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}
