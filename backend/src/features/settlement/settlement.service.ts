import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppErrors.js";
import { groupSettlementUtility } from "./getGroupSettlement.js";
import { CreateSettlementInput, CreateSettlementParams, GroupSettlementParams } from "./settlement.validation.js";


export const createSettlement = async(params: CreateSettlementParams, data : CreateSettlementInput, userId: string
) => {
    const isPayerMember = await prisma.groupMember.findUnique({
        where: {
            userId_groupId: {
                userId, 
                groupId: params.groupId
            }
        }
    });

    if(!isPayerMember){
        throw new AppError("Payer not member of the group", 403);
    }

    const isReceiverMember = await prisma.groupMember.findUnique({
        where: {
            userId_groupId: {
                userId: data.receiverId,
                groupId: params.groupId
            }
        }
    });

    if(!isReceiverMember) {
        throw new AppError("Receiver not member of the group", 403);
    }

    const settlement = await prisma.settlement.create({
        data: {
            payerId: userId,
            receiverId: data.receiverId,
            amount : data.amount,
            description: data.description,
            groupId: params.groupId
        },
        select: {
            id: true,
            paidBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            receivedBy : {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            amount: true,
            description: true,
            createdAt: true,
            groupId: true
        }
    });

    return settlement;
}

export const groupSettlement = async(params: GroupSettlementParams, userId: string) => {
    const isMember = await prisma.groupMember.findUnique({
        where: {
            userId_groupId: {
                userId,
                groupId: params.groupId
            }
        }
    });

    if(!isMember) {
        throw new AppError("You are not member of group", 403);
    }

    const settlements = await groupSettlementUtility(params.groupId);

    return settlements;
}