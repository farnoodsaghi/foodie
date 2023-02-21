import bcryptjs from "bcryptjs";

const bcryptHash = async (
  unhashed: string,
  saltRounds: number = 10
): Promise<any> => {
  return new Promise((resolve, reject) => {
    bcryptjs.hash(unhashed, saltRounds, (error, hash) => {
      if (error) {
        reject(error);
      } else if (hash) {
        resolve(hash);
      }
    });
  });
};

export default bcryptHash;
