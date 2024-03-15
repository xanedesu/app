import { Request, Response, Router } from "express";
import { body, param, validationResult } from "express-validator";
import { authMiddleware } from "../auth/middleware";
import {
  CreateFilmData,
  UpdateFilmData,
  createFilm,
  deleteFilm,
  findAllFilms,
  findOneFilm,
  updateFilm,
} from "./service";

export const filmsController = Router();

filmsController.post(
  "/film",
  authMiddleware(),
  body("name").isString().trim().isLength({
    min: 1,
    max: 255,
  }),
  body("actors").isArray({
    min: 1,
  }),
  body("actors.*").isInt(),
  async (req: Request<any, any, CreateFilmData>, res: Response) => {
    validationResult(req).throw();
    res.status(201).send(await createFilm(req.body));
  }
);

filmsController.get(
  "/films",
  authMiddleware(),
  async (_req: Request, res: Response) => {
    res.status(200).send(await findAllFilms());
  }
);

filmsController.get(
  "/film/:id",
  authMiddleware(),
  param("id").isInt(),
  async (req: Request<{ id: string }>, res: Response) => {
    validationResult(req).throw();
    res.status(200).send(await findOneFilm(+req.params.id));
  }
);

filmsController.patch(
  "/film/:id",
  authMiddleware(),
  param("id").isInt(),
  body("name")
    .isString()
    .trim()
    .isLength({
      min: 1,
      max: 255,
    })
    .optional(),
  body("actors")
    .isArray({
      min: 1,
    })
    .optional(),
  body("actors.*").isInt(),
  async (req: Request<{ id: string }, any, UpdateFilmData>, res: Response) => {
    validationResult(req).throw();
    res.status(200).send(await updateFilm(+req.params.id, req.body));
  }
);

filmsController.delete(
  "/film/:id",
  authMiddleware(),
  async (req: Request<{ id: string }>, res: Response) => {
    validationResult(req).throw();
    res.status(200).send(await deleteFilm(+req.params.id));
  }
);
