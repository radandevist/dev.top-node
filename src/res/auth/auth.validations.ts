import { z, TypeOf } from "zod";

import { containSpaceRegex } from "../../constants/regex";

const registerBodySchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .email({ message: "Email must be a valid one" }),
  password: z.string({ required_error: "Password is required" })
    .min(7, "Password must contain at least 7 characters")
    .regex(containSpaceRegex, "LastName shouldn't contain whitespaces"),
  confirmPassword: z.string({ required_error: "Password confirmation is required" }),
  lastName: z.string({ required_error: "LastName is required" })
    .min(3, "LastName must contain at least 3 characters")
    .regex(containSpaceRegex, "LastName shouldn't contain whitespaces"),
  firstName: z.string()
    .regex(containSpaceRegex, "FirstName shouldn't contain whitespaces")
    .optional(),
  userName: z.string()
    .regex(containSpaceRegex, "UserName shouldn't contain whitespaces")
    .optional(),
});

export const registerSchema = z.object({
  body: registerBodySchema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  }),
});

export const loginSchema = z.object({
  body: registerBodySchema.pick({ email: true, password: true }),
});

// ====================== Types ========================//
export type RegisterBody = TypeOf<typeof registerSchema>["body"];
export type LoginBody = TypeOf<typeof loginSchema>["body"];
