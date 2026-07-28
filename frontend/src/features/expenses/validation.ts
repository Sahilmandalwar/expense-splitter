import { z } from "zod";

export const splitTypeEnum = z.enum([
  "EQUAL",
  "EXACT",
  "PERCENTAGE",
]);

export const participantSchema = z.object({
  userId: z.string(),

  amount: z.number().optional(),

  percentage: z.number().optional(),
});

export const createExpenseSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required"),

    description: z.string(),

    amount: z.coerce
      .number()
      .positive("Amount must be greater than 0"),

    splitType: splitTypeEnum,

    participants: z
      .array(participantSchema)
      .min(
        1,
        "Select at least one participant"
      ),
  })
  .superRefine((data, ctx) => {
    if (data.splitType === "EXACT") {
      const total = data.participants.reduce(
        (sum, participant) =>
          sum + (participant.amount ?? 0),
        0
      );

      if (total !== data.amount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Exact amounts must equal total amount.",
          path: ["participants"],
        });
      }
    }

    if (
      data.splitType === "PERCENTAGE"
    ) {
      const total =
        data.participants.reduce(
          (sum, participant) =>
            sum +
            (participant.percentage ?? 0),
          0
        );

      if (total !== 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Percentages must total 100.",
          path: ["participants"],
        });
      }
    }
  });

export type CreateExpenseInput =
  z.infer<typeof createExpenseSchema>;