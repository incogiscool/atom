import { AtomPage } from "atom-nextjs";
import { MainContainer } from "@/components/containers/MainContainer";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Blog() {
  // Opt of caching using cookies
  const _cookies = cookies();

  return (
    <MainContainer>
      <AtomPage baseRoute="/blog" projectKey={process.env.ATOM_PROJECT_KEY!} />
    </MainContainer>
  );
}
