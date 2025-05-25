import { Request, Response } from "express";
import { User } from "../models";

export const UserController = {
  getAll: async (req: Request, res: Response) => {
    const Users = await User.findAll();
    res.json(Users);
  },
  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await User.findByPk(id);
    if (User) res.json(User);
    else res.status(404).json({ message: "User not found" });
  },
  add: async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    res.status(201).json(User);
  },
  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [updated] = await User.update(req.body, { where: { id } });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  },
  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = await User.destroy({ where: { id } });
    if (deleted) res.json({ message: "User removed" });
    else res.status(404).json({ message: "User not found" });
  },
};
