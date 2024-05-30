"use client";

import { addDish } from "@/app/actions/actions";
import { Input } from "@/components/ui/input";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { schema } from "./schema";
import { Toggle } from "@/components/ui/toggle";
import { VeganIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Form() {
  const [lastResult, action] = useFormState(addDish, undefined);
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

  const [bool, setBool] = useState(false);

  return (
    <form
      action={action}
      id={form.id}
      onSubmit={form.onSubmit}
      noValidate
      className="w-1/2 max-w-[650px] mx-auto space-y-4"
    >
      <div>
        <label>Name</label>
        <Input
          type="text"
          key={fields.name.key}
          name={fields.name.name}
          defaultValue={fields.name.initialValue}
        />
        <div className="text-destructive">{fields.name.errors}</div>
      </div>
      <div>
        <label>Description</label>
        <Input
          type="text"
          key={fields.desc.key}
          name={fields.desc.name}
          defaultValue={fields.desc.initialValue}
        />
        <div className="text-destructive">{fields.desc.errors}</div>
      </div>
      <div>
        <label>Category</label>
        <Input
          type="text"
          key={fields.category.key}
          name={fields.category.name}
          defaultValue={fields.category.initialValue}
        />
        <div className="text-destructive">{fields.category.errors}</div>
      </div>
      <div>
        <label>Slug</label>
        <Input
          type="text"
          key={fields.slug.key}
          name={fields.slug.name}
          defaultValue={fields.slug.initialValue}
        />
        <div className="text-destructive">{fields.slug.errors}</div>
      </div>
      <div>
        <label>Price</label>
        <Input
          type="text"
          key={fields.price.key}
          name={fields.price.name}
          defaultValue={fields.price.initialValue}
        />
        <div className="text-destructive">{fields.price.errors}</div>
      </div>
      <div>
        <label>Preperation Time</label>
        <Input
          type="text"
          key={fields.prepTime.key}
          name={fields.prepTime.name}
          defaultValue={fields.prepTime.initialValue}
        />
        <div className="text-destructive">{fields.prepTime.errors}</div>
      </div>
      <div className="text-destructive">{fields.isVeg.errors}</div>
      <div className="flex justify-between">
        <Toggle
          aria-label="Toggle italic"
          onPressedChange={(val) => setBool(val)}
        >
          <VeganIcon className="mr-2 h-4 w-4" />
          Vegetarian
        </Toggle>
        <input
          type="checkbox"
          key={fields.isVeg.key}
          name={fields.isVeg.name}
          checked={bool}
          onChange={() => {}}
          hidden
          aria-hidden
        />
      </div>
      <button>Submit</button>
    </form>
  );
}
