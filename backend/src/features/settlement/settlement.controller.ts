import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { CreateSettlementInput, CreateSettlementParams, GroupSettlementParams } from "./settlement.validation.js";
import { createSettlement, groupSettlement } from "./settlement.service.js";

export const createSettlementController = asyncHandler(async(req: Request, res: Response)=>{
    const params = req.params as CreateSettlementParams;
    const data = req.body as CreateSettlementInput;

    const settlement = await createSettlement(params, data, res.locals.userId);

    res.status(201).json({
        success: true,
        message: "Settlement Created Successfully",
        settlement
    })
});

export const groupSettlementController = asyncHandler(async(req: Request, res: Response)=>{
    const params = req.params as GroupSettlementParams;

    const settlements = await groupSettlement(params, res.locals.userId);
    res.status(200).json({
        success: true,
        message: "fetch group settlement Successfully",
        settlements
    })
})