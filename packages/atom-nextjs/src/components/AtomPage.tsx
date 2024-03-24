'use server';
import React from 'react';
import { getProject } from '../lib/client/getProject';
import { AtomPostCard } from './AtomPostCard';

export const AtomPage = async ({
  projectKey,
  baseRoute,
}: {
  projectKey: string;
  baseRoute: string;
}) => {
  const res = await getProject(projectKey);
  const project = res.response;

  return (
    <div>
      {res.success ? (
        <>
          <h1 className="text-4xl font-semibold">{project.title}</h1>
          <div className="mt-12 flex flex-wrap gap-8">
            {project.posts.map(post => (
              <AtomPostCard post={post} key={post.id} baseRoute={baseRoute} />
            ))}
          </div>
        </>
      ) : (
        res.message
      )}
    </div>
  );
};
