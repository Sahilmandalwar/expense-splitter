import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppErrors.js";
import { ZodError } from "zod";


const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }))
    })
  }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
      success: false,
      message: "Json Web Token is invalid, try again`",
      
    })
  }

  if (err.name === "TokenExpiredError") {
      return res.status(401).json({
      success: false,
      message: "Json Web Token is expired, try again",
      
    })
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;