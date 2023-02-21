import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user";
import bcryptHash from "../functions/bcryptHash";
import signJWT from "../functions/signJWT";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    message: "authorized",
    user: res.locals.jwt,
  });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcryptHash(password);
    if (hash) {
      const user = await User.create({
        name,
        email,
        password: hash,
      });

      const token = await signJWT(user!);

      if (token) {
        res.status(200).json({ user, token });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(401).json({ message: "unauthorized" });
    }

    if (user) {
      const verifyPassword = await bcryptjs.compare(password, user!.password);

      if (verifyPassword) {
        const token = await signJWT(user!);
        if (token) {
          res.status(200).json({ message: "auth success", token, user });
        }
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, error });
  }
};
