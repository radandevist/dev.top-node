import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Your email is required to register" })
      .email({ message: "The given email must be a valid one" }),
    password: z.string({ required_error: "A password is required to register" })
      .min(7, "Password must contain at least 7 characters"),
    lastName: z.string({ required_error: "Your lastName is required to register" })
      .trim()
      .min(3, "LastName must contain at least 3 characters")
      .regex(/^\S*$/, "The lastName shouldn't contain whitespaces"),
    firstName: z.string().trim().regex(/^\S*$/, "The firstName shouldn't contain whitespaces").optional(),
    userName: z.string().trim().regex(/^\S*$/, "The userName shouldn't contain whitespaces").optional(),
  }),
});

export type RegisterBody = typeof registerSchema._type.body;
