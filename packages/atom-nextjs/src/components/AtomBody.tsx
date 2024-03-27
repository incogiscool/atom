import React from 'react';
import sanitizeHtml from 'sanitize-html';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you

export const AtomBody = ({
  className,
  body,
}: {
  className?: string;
  body: string;
}) => {
  const sanitized = sanitizeHtml(body);

  return (
    <div className={className}>
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {sanitized}
      </Markdown>
    </div>
  );
};
