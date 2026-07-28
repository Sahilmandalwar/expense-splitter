import { group } from "node:console";
import {z} from "zod"
export const createSettlementSchema = z.object({
    params: z.object({
        groupId: z.uuid("Invalid Group id"),
    }),

    body: z.object({
        receiverId : z.uuid("Invalid user id"),
        amount : z.number().positive(),
        description: z.string().optional(),
    })
});

export type CreateSettlementInput = z.infer<typeof createSettlementSchema>["body"];
export type CreateSettlementParams = z.infer<typeof createSettlementSchema>["params"];

export const groupSettlementSchema = z.object({
    params: z.object({
        groupId: z.uuid("Invalid Group Id"),
    })
});

export type GroupSettlementParams = z.infer<typeof groupSettlementSchema>["params"];