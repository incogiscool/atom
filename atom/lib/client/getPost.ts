import { ApiResponse } from "@/app/api/auth/signup/route";
import { baseAPIRoute } from "@/lib/contants";
import { Post } from "@/lib/types";
import axios from "axios";

export const getPost = async (apiKey: string, postId: string) => {
  const res = (
    await axios.get<ApiResponse<Post>>(
      `${baseAPIRoute}/posts/get/single?post_id=${postId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
  ).data;

  if (!res.success) throw new Error(res.message || "Unknown error.");

  return res.response;
};
