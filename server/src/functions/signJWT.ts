import jwt from "jsonwebtoken";
import config from "../config/config";
import IUser from "../interfaces/user";

const signJWT = async (user: IUser): Promise<any> => {
  const currentTime = new Date().getTime();
  const expirationTime =
    currentTime + Number(config.server.token.expireTime) * 100000;
  const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  return new Promise((resolve, reject) => {
    jwt.sign(
      { email: user.email, name: user.name },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          reject(error);
        } else if (token) {
          resolve(token);
        }
      }
    );
  });
};

export default signJWT;
