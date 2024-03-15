import { Request, Response, Router } from "express";
import { body, param, validationResult } from "express-validator";
import { authMiddleware } from "../auth/middleware";
import {
  CreateActorData,
  UpdateActorData,
  createActor,
  deleteActor,
  findAllActors,
  findOneActor,
  updateActor,
} from "./service";

export const actorsController = Router();

actorsController.post(
  "/actor",
  authMiddleware(),
  body("name").isString().trim().isLength({
    min: 1,
    max: 255,
  }),
  async (req: Request<any, any, CreateActorData>, res: Response) => {
    validationResult(req).throw();
    res.status(201).send(await createActor(req.body));
  }
);

actorsController.get(
  "/actors",
  authMiddleware(),
  async (_req: Request, res: Response) => {
    res.status(200).send(await findAllActors());
  }
);

actorsController.get(
  "/actor/:id",
  authMiddleware(),
  param("id").isInt(),
  async (req: Request<{ id: string }>, res: Response) => {
    validationResult(req).throw();
    res.status(200).send(await findOneActor(+req.params.id));
  }
);

actorsController.patch(
  "/actor/:id",
  authMiddleware(),
  param("id").isInt(),
  body("name").isString().trim().isLength({
    min: 1,
    max: 255,
  }),
  async (req: Request<{ id: string }, any, UpdateActorData>, res: Response) => {
    validationResult(req).throw();
    res.status(200).send(await updateActor(+req.params.id, req.body));
  }
);

actorsController.delete(
  "/actor/:id",
  authMiddleware(),
  async (req: Request<{ id: string }>, res: Response) => {
    validationResult(req).throw();
    res.status(200).send(await deleteActor(+req.params.id));
  }
);
