import axios from 'axios';
import { ApiResponse, Post } from '../types';
import { baseAPIRoute } from '../constants';

export const getPost = async (apiKey: string, postId: string) => {
  const res = (
    await axios.get<ApiResponse<Post>>(
      `${baseAPIRoute}/posts/get/single?post_id=${postId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
  ).data;

  // if (!res.success) throw new Error(res.message || "Unknown error.");

  return res;
};
