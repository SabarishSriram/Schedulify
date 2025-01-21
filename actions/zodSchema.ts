import * as z from "zod";

export const onboardingSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Name can only contain alphabets and spaces.",
    }),
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
});

export const settingsSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Name can only contain alphabets and spaces.",
    }),
});
