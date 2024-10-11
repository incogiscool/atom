import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const AtomArticleSkeleton = () => {
  return (
    <div className="flex justify-center">
      <article className="prose lg:prose-xl w-full">
        <Skeleton count={1} height={450} />
        <Skeleton count={1} height={30} className="mt-4" />
        <Skeleton count={6} className="mt-4" />
      </article>
    </div>
  );
};
