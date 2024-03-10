import crypto from "crypto";

export const encodePassword = (password: string) => {
  const salt = process.env.HASH_SALT;
  const saltedString = password + salt;

  const encodedHex = crypto
    .createHash("sha256")
    .update(saltedString)
    .digest("hex");

  return encodedHex;
};
