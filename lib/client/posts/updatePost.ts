import { ApiResponse } from "@/app/api/auth/signup/route";
import { CreatePostRequest } from "@/app/api/posts/create/route";
import { UpdatePostRequestParams } from "@/app/api/posts/update/route";
import { baseAPIRoute } from "@/lib/contants";
import { Post, Project } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";

export const updatePost = async (
  project_id: string,
  post_id: string,
  inputData: UpdatePostRequestParams
) => {
  const res = (
    await axios.patch<ApiResponse>(
      `${baseAPIRoute}/posts/update?project_id=${project_id}&&post_id=${post_id}`,
      inputData
    )
  ).data;

  if (!res.success) throw new Error(res.message || "Unkown error.");

  toast.success(res.message);

  return res.response;
};
