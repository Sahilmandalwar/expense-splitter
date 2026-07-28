import express from "express";
import authRouter from "../features/auth/auth.routes.js";
import { groupRouter } from "../features/group/group.routes.js";
import { expenseRouter } from "../features/expense/expense.routes.js";
import { settlementRouter } from "../features/settlement/settlement.routes.js";

const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/group", groupRouter);
apiRouter.use("/expense",expenseRouter);
apiRouter.use("/settlement", settlementRouter)

export  {apiRouter};