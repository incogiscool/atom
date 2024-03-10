import { ApiResponse } from "@/app/api/auth/signup/route";
import { GetAllPostsResponse } from "@/app/api/get-all-posts/route";
import { baseAPIRoute } from "@/lib/contants";
import axios from "axios";

export const getAllPosts = async (apiKey: string) => {
  const res = (
    await axios.get<ApiResponse<GetAllPostsResponse>>(
      `${baseAPIRoute}/get-all-posts`,
      {
        headers: {
          api_key: apiKey,
        },
      }
    )
  ).data;

  if (!res.success) throw new Error(res.message || "Unknown error.");

  return res.response;
};
