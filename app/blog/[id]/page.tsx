import { Atom, AtomArticleSkeleton, generatePostMetadata } from "atom-nextjs";
import { MainContainer } from "@/components/containers/MainContainer";
import { Suspense } from "react";
import { cookies } from "next/headers";

export type BlogParams = { params: { id: string } };

export const generateMetadata = async ({ params }: BlogParams) => {
  const metadata = await generatePostMetadata(
    process.env.ATOM_PROJECT_KEY!,
    params.id
  );

  return metadata;
};

export default function BlogPage({ params }: BlogParams) {
  const _ = cookies();

  return (
    <MainContainer>
      <Suspense fallback={<AtomArticleSkeleton />}>
        <Atom projectKey={process.env.ATOM_PROJECT_KEY!} postId={params.id} />
      </Suspense>
    </MainContainer>
  );
}
