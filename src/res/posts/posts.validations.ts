import { TypeOf, z } from "zod";

import { containSpaceRegex } from "../../constants/regex";
import { getManyItemsQuerySchema, searchItemsQuerySchema } from "../common/common.validations";

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

export const getHomePostsSchema = z.object({
  query: getManyItemsQuerySchema,
});

export const searchPostsSchema = z.object({
  query: searchItemsQuerySchema,
});

export type CreatePostBody = TypeOf<typeof createPostSchema>["body"];

export type GetHomePostsQuery = TypeOf<typeof getHomePostsSchema>["query"];

// export type GetSearchPostsQuery = TypeOf<typeof getHomePostsSchema>["query"];
export type SearchPostsQuery = z.infer<typeof searchPostsSchema>["query"];
