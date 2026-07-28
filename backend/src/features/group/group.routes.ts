import express from "express";
import { addMemberController, createGroupController, groupBalanceController, groupDebtSimplificationController, groupDetailController, myGroupsController } from "./group.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { addMemberSchema, createGroupSchema, groupBalanceSchema, groupDetailSchema } from "./group.validation.js";
import validate from "../../middlewares/validate.js";


const groupRouter = express.Router();

groupRouter.post("/create", authMiddleware,validate(createGroupSchema),createGroupController);
groupRouter.get("/myGroups", authMiddleware, myGroupsController);
groupRouter.post("/:groupId/members",authMiddleware, validate(addMemberSchema), addMemberController);
groupRouter.get("/:groupId/detail", authMiddleware, validate(groupDetailSchema), groupDetailController);
groupRouter.get("/:groupId/balances", authMiddleware, validate(groupBalanceSchema),groupBalanceController);
groupRouter.get("/:groupId/debt-simplify", authMiddleware, validate(groupBalanceSchema),groupDebtSimplificationController)
export {groupRouter};