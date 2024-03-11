import { Metadata } from "next";
import { getPost } from "./getPost";

export const generatePostMetadata = async (
  apiKey: string,
  postId: string
): Promise<Metadata> => {
  const postData = await getPost(apiKey, postId);

  return {
    title: postData?.title || "Couldn't find post.",
    description: postData?.body.slice(0, 35) + "..." || null,
    keywords: postData?.keywords || null,
    authors: {
      name: postData?.author || "Atom",
    },
  };
};
