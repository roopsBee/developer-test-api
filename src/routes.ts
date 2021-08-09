import { Application } from "express";
import testRoutes from "./routes/test.routes";
import creditSearch from "./routes/credit-search";

export default (app: Application): void => {
  testRoutes(app);
  creditSearch(app);
};
