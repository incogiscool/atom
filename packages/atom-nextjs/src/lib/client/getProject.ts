import axios from 'axios';
import { ApiResponse, ClientProject } from '../types';
import { baseAPIRoute } from '../constants';

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
