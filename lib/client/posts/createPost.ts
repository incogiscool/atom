import { ApiResponse } from "@/app/api/auth/signup/route";
import { CreatePostRequest } from "@/app/api/posts/create/route";
import { baseAPIRoute } from "@/lib/contants";
import { Post, Project } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";

export const createPost = async (
  project_id: string,
  inputData: CreatePostRequest
) => {
  const res = (
    await axios.post<ApiResponse<Post>>(
      `${baseAPIRoute}/posts/create?project_id=${project_id}`,
      inputData
    )
  ).data;

  if (!res.success) throw new Error(res.message || "Unkown error.");

  toast.success(res.message);

  return res.response;
};
