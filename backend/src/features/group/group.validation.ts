import {z} from "zod";

export const createGroupSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Group name must be at least 3 characters")
      .max(50, "Group name is too long"),

    description: z.string().optional(),
  }),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>["body"];


export const addMemberSchema = z.object({
    params: z.object({
    groupId: z.uuid("Invalid group id"),
  }),

  body: z.object({
    email: z.email("Invalid email address"),
  }),
});

export type AddMemberInput =
  z.infer<typeof addMemberSchema>["body"];

export type AddMemberParams =
  z.infer<typeof addMemberSchema>["params"];

export const groupDetailSchema = z.object({
  params: z.object({
    groupId: z.uuid("Invalid group id"),
  }),
})

export type GroupDetailParams = z.infer<typeof groupDetailSchema>["params"];

export const groupBalanceSchema = z.object({
  params: z.object({
    groupId : z.uuid("Invalid Group id")
  })
});

export type GroupBalanceParams = z.infer<typeof groupBalanceSchema>['params'];