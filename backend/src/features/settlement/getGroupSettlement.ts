import prisma from "../../config/prisma.js";


export const groupSettlementUtility = async(groupId: string) =>{ 
    return await prisma.settlement.findMany({
        where: {
            groupId: groupId
        },
        select: {
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
}