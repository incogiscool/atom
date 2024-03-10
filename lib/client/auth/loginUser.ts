import { ApiResponse } from "@/app/api/auth/signup/route";
import { baseAPIRoute } from "@/lib/contants";
import { UserDocument } from "@/lib/types";
import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post<ApiResponse<UserDocument>>(
    `${baseAPIRoute}/auth/signin`,
    {
      email,
      password,
    }
  );

  const data = response.data;

  if (!data.success) throw new Error(data.message || "Internal server error.");

  return data.response;
};
