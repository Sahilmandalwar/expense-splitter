import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { CreateExpenseInput, CreateExpenseParams, GroupExpenseParams, GroupExpenseQuery } from "./expense.validation.js";
import { createExpense, groupExpense } from "./expense.service.js";


export const createExpenseController = asyncHandler(async(req:Request, res: Response)=>{
    const param = req.params as CreateExpenseParams;
    const data = req.body as CreateExpenseInput;

    const expense = await createExpense(param, data, res.locals.userId);

    res.status(201).json({
        sucess: true,
        message: "Expense created successfully",
        expense
    })
})

export const groupExpenseController = asyncHandler(async(req: Request, res: Response)=>{
    const param = req.params as GroupExpenseParams;
    const query = req.query as GroupExpenseQuery;

    const expenses = await groupExpense(param, query, res.locals.userId);

    res.status(200).json({
        success: true,
        message: "fetched expenses successfully",
        expenses
    })
})