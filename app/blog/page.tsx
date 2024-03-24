import { AtomPage } from "atom-nextjs";
import { MainContainer } from "@/components/containers/MainContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Blog() {
  return (
    <MainContainer>
      <AtomPage baseRoute="/blog" projectKey={process.env.ATOM_PROJECT_KEY!} />
    </MainContainer>
  );
}
