"use server";
import { Atom } from "@/atom/atom-components/Atom";
import { generatePostMetadata } from "@/atom/lib/server/generatePostMetadata";

export type BlogParams = { params: { id: string } };

export const generateMetadata = async ({ params }: BlogParams) => {
  const metadata = await generatePostMetadata(
    process.env.TEST_API_KEY!,
    params.id
  );

  return metadata;
};

const BlogPage = async ({ params }: BlogParams) => {
  return <Atom apiKey={process.env.TEST_API_KEY!} postId={params.id} />;
};

export default BlogPage;
