import { Application, Request, Response } from "express";

const register = function (app: Application): void {
  app.get("/", (req: Request, res: Response) => {
    res.send("blah blah");
  });
};

export default register;
