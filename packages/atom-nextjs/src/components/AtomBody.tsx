import React from 'react';
import remarkMath from 'remark-math';
import rehypeSanitize from 'rehype-sanitize';
import { compileMDX } from 'next-mdx-remote/rsc';

export const AtomBody = async ({
  className,
  body,
}: {
  className?: string;
  body: string;
}) => {
  const { content } = await compileMDX({
    source: body,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeSanitize],
      },
    },
  });

  return <div className={className}>{content}</div>;
};
