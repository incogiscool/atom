import { MainContainer } from "@/components/containers/MainContainer";
import { NpmPackageComponent } from "@/components/misc/NpmPackageComponent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark as codeTheme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Tweet } from "react-tweet";

const atomPageComponentString = `// app/blog/page.tsx

import { AtomPage } from 'atom-nextjs';
import { MyAppContainer } from '@/...';

export const metadata = {
  title: 'Blog',
};

export default function Blog() {
  return (
    <MyAppContainer>
      <AtomPage baseRoute="/blog" projectKey={process.env.ATOM_PROJECT_KEY!} />
    </MyAppContainer>
  );
}
`;

const atomBlogComponentString = `// app/blog/[id]/page.tsx

import { Atom, generatePostMetadata } from 'atom-nextjs';
import { MyAppContainer } from '@/...';

export type BlogParams = { params: { id: string } };

export const generateMetadata = async ({ params }: BlogParams) => {
  const metadata = await generatePostMetadata(
    process.env.ATOM_PROJECT_KEY!,
    params.id
  );

  return metadata;
};

export default async function BlogPage({ params }: BlogParams) {
  return (
    <MyAppContainer>
      <Atom projectKey={process.env.ATOM_PROJECT_KEY!} postId={params.id} />
    </MyAppContainer>
  );
}

`;

const Home = () => {
  const content = [
    {
      title: "Create your blog page route and add the blog page component.",
      description:
        "Create your blog file (/app/blog/page.tsx), import your API key, and our pre-made blog component. This will handle the blog page, where users can select what blog post to read.",
      code: atomPageComponentString,
    },
    {
      title: "Create your post page route, and add the post component.",
      description:
        "Create your post file (/app/blog/[id]/page.tsx), import your API key, and our pre-made post component. This component will handle the page that includes your blog/post text.",
      code: atomBlogComponentString,
    },
  ];

  const twitterWidgeTweetIds = [
    "1757747417238171941",
    "1756975468627014116",
    "1757747417238171941",
    "1756975468627014116",
    "1757747417238171941",
    "1756975468627014116",
  ];

  return (
    <MainContainer className="flex flex-col gap-36">
      <section className="h-screen items-center flex flex-col">
        <h1 className="text-6xl font-bold max-w-2xl text-center">
          Ship blogs and articles in minutes.
        </h1>
        <p className="mt-4">
          Create, edit, and publish a fully functioning blog in NextJS quickly
          using Atom.
        </p>
        <div className="space-y-4 mt-8 z-10">
          <Link href={"/signin"}>
            <Button className="w-full">Get started</Button>
          </Link>
          <NpmPackageComponent />
          {/* <Button variant={"outline"}>See demo</Button> */}
        </div>
        <div className="mt-12 relative">
          <iframe
            src="https://demo.arcade.software/HoopYQB3bkPgqxaXQhkt?embed&show_copy_link=true"
            title="Atom - The NextJS CMS"
            frameBorder="0"
            loading="lazy"
            allowFullScreen={true}
            allow="clipboard-write"
            style={{
              width: "900px",
              height: "475px",
              colorScheme: "light",
              position: "relative",
              zIndex: "1", // Ensure the iframe is on top
            }}
          />
          <div
            className="absolute bg-gradient-to-r from-pink-500 to-orange-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/6 h-4/6 blur-[100px]"
            style={{
              zIndex: "0", // Ensure the gradient div is behind the iframe
            }}
          />
        </div>
      </section>
      <section>
        <h1 className="text-4xl text-center font-semibold">
          Get started with just two files
        </h1>
        <div className="mt-20 flex flex-col gap-12 items-center justify-center">
          {content.map((item, index) => (
            <div
              className={`flex gap-24 justify-center items-center flex-wrap ${
                index % 2 === 0 ? "" : "flex-row-reverse"
              }`}
              key={item.title + index}
            >
              <div className="max-w-xl">
                <h3 className="text-3xl font-semibold">{item.title}</h3>
                <p className="mt-2">{item.description}</p>
              </div>
              <div>
                <SyntaxHighlighter
                  customStyle={{
                    // border: "1px solid #A9A9A9",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "11px",
                  }}
                  language="javascript"
                  style={codeTheme}
                >
                  {item.code}
                </SyntaxHighlighter>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="text-center items-center justify-center flex flex-col">
        <h1 className="text-4xl font-semibold">Not convinced yet?</h1>
        <p className="text-slate-500">See what others think about Atom </p>
        <div className="flex flex-wrap gap-12 justify-center items-start text-left">
          {twitterWidgeTweetIds.map((id) => (
            <Tweet key={id} id={id} />
          ))}
        </div>
      </section>
      <section className="items-center flex-col flex justify-center">
        <div className="flex items-center justify-center gap-12  p-10 rounded-lg border">
          <div>
            <p className="text-slate-500">Ready to get started?</p>
            <h1 className="text-4xl font-semibold">Sign up for free</h1>
          </div>
          <Link href={"/signup"}>
            <Button>Get started</Button>
          </Link>
        </div>
      </section>
    </MainContainer>
  );
};

export default Home;
