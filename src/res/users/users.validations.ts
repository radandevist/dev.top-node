import { z } from "zod";

import { searchItemsQuerySchema } from "../common/common.validations";

export const searchUsersSchema = z.object({
  query: searchItemsQuerySchema,
});

export type SearchUsersQuery = z.infer<typeof searchUsersSchema>["query"];
