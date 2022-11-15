import { z, TypeOf } from "zod";

import { containSpaceRegex } from "../../constants/validations";

export const registerSchema = z.object({
  body: z.object({
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
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  }),
});

export type RegisterSchema = TypeOf<typeof registerSchema>;
export type RegisterBody = RegisterSchema["body"];
// * or
// export type RegisterSchema = z.infer<typeof registerSchema>;
// export type RegisterBody = RegisterSchema["body"];
// * or
// export type RegisterSchema = typeof registerSchema._type;
// export type RegisterBody = RegisterSchema["body"];
// * or
// export type RegisterBody = typeof registerSchema._type.body;
