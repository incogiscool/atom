import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const AtomLoadingSkeleton = () => {
  return (
    <div className="flex gap-8 w-full flex-wrap">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="w-[350px] h-fit p-6 border rounded-lg">
            <Skeleton count={1} height={150} />
            <Skeleton count={1} height={30} className="mt-4" />
            <Skeleton count={3} className="mt-4" />
          </div>
        ))}
    </div>
  );
};
