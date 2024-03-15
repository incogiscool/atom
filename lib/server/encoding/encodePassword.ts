import argon2 from "argon2";

export const encodePassword = async (password: string) => {
  const salt = process.env.HASH_SALT;
  const saltedString = password + salt;

  const hash = await argon2.hash(saltedString);

  return hash;
};
