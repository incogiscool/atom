import { ApiResponse } from "@/app/api/auth/signup/route";
import { baseAPIRoute } from "@/lib/contants";
import { Project } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";

export const getProject = async (project_id: string) => {
  const res = (
    await axios.get<ApiResponse<Project>>(
      `${baseAPIRoute}/projects/get/single?project_id=${project_id}`,
      {
        headers: {
          Cookie: cookies().toString(),
        },
      }
    )
  ).data;

  if (!res.success) throw new Error(res.message || "Unknown error.");

  return res.response;
};
