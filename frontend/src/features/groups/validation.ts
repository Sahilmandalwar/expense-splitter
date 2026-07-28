import { z } from "zod";

export const createGroupSchema = z.object({
  name: z
    .string()
    .min(3, "Group name must be at least 3 characters"),

  description: z.string().optional(),
});

export type CreateGroupInput = z.infer<
  typeof createGroupSchema
>;


export const addMemberSchema = z.object({
  email: z.email("Invalid email"),
});

export type AddMemberInput =
  z.infer<typeof addMemberSchema>;