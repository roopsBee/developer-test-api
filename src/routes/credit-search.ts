import { Application } from "express";

export default (app: Application): void => {
  app.get("/credit-search", async (req, res) => {
    res.json({ message: "credit" });
  });
};
