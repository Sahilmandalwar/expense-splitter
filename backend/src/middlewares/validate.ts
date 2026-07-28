import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validate =
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if ("body" in validated) req.body = validated.body;
      if ("params" in validated) req.params = validated.params;

      next();
    } catch (error) {
      next(error);
    }
  };

export default validate;