import { Router } from "express";
import { body, validationResult } from "express-validator";
import { signIn, signUp } from "./service";

export const authController = Router();

authController.post(
  "/register",
  body("username").isString().trim().notEmpty(),
  body("password").isString().trim().notEmpty(),
  async (req, res) => {
    validationResult(req).throw();
    res.status(200).send(await signUp(req.body.username, req.body.password));
  }
);

authController.post(
  "/auth",
  body("username").isString().trim().notEmpty(),
  body("password").isString().trim().notEmpty(),
  async (req, res) => {
    validationResult(req).throw();
    res.status(200).send(await signIn(req.body.username, req.body.password));
  }
);
