import { z, TypeOf } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Your email is required" })
      .email({ message: "The given email must be a valid one" }),
    password: z.string({ required_error: "A password is required" })
      .min(7, "Password must contain at least 7 characters"),
    confirmPassword: z.string({ required_error: "Password confirmation is required" }),
    lastName: z.string({ required_error: "Your lastName is required" })
      .trim()
      .min(3, "LastName must contain at least 3 characters")
      .regex(/^\S*$/, "The lastName shouldn't contain whitespaces"),
    firstName: z.string().trim().regex(/^\S*$/, "The firstName shouldn't contain whitespaces").optional(),
    userName: z.string().trim().regex(/^\S*$/, "The userName shouldn't contain whitespaces").optional(),
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
