import { z } from "zod";

export const schema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "An Email is required" })
    .email("Must be a valid email"),
  message: z.string({ required_error: "Please specify your message" }),
});
