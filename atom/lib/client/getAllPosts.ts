import { ApiResponse } from "@/app/api/auth/signup/route";
import { baseAPIRoute } from "@/lib/contants";
import { Post } from "@/lib/types";
import axios from "axios";

export const getAllPosts = async (project_key: string) => {
  const res = (
    await axios.get<ApiResponse<Post[]>>(`${baseAPIRoute}/posts/get/all`, {
      headers: {
        Authorization: `Bearer ${project_key}`,
      },
    })
  ).data;

  if (!res.success) throw new Error(res.message || "Unknown error.");

  return res.response;
};
