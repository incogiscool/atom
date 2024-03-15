import { ApiResponse } from "@/app/api/auth/signup/route";
import { ClientProject } from "@/app/api/projects/get/single/client/route";
import { baseAPIRoute } from "@/lib/contants";
import { Post, Project } from "@/lib/types";
import axios from "axios";

export const getProject = async (project_key: string) => {
  const res = (
    await axios.get<ApiResponse<ClientProject>>(
      `${baseAPIRoute}/projects/get/single/client`,
      {
        headers: {
          Authorization: `Bearer ${project_key}`,
        },
      }
    )
  ).data;

  // if (!res.success) throw new Error(res.message || "Unknown error.");

  return res;
};
