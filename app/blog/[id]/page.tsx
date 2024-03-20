"use server";
import { Atom } from "@/atom/atom-components/Atom";
import { generatePostMetadata } from "@/atom/lib/client/generatePostMetadata";
import { MainContainer } from "@/components/containers/MainContainer";

export type BlogParams = { params: { id: string } };

export const generateMetadata = async ({ params }: BlogParams) => {
  const metadata = await generatePostMetadata(
    process.env.TEST_API_KEY!,
    params.id
  );

  return metadata;
};

export default async function BlogPage({ params }: BlogParams) {
  return (
    <MainContainer>
      <Atom apiKey={process.env.TEST_API_KEY!} postId={params.id} />
    </MainContainer>
  );
}
