import { z } from "zod";

/**
 * Request Query schema for getting many items from an entity endpoint.
 */
export const getManyItemsQuerySchema = z.object({
  page: z.string()
    .refine((value) => !Number.isNaN(Number(value)), "Page query must be a number")
    .transform((value) => Number(value))
    .optional(),
  limit: z.string()
    .refine((value) => !Number.isNaN(Number(value)), "Limit query must be a number")
    .transform((value) => Number(value))
    .optional(),
  populate: z.array(z.string({ invalid_type_error: "Populate query must only contain strings" }), {
    invalid_type_error: "Populate query must be an array",
  }).optional(),
});
