import { z } from "zod";

const participantSchema = z.object({
  userId: z.uuid("Invalid user id"),
  amount: z.number().positive().optional(),
  percentage: z.number().positive().max(100).optional(),
});

export type ParticipantInput = z.infer<typeof participantSchema>;

export const createExpenseSchema = z.object({
  params: z.object({
    groupId: z.uuid("Invalid group id"),
  }),

  body: z.object({
    title: z.string().trim().min(3).max(100),

    description: z.string().optional(),

    amount: z.number().positive(),

    splitType: z.enum(["EQUAL", "EXACT", "PERCENTAGE"]),

    participants: z
      .array(participantSchema)
      .min(1, "At least one participant is required"),
  }),
});

export type CreateExpenseInput =
  z.infer<typeof createExpenseSchema>["body"];

export type CreateExpenseParams =
  z.infer<typeof createExpenseSchema>["params"];

export const groupExpenseSchema = z.object({
  params: z.object({
    groupId: z.uuid("Invalid Group id"),
  }),

  query: z.object({
    page: z.string().optional(),
    limit : z.string().optional()
  })
});

export type GroupExpenseParams =
  z.infer<typeof groupExpenseSchema>["params"];

export type GroupExpenseQuery =
  z.infer<typeof groupExpenseSchema>["query"];