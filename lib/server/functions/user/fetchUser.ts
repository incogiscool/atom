import { ApiResponse } from "@/app/api/auth/signup/route";
import { baseAPIRoute } from "@/lib/contants";
import { UserDocument } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";

export const fetchUser = async () => {
  const response = await axios.get<ApiResponse<UserDocument>>(
    `${baseAPIRoute}/auth/user/get`,
    {
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );

  const data = response.data;

  // if (!data.success) throw new Error(data.message || "Internal server error.");

  return data;
};
