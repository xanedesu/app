import { NextFunction, Request, Response, Router } from "express";
import { actorsController } from "./modules/actors/controller";
import { filmsController } from "./modules/films/controller";

export const apiController = Router();

apiController.use(actorsController);
apiController.use(filmsController);

apiController.use((_req: Request, res: Response) => {
  res.status(200).send({
    api: "ok",
  });
});

apiController.use(
  (err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (err) {
      return res.send(err);
    }

    return next();
  }
);
