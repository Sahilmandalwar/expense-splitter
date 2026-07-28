import { NextFunction, Request, Response } from "express";
import jwt, { Jwt } from "jsonwebtoken";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/AppErrors.js";
import { env } from "../../config/env.js";


interface JwtPayload {
  userId: string;
}


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if(!token) {
        throw new AppError("Unauthorized", 401);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET as string) as JwtPayload;
    res.locals.userId = decoded.userId;

    next();
}
export {authMiddleware};
