import prisma from "../../../config/prisma.js";
import { groupSettlementUtility } from "../../settlement/getGroupSettlement.js";


export const getBalanceUtility = async(groupId: string) => {
    const expenses = await prisma.expense.findMany({
        where: {
            groupId: groupId,
        }, 
        select : {
            paidBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }, 
            amount: true,
            expenseParticipants : {
                select: {
                    amountOwed: true,
                    user: {
                        select: {
                            id: true,
                            name: true, 
                            email: true
                        }
                    }
                }
            }
        }
    })

    const settlements = await groupSettlementUtility(groupId);

    // store expenses in map
    const balances = new Map<
        string,
        {
            user: {
                id: string;
                name: string;
                email: string;
            };
            balance: number;
        }
    >();

    for(const expense of expenses) {
        const payer = balances.get(expense.paidBy.id);

        if (!payer) {
            balances.set(expense.paidBy.id, {
                user: expense.paidBy,
                balance: expense.amount.toNumber(),
            });
        } else {
            payer.balance += expense.amount.toNumber();
        }

        for (const participant of expense.expenseParticipants) {
            const existing = balances.get(participant.user.id);

            if (!existing) {
                balances.set(participant.user.id, {
                    user: participant.user,
                    balance: -participant.amountOwed.toNumber(),
                });
            } else {
                existing.balance -= participant.amountOwed.toNumber();
            }
        }
    }

    for(const settlement of settlements) {
        const payer = balances.get(settlement.paidBy.id);
        if(!payer) {
             balances.set(settlement.paidBy.id, {
                user: settlement.paidBy,
                balance: settlement.amount.toNumber(),
            });
        }else{
            payer.balance += settlement.amount.toNumber();
        }

        const receiver = balances.get(settlement.receivedBy.id);
        if(!receiver) {
            balances.set(settlement.receivedBy.id,{
                user: settlement.receivedBy,
                balance: -settlement.amount.toNumber(),
            });
        }else{
            receiver.balance -= settlement.amount.toNumber();
        }
    }

   return Array.from(balances.values());
}