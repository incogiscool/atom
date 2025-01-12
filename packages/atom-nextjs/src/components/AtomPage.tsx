import React from 'react';
import { getProject } from '../lib/client/getProject';
import { AtomPostCard } from './AtomPostCard';

export const AtomPage = async ({
  projectKey,
  baseRoute,
  title = true,
}: {
  projectKey: string;
  baseRoute: string;
  title?: boolean;
}) => {
  const res = await getProject(projectKey);
  const project = res.response;

  return (
    <div>
      {res.success ? (
        <>
          {title && <h1 className="text-4xl font-semibold">{project.title}</h1>}
          <div
            className={`${title &&
              'mt-6'} flex items-start justify-end flex-wrap flex-row-reverse gap-8`}
          >
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
