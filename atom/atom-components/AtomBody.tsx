import { MDXRemote } from "next-mdx-remote/rsc";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you

export const AtomBody = async ({
  className,
  body,
}: {
  className?: string;
  body: string;
}) => {
  const sanitized = sanitizeHtml(body);
  // const parsed = await marked(sanitized);

  return (
    <div className={className}>
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        //@ts-expect-error
        rehypePlugins={[rehypeKatex]}
      >
        {sanitized}
      </Markdown>
    </div>
  );
};
