import { Request, Response, RequestHandler } from "express";
import { User } from "../models";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

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
  register: (async (req: Request, res: Response) => {
    // Get request's body
    const { email, password, name, role } = req.body;

    // Check if user exists
    if (await User.findOne({ where: { email } })) {
      res
        .status(500)
        .json({ error: `User with email ${email} already existed` });
    }
    if (await User.findOne({ where: { name } })) {
      res
        .status(500)
        .json({ error: `User with username ${name} already existed` });
    }

    // If not, proceed to register the user
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      res.status(201).json({ message: "User registered", user });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({
          error: "An unknown error occurred while registering a user.",
        });
      }
    }
  }) as RequestHandler,
  login: (async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.get("password")))) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const token = jwt.sign(
        {
          id: user.get("id"),
          name: user.get("name"),
          email: user.get("email"),
          role: user.get("role"),
        },
        SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Login successful",
        token, // This will be received by frontend to store the session
        user: {
          id: user.get("id"),
          name: user.get("name"),
          email: user.get("email"),
          role: user.get("role"),
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res
          .status(500)
          .json({ error: "An unknown error occurred while logging in." });
      }
    }
  }) as RequestHandler,
};
