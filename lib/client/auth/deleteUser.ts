import { DeleteUserRequestBody } from "@/app/api/auth/delete/route";
import { ApiResponse, SignupRequestParams } from "@/app/api/auth/signup/route";
import { baseAPIRoute } from "@/lib/contants";
import { UserDocument } from "@/lib/types";
import axios from "axios";

export const deleteUser = async (body: DeleteUserRequestBody) => {
  const response = await axios.delete<ApiResponse>(
    `${baseAPIRoute}/auth/delete`,
    {
      data: body,
    }
  );

  const data = response.data;

  if (!data.success) throw new Error(data.message || "Internal server error.");

  return data.response;
};
