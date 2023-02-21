import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

const verifyToken = async (token: string, secret: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, response) => {
      if (error) {
        reject(error);
      } else if (response) {
        resolve(response);
      }
    });
  });
};

const extractJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const payload = await verifyToken(token, config.server.token.secret);

      if (payload) {
        res.locals.jwt = payload;
        next();
      }
    } else {
      res.status(401).json({
        message: "unauthorized",
      });
    }
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
      error,
    });
  }
};

export default extractJWT;
