import { Request, Response } from "express";
import { Income } from "../models";

export const IncomeController = {
  getAll: async (req: Request, res: Response) => {
    const Incomes = await Income.findAll();
    res.json(Incomes);
  },
  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const income = await Income.findByPk(id);
    if (Income) res.json(Income);
    else res.status(404).json({ message: "Income not found" });
  },
  add: async (req: Request, res: Response) => {
    const income = await Income.create(req.body);
    res.status(201).json(Income);
  },
  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [updated] = await Income.update(req.body, { where: { id } });
    if (updated) {
      const updatedIncome = await Income.findByPk(id);
      res.json(updatedIncome);
    } else {
      res.status(404).json({ message: "Income not found" });
    }
  },
  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = await Income.destroy({ where: { id } });
    if (deleted) res.json({ message: "Income removed" });
    else res.status(404).json({ message: "Income not found" });
  },
};
