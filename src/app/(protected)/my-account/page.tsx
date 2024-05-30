import { z } from "zod";
import Form from "./form";

export const schema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Must be an email"),
  message: z
    .string({ required_error: "Must be a valid message" })
    .min(10, "Must be 10 characters")
    .max(100, "Maximum 100 characters"),
});

export default function Page() {
  return (
    <div>
      <Form />
    </div>
  );
}
