import express from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { createSettlementSchema, groupSettlementSchema } from "./settlement.validation.js";
import { createSettlementController, groupSettlementController } from "./settlement.controller.js";
import validate from "../../middlewares/validate.js";

const settlementRouter = express.Router();


settlementRouter.post("/:groupId/create", authMiddleware, validate(createSettlementSchema), createSettlementController);
settlementRouter.get("/:groupId/fetch", authMiddleware, validate(groupSettlementSchema), groupSettlementController);

export {settlementRouter};