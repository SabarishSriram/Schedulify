import { z } from "zod";
export const zodSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[A-Za-z\s]+$/),
  userName: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "username can only contain letters, numbers and underscores",
    }),
});
