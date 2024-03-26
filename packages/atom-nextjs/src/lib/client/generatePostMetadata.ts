import { Metadata } from 'next';
import { getPost } from './getPost';

export const generatePostMetadata = async (
  apiKey: string,
  postId: string
): Promise<Metadata> => {
  const res = await getPost(apiKey, postId);
  const postData = res.response;

  if (!res.success)
    return {
      title: "Couldn't find post.",
      authors: {
        name: 'Atom',
      },
    };

  return {
    title: postData.title || "Couldn't find post.",
    description: postData.teaser,
    keywords: postData.keywords,
    authors: {
      name: postData.author,
    },
  };
};
