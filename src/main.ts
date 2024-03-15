import "express-async-errors";

import express from "express";
import { apiController } from "./api";

async function bootstrap() {
  const app = express();

  app.use(express.json());
  app.use("/api", apiController);

  app.listen(3013);
}

bootstrap();
