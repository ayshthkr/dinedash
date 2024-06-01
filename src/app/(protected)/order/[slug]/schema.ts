import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  comment: z.string(),
});
