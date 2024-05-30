import { z } from "zod";

export const schema = z.object({
  name: z.string({ required_error: "A name is required" }),
  desc: z.string(),
  category: z.string(),
  price: z.number({ message: "Expected a number" }),
  prepTime: z.number({ message: "Expected a number" }),
  isVeg: z.boolean(),
  imgUrl: z.string(),
  slug: z.string(),
});
