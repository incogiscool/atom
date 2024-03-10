import { randomBytes } from "crypto";

export const generateProjectKey = () => {
  const size = 32;
  const format = "base64";

  const buffer = randomBytes(size);
  return "atom-" + buffer.toString(format);
};
