import { Atom, generatePostMetadata } from "atom-nextjs";
import { MainContainer } from "@/components/containers/MainContainer";

export type BlogParams = { params: { id: string } };

export const generateMetadata = async ({ params }: BlogParams) => {
  const metadata = await generatePostMetadata(
    process.env.ATOM_PROJECT_KEY!,
    params.id
  );

  return metadata;
};

export const dynamic = "force-dynamic";

export default function BlogPage({ params }: BlogParams) {
  return (
    <MainContainer>
      <Atom projectKey={process.env.ATOM_PROJECT_KEY!} postId={params.id} />
    </MainContainer>
  );
}
