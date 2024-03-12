import { ApiResponse } from "@/app/api/auth/signup/route";
import { baseAPIRoute } from "@/lib/contants";
import { Project } from "@/lib/types";
import axios from "axios";

export const createProject = async (title: string) => {
  const res = (
    await axios.post<ApiResponse<Project>>(`${baseAPIRoute}/projects/create`, {
      title,
    })
  ).data;

  if (!res.success) throw new Error(res.message || "Unkown error.");

  return res.response;
};
