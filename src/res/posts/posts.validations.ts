import { TypeOf, z } from "zod";

import { containSpaceRegex } from "../../constants/regex";

export const createPostSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" })
      .trim()
      .refine((title) => {
        const hasAtLeast2Words = title.split(" ").length >= 2;
        const hasAtLeast10chars = title.length >= 10;

        return (hasAtLeast2Words && hasAtLeast10chars);
      }, {
        message: "Title must contains at least 10 characters and 2 words",
      }),
    content: z.string({ required_error: "Content is required" })
      .trim()
      .min(200, "Content must contain at least 200 characters"),
    published: z.boolean().optional(),
    pinned: z.boolean().optional(),
    coverImage: z.string()
      .url({ message: "Cover Image must be a valid url" })
      .optional(),
    slug: z.string()
      .regex(containSpaceRegex, "Slug shouldn't contain whitespaces")
      .optional(),
  }),
});

export const getManyPostsSchema = z.object({
  query: z.object({
    page: z.string()
      .refine((value) => !Number.isNaN(Number(value)), "Page query must be a number")
      .optional(),
    limit: z.string()
      .refine((value) => !Number.isNaN(Number(value)), "Limit query must be a number")
      .optional(),
    populate: z.array(z.string({ invalid_type_error: "Populate query must only contain strings" }), {
      invalid_type_error: "Populate query must be an array",
    }).optional(),
  }),
});

export type CreatePostSchema = TypeOf<typeof createPostSchema>;
export type CreatePostBody = CreatePostSchema["body"];

export type GetManyPostsQuery = TypeOf<typeof getManyPostsSchema>["query"];
