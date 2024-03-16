import { ApiResponse, SignupRequestParams } from "@/app/api/auth/signup/route";
import { UpdateUserRequestParams } from "@/app/api/auth/user/update/route";
import { baseAPIRoute } from "@/lib/contants";
import { UserDocument } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";

export const updateUser = async (body: UpdateUserRequestParams) => {
  const response = await axios.patch<ApiResponse>(
    `${baseAPIRoute}/auth/user/update`,
    body
  );

  const data = response.data;

  if (!data.success) throw new Error(data.message || "Internal server error.");

  toast.success(data.message);

  return data.response;
};
