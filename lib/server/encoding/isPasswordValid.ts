import argon2 from "argon2";

export const isPasswordValid = async (hash: string, password: string) => {
  return await argon2.verify(hash, password + process.env.HASH_SALT);
};
