import { ApiResponse } from "@/app/api/auth/signup/route";
import { baseAPIRoute } from "@/lib/contants";
import { Post } from "@/lib/types";
import axios from "axios";

export const getPost = async (apiKey: string, postId: string) => {
  const res = (
    await axios.get<ApiResponse<Post | null>>(
      `${baseAPIRoute}/get-post?post_id=${postId}`,
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
