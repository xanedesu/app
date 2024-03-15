import { NextFunction, Request, Response } from "express";
import { verifyUser } from "./service";

export function authMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      req["user"] = await verifyUser(req.headers.authorization.substring(7));
      return next();
    } else {
      return res.status(401).send({
        code: "NOT_AUTHORIZED",
      });
    }
  };
}
