import express from "express";
import { createExpenseSchema, groupExpenseSchema } from "./expense.validation.js";
import validate from "../../middlewares/validate.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { createExpenseController, groupExpenseController } from "./expense.controller.js";

const expenseRouter = express.Router();

expenseRouter.post("/:groupId/create",authMiddleware, validate(createExpenseSchema),createExpenseController);
expenseRouter.get("/:groupId/expenses", authMiddleware, validate(groupExpenseSchema), groupExpenseController);
export {expenseRouter};