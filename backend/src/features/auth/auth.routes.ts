import express from "express";
import { loginController, signupController, logoutController, getCurrentUserController, forgotPasswordController, resetPasswordController } from "./auth.controller.js";
import { forgotPasswordSchema, loginSchema, resetPasswordSchema, signupSchema } from "./auth.validation.js";
import validate from "../../middlewares/validate.js";
import { authMiddleware } from "./auth.middleware.js";
import { Request, Response } from "express";
import { resetPassword } from "./auth.service.js";

const router = express.Router();

router.post('/signup', validate(signupSchema), signupController);
router.post('/login', validate(loginSchema), loginController);
router.post('/logout', authMiddleware ,logoutController);
router.get('/me', authMiddleware, getCurrentUserController)
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPasswordController)
router.post("/reset-password/:token", validate(resetPasswordSchema), resetPasswordController)
export default router;