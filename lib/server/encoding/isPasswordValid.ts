import { encodePassword } from "./encodePassword";

export const isPasswordValid = (hash: string, password: string) => {
  const encodedString = encodePassword(password);

  return encodedString === hash;
};
