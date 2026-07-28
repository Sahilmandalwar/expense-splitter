import { env } from "../../config/env.js";
import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppErrors.js";
import { CreateExpenseInput, CreateExpenseParams, GroupExpenseParams, GroupExpenseQuery } from "./expense.validation.js";
import { calculateSplit } from "./utils/calculateSplit.js";


export const createExpense = async(param: CreateExpenseParams, data : CreateExpenseInput, userId: string) => {

    const {title, description, amount, splitType, participants} = data;
    const {groupId} = param;

    const members = await prisma.groupMember.findMany({
        where: {
            groupId
        }, 
        select : {
            userId: true
        }
    });

    if(members.length === 0) {
        throw new AppError("Group not found", 404)
    }

    const memberIds = new Set (members.map((member)=>{
        return member.userId;
    }));


    if(!memberIds.has(userId)) {  
        throw new AppError("unauthorised request to create expense", 403);
    }

    for (const participant of participants) {
        if (!memberIds.has(participant.userId)) {
            throw new AppError("Participant must belong to group", 400);
        }
    }
 
    const splitResult = calculateSplit(splitType,amount, participants);

    const expense =  await prisma.$transaction(async(tx)=>{
        const expenseCreated = await tx.expense.create({
            data: {
                amount, 
                title, 
                description,
                userId,
                groupId,
                splitType,
            }
        })

        await tx.expenseParticipant.createMany({
            data : splitResult.map(participant=>({
                expenseId: expenseCreated.id,
                userId: participant.userId,
                amountOwed: participant.amountOwed
            }))
        })

        return expenseCreated;

    })

    const createdExpense = await prisma.expense.findUnique({
        where: {
           id: expense.id,
        },
        select: {
            id: true,
            amount: true,
            title: true,
            description: true,
            splitType: true,
            createdAt: true,
            expenseParticipants: {
                select: {
                    user: {
                        select: {   
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    amountOwed: true
                }
            },

            paidBy: {
                select : {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }


    });

    if (!createdExpense) {
        throw new AppError("Expense not found.", 404);
       
    }
    return createdExpense;
}
export const groupExpense = async (
  param: GroupExpenseParams,
  query: GroupExpenseQuery,
  userId: string
) => {
  const { page, limit } = query;
  const { groupId } = param;

  const currentPage = Number(page) || 1;
  const currentLimit =
    Number(limit) || Number(env.DEFAULT_LIMIT);

  const skip = (currentPage - 1) * currentLimit;

  const isMember =
    await prisma.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });

  if (!isMember) {
    throw new AppError(
      "you are not member of group",
      403
    );
  }

  const [
    totalExpenseCount,
    totalExpenseAmount,
    totalMemberCount,
    expenses,
  ] = await Promise.all([
    prisma.expense.count({
      where: {
        groupId,
      },
    }),

    prisma.expense.aggregate({
      where: {
        groupId,
      },
      _sum: {
        amount: true,
      },
    }),

    prisma.groupMember.count({
      where: {
        groupId,
      },
    }),

    prisma.expense.findMany({
      where: {
        groupId,
      },

      select: {
        id: true,
        amount: true,
        title: true,
        description: true,

        paidBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        groupId: true,

        expenseParticipants: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },

            amountOwed: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: currentLimit,
    }),
  ]);

  const totalPage = Math.ceil(
    totalExpenseCount / currentLimit
  );

  return {
    summary: {
      totalExpense:
        Number(
          totalExpenseAmount._sum.amount
        ) || 0,

      totalExpenseCount,

      totalMemberCount,
    },

    expenses,

    pagination: {
      skip,
      limit: currentLimit,
      page: currentPage,
      totalPage,
    },
  };
};