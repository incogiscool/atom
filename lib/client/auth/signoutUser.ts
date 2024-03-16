import { ApiResponse, SignupRequestParams } from "@/app/api/auth/signup/route";
import { baseAPIRoute } from "@/lib/contants";
import { UserDocument } from "@/lib/types";
import axios from "axios";

export const signoutUser = async () => {
  const response = await axios.post<ApiResponse>(
    `${baseAPIRoute}/auth/signout`
  );

  const data = response.data;

  if (!data.success) throw new Error(data.message || "Internal server error.");

  return data.response;
};
