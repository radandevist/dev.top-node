import { TypeOf, z } from "zod";

import { getManyItemsQuerySchema } from "../common/common.validations";

export const getManyTagsSchema = z.object({
  query: getManyItemsQuerySchema,
});

export type GetManyTagsQuery = TypeOf<typeof getManyTagsSchema>["query"];
