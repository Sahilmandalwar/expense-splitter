import { z } from "zod";

export const createSettlementSchema = z.object({
  receiverId: z.string().min(1),

  amount: z.coerce
    .number()
    .positive("Amount must be greater than zero"),

  description: z
    .string()
    .max(200)
    .optional(),
});

export type CreateSettlementInput =
  z.infer<
    typeof createSettlementSchema
  >;
