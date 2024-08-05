import { Request, Response } from "express";

export const protectedRoute = (req: Request, res: Response) => {
  res.send("This is a protected route");
};
