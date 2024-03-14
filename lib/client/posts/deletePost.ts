import { ApiResponse } from "@/app/api/auth/signup/route";
import { CreatePostRequest } from "@/app/api/posts/create/route";
import { baseAPIRoute } from "@/lib/contants";
import { Post, Project } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";

export const deletePost = async (project_id: string, post_id: string) => {
  const res = (
    await axios.delete<ApiResponse>(
      `${baseAPIRoute}/posts/delete?project_id=${project_id}&&post_id=${post_id}`
    )
  ).data;

  if (!res.success) throw new Error(res.message || "Unkown error.");

  toast.success(res.message);

  return res.response;
};
