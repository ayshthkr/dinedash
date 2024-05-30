"use client";

import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { login } from "@/app/actions/actions";
import { schema } from "./page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Form() {
  const [lastResult, action] = useFormState(login, null);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      <div>
        <label>Email</label>
        <Input
          name={fields.email.name}
          type="email"
          key={fields.email.key}
          defaultValue={fields.email.initialValue}
        />
        <div>{fields.email.errors}</div>
      </div>
      <div>
        <label>Message</label>
        <Input
          name={fields.message.name}
          type="text"
          key={fields.message.key}
          defaultValue={fields.message.initialValue}
        />
        <div>{fields.message.errors}</div>
      </div>
      <Button>Send</Button>
    </form>
  );
}
