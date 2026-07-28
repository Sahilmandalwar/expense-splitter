import asyncHandler from "../../utils/asyncHandler.js";
import { addMember, createGroup, groupBalance, groupDebtSimplification, groupDetail, myGroups } from "./group.service.js";
import { Request, Response } from "express";
import { AddMemberInput, AddMemberParams, CreateGroupInput, GroupBalanceParams, GroupDetailParams } from "./group.validation.js";
import { simplifiedBalance } from "./utils/debtSimplification.js";

export const createGroupController = asyncHandler(async(req: Request, res: Response)=> {
    const data : CreateGroupInput = req.body;
    const group = await createGroup(res.locals.userId, data);

    res.status(201).json({
        success: true,
        message : "Group created Successfully",
        data : group
    });
})

export const myGroupsController = asyncHandler(async(req: Request, res: Response)=>{
    const groups = await myGroups(res.locals.userId);

    res.status(200).json({
        success: true,
        message: "fetched User Groups successfully",
        groups
    })
});

export const addMemberController = asyncHandler(async(req:Request, res: Response)=>{
    const param =  req.params as AddMemberParams ;
    const data = req.body as AddMemberInput ;

    await addMember(param, data, res.locals.userId);

    res.status(200).json({
        success: true,
        message: "User Added to group successfully",
    })
})

export const groupDetailController = asyncHandler(async(req: Request, res: Response)=>{
    const param = req.params as GroupDetailParams;
    const group = await groupDetail(param, res.locals.userId);

    res.status(200).json({
        success: true, 
        message: "Group detail fetch successfully",
        group
    })
})

export const groupBalanceController = asyncHandler(async(req: Request, res: Response)=> {
    const params = req.params as GroupBalanceParams;
    const balance = await groupBalance(params, res.locals.userId);

    res.status(200).json({
        success: true,
        message: "Balance calculated successfully",
        balance
    })
})

export const groupDebtSimplificationController = asyncHandler(async(req: Request, res: Response)=>{
    const params = req.params as GroupBalanceParams;
    const debtSimplifySuggestion : simplifiedBalance[] = await groupDebtSimplification
    (params, res.locals.userId);

    res.status(200).json({
        success: true,
        message: "Debt simplification done",
        debtSimplifySuggestion
    })
})