import { z } from "zod";

import { getSearchItemsQuerySchema } from "../common/common.validations";

export const searchUsersSchema = z.object({
  query: getSearchItemsQuerySchema,
});

export type SearchUsersQuery = z.infer<typeof searchUsersSchema>["query"];
