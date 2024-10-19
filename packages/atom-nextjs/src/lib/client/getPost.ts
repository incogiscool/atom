import { ApiResponse, Post } from '../types';
import { baseAPIRoute } from '../constants';

export const getPost = async (projectKey: string, postId: string) => {
  const res = await fetch(
    `${baseAPIRoute}/posts/get/single?post_id=${postId}`,
    {
      headers: {
        Authorization: `Bearer ${projectKey}`,
      },
    }
  );

  const data = (await res.json()) as ApiResponse<Post>;

  return data;
};
