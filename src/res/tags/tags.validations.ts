import { TypeOf, z } from "zod";

import { getManyItemsQuerySchema, searchItemsQuerySchema } from "../common/common.validations";

export const getManyTagsSchema = z.object({
  query: getManyItemsQuerySchema,
});

export const searchTagsSchema = z.object({
  query: searchItemsQuerySchema,
});

export type GetManyTagsQuery = TypeOf<typeof getManyTagsSchema>["query"];

export type SearchTagsQuery = z.infer<typeof searchTagsSchema>["query"];
