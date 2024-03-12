import { ApiResponse } from "@/app/api/auth/signup/route";
import { baseAPIRoute } from "@/lib/contants";
import { Project } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";

export const deleteProject = async (project_id: string) => {
  const res = (
    await axios.delete<ApiResponse<Project>>(
      `${baseAPIRoute}/projects/delete?project_id=${project_id}`
    )
  ).data;

  if (!res.success) throw new Error(res.message || "Unkown error.");

  toast.success(res.message);

  return res.response;
};
