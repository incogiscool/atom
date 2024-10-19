import { ApiResponse, ClientProject } from '../types';
import { baseAPIRoute } from '../constants';

export const getProject = async (projectKey: string) => {
  const res = await fetch(`${baseAPIRoute}/projects/get/single/client`, {
    headers: {
      Authorization: `Bearer ${projectKey}`,
    },
  });

  const data = (await res.json()) as ApiResponse<ClientProject>;

  return data;
};
