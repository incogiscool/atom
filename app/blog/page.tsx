import { AtomLoadingSkeleton, AtomPage } from "atom-nextjs";
import { MainContainer } from "@/components/containers/MainContainer";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Blog() {
  // Opt of caching using cookies
  const _cookies = cookies();

  return (
    <MainContainer>
      <Suspense fallback={<AtomLoadingSkeleton />}>
        <AtomPage
          baseRoute="/blog"
          projectKey={process.env.ATOM_PROJECT_KEY!}
        />
      </Suspense>
    </MainContainer>
  );
}
