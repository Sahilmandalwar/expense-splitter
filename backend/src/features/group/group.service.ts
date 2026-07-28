import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppErrors.js";
import { AddMemberInput, AddMemberParams, CreateGroupInput, GroupBalanceParams, GroupDetailParams } from "./group.validation.js";
import { debtSimplificationUtility } from "./utils/debtSimplification.js";
import { getBalanceUtility } from "./utils/getBalance.js";

export type balanceType = {
    user: {
        id: string;
        name: string;
        email: string;
    };
    balance: number;
};

export const createGroup = async(userId : string, data : CreateGroupInput) => {
    return await prisma.$transaction( async (tx) => {
        const group = await tx.group.create({
            data : {
                name : data.name,
                description : data.description,
                userId,
            },
        })

        await tx.groupMember.create({
            data : {
                userId,
                groupId: group.id
            }
        })

        return group;
    });
}

export const myGroups = async(userId: string)=>{
    const groups = await prisma.groupMember.findMany({
        where : {
            userId
        },
        include : {
            group: {
                select: {
                     id: true,
                    name: true,
                    description: true,
                }
            }
        },
        
    })

    return groups;
}

export const addMember = async(param : AddMemberParams, data: AddMemberInput, userId: string) => {
   
    const group = await prisma.groupMember.findUnique({
        where: {
            userId_groupId : {
                userId,
                groupId: param.groupId
            }
        }
    })

    if(!group){
        throw new AppError("You are not a member of this group", 403);
    }

    const addUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });

    if(!addUser) {
        throw new AppError("Email not registered yet!", 404);
    }

    const isAlreadyMember = await prisma.groupMember.findUnique({
        where : {
            userId_groupId : {
                userId: addUser.id,
                groupId: param.groupId

            }
        }
    })

    if(isAlreadyMember) {
        throw new AppError("Already Member of Group", 401);
    }

    const member = await prisma.groupMember.create({
        data: {
            userId: addUser.id,
            groupId: param.groupId
        }
    })

    return member;



}

export const groupDetail = async(param: GroupDetailParams, userId: string) => {
    const membership = await prisma.groupMember.findUnique({
        where: {
            userId_groupId: {
                userId,
                groupId: param.groupId
            }
        }
    })

    if(!membership) {
        throw new AppError("unauthorized access to group", 401);
    }

    const group = await prisma.group.findUnique({
        where: {
            id: param.groupId,
        },
        include: {
            members: {
                include : {
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

    if(!group) {
        throw new AppError("Group Not Found", 404);
    }

    return group;
}

export const groupBalance = async(params: GroupBalanceParams, userId: string) => {

    const isMember = await prisma.groupMember.findUnique({
        where: {
            userId_groupId : {
                userId,
                groupId: params.groupId
            }
        }
    })

    if(!isMember) {
        throw new AppError("You are not member of group", 403);
    }

    // get expense
    return await getBalanceUtility(params.groupId);
}

export const groupDebtSimplification = async(params: GroupBalanceParams, userId: string) => {
    const isMember = await prisma.groupMember.findUnique({
        where: {
            userId_groupId : {
                userId,
                groupId: params.groupId
            }
        }
    })

    if(!isMember) {
        throw new AppError("You are not member of group", 403);
    }

    const balances = await getBalanceUtility(params.groupId);
    return debtSimplificationUtility(balances);
};