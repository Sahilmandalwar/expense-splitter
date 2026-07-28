import { Request, Response } from "express";
import { ForgotPasswordInput, LoginInput, SignupInput } from "./auth.validation.js";
import { forgotPassword, getCurrentUser, login, resetPassword, signup } from "./auth.service.js";
import { generateToken } from "../../utils/jwt.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { env } from "../../config/env.js";

const signupController = asyncHandler(async (req: Request, res: Response) => {
  const data: SignupInput = req.body;

  const user = await signup(data);

  const token = generateToken(user.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
});

const loginController = asyncHandler(async (req: Request, res: Response) => {
  const data: LoginInput = req.body;

  const user = await login(data);

  const token = generateToken(user.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "User logged in successfully",
    user,
  });
});

const logoutController = asyncHandler(async (req: Request, res: Response)=> {
  res.clearCookie("token", {
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
});
  res.status(200).json({
    success: true,
    message : "Logged out successfully",
  });
});

const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getCurrentUser(res.locals.userId);

    res.status(200).json({
      success: true,
      user,
    });
  }
);


const forgotPasswordController = asyncHandler(async(req: Request, res: Response)=>{
  const body = req.body as ForgotPasswordInput;
  await forgotPassword(body.email)
  res.status(200).json({
    success: true,
    message: "forgot password request accepted"
  })
});

export const resetPasswordController = asyncHandler(async(req: Request, res: Response)=>{
  const token = req.params.token as string;
  const {newPassword} = req.body;

  await resetPassword(token, newPassword);

  res.status(200).json({
    success: true,
    message: "password reset successfully",
  })
})

export { signupController, loginController, logoutController, getCurrentUserController, forgotPasswordController};