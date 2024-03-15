import { AtomPage } from "@/atom/atom-components/AtomPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Blog() {
  return <AtomPage baseRoute="/blog" apiKey={process.env.TEST_API_KEY!} />;
}
