"use client";

import { addComment } from "@/app/actions/actions";
import { Input } from "@/components/ui/input";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState, useFormStatus } from "react-dom";
import { schema } from "./schema";
import { Button } from "@/components/ui/button";

export default function Form({ slug, name }: { slug: string; name: string }) {
  const na = addComment.bind(null, slug);
  const [lastResult, action] = useFormState(na, undefined);
  const [form, fields] = useForm({
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      console.log("Done");
      return parseWithZod(formData, { schema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
      <div>
        <label>Name</label>
        <Input
          type="text"
          name={fields.name.name}
          key={fields.name.key}
          defaultValue={name}
        />
        <div className="text-destructive">{fields.name.errors}</div>
      </div>
      <div>
        <label>Comment</label>
        <div className="flex gap-2">
          <Input
            type="text"
            name={fields.comment.name}
            key={fields.comment.key}
            defaultValue={fields.comment.initialValue}
          />
          <SubmitButton />
        </div>
        <div className="text-destructive">{fields.name.errors}</div>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant={"outline"} type="submit" disabled={pending}>
      {pending ? "Submitting" : "Submit"}
    </Button>
  );
}
