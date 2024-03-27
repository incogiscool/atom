import React from 'react';
import Link from 'next/link';
import { LuDot } from 'react-icons/lu';
import { ClientPost } from '../lib/types';

export const AtomPostCard = ({
  post,
  baseRoute,
}: {
  post: ClientPost;
  baseRoute: string;
}) => {
  return (
    <Link
      href={`${baseRoute}/${post.id}`}
      className="w-[350px] h-fit p-4 border rounded-lg hover:bg-slate-50 transition"
    >
      {post.image && (
        <div
          className="rounded-md mb-4"
          style={{
            backgroundImage: `url(${post.image})`,
            width: '100%',
            height: 200,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        />
      )}
      <div className="space-y-2">
        <div className="text-sm text-slate-500 flex gap-1 items-center">
          <span>{new Date(post.createdAt).toDateString()}</span>
          <LuDot fontSize={24} />
          <span>{post.author}</span>
        </div>
        <div className="space-y-1">
          <h2 className="font-semibold text-lg">{post.title}</h2>
          <p className="text-sm text-slate-500">{post.teaser}</p>
        </div>
      </div>
    </Link>
  );
};
