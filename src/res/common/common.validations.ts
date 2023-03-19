import { z } from "zod";

const isNumber = (value: string) => !Number.isNaN(Number(value));
const toNumber = (value: string) => Number(value);
const isSuperiorToZero = (value: number) => value > 0;

/**
 * Request Query schema for getting many items from an entity endpoint.
 */
export const getManyItemsQuerySchema = z.object({
  page: z.string()
    .refine(isNumber, "Page query must be a number")
    .transform(toNumber)
    .refine(isSuperiorToZero, "Page query must be superior to 0")
    .optional(),
  limit: z.string()
    .refine((value) => isNumber(value), "Limit query must be a number")
    .transform(toNumber)
    .refine(isSuperiorToZero, "Limit query must be superior to 0")
    .optional(),
  // ! populate is not valid anymore since we are using prisma now
  // eslint-disable-next-line max-len
  // populate: z.array(z.string({ invalid_type_error: "Populate query must only contain strings" }), {
  //   invalid_type_error: "Populate query must be an array",
  // }).optional(),
});

export const getSearchItemsQuerySchema = getManyItemsQuerySchema
  .extend({
    term: z.string({ required_error: "A search term is required" })
      .trim()
      .min(3, "A search term must be 3 characters minimum"),
  });
