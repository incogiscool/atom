import { AtomPage } from "@/atom/atom-components/AtomPage";
import { MainContainer } from "@/components/containers/MainContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Blog() {
  return (
    <MainContainer>
      <AtomPage baseRoute="/blog" apiKey={process.env.TEST_API_KEY!} />
    </MainContainer>
  );
}
