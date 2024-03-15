import { Metadata } from "next";
import { getPost } from "./getPost";

export const generatePostMetadata = async (
  apiKey: string,
  postId: string
): Promise<Metadata> => {
  const res = await getPost(apiKey, postId);
  const postData = res.response;

  return {
    title: postData?.title || "Couldn't find post.",
    description: postData.teaser || null,
    keywords: postData?.keywords || null,
    authors: {
      name: postData?.author || "Atom",
    },
  };
};
