import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { generateToken } from "../authentification/jwtMiddleware";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userRepository = getRepository(User);
  const user = userRepository.create({ name, email, password: hashedPassword });
  await userRepository.save(user);
  res.send("User registered");
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send("Invalid credentials");
  }

  const token = generateToken(user);
  res.header("Authorization", `Bearer ${token}`).send(token);
};
