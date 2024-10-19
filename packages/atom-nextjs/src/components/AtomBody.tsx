import React from 'react';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { compileMDX } from 'next-mdx-remote/rsc';

export const AtomBody = async ({
  className,
  body,
  remarkPlugins,
  rehypePlugins,
}: {
  className?: string;
  remarkPlugins?: any[];
  rehypePlugins?: any[];
  body: string;
}) => {
  const { content } = await compileMDX({
    source: body,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, ...(remarkPlugins || [])],
        rehypePlugins: [rehypeSanitize, ...(rehypePlugins || [])],
      },
    },
  });

  return <div className={className}>{content}</div>;
};
