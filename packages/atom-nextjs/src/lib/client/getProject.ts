import axios from 'axios';
import { ApiResponse, ClientProject } from '../types';
import { baseAPIRoute } from '../constants';

export const getProject = async (projectKey: string) => {
  const res = (
    await axios.get<ApiResponse<ClientProject>>(
      `${baseAPIRoute}/projects/get/single/client`,
      {
        headers: {
          Authorization: `Bearer ${projectKey}`,
        },
      }
    )
  ).data;

  // if (!res.success) throw new Error(res.message || "Unknown error.");

  return res;
};
