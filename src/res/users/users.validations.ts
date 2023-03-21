import { z } from "zod";

import { searchItemsQuerySchema } from "../common/common.validations";

export const searchUsersSchema = z.object({
  query: searchItemsQuerySchema,
});

export const getUserProfileSchema = z.object({
  params: z.object({
    userName: z.string({ required_error: "An userName parameter is required" }),
  }),
});

export type SearchUsersQuery = z.infer<typeof searchUsersSchema>["query"];

export type GetUserProfileParams = z.infer<typeof getUserProfileSchema>["params"];
