import { Request, Response } from "express";
import { IncomeModel } from "../models/income";

export const IncomeController = {
  getAll: (req: Request, res: Response) => {
    res.json(IncomeModel.getAll());
  },
  add: (req: Request, res: Response) => {
    const income = IncomeModel.add(req.body);
    res.status(201).json(income);
  },
};
