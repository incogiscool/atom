"use server";
import { getProject } from "../lib/client/getProject";
import { AtomPostCard } from "./AtomPostCard";

export const AtomPage = async ({
  apiKey,
  baseRoute,
}: {
  apiKey: string;
  baseRoute: string;
}) => {
  const res = await getProject(apiKey);
  const project = res.response;

  return (
    <main className="sm:p-20 p-8 flex flex-col justify-center">
      {res.success ? (
        <>
          <h1 className="text-center text-4xl font-bold">{project.title}</h1>
          <div className="mt-12 flex flex-wrap gap-8 justify-center">
            {project.posts.map((post) => (
              <AtomPostCard post={post} key={post.id} baseRoute={baseRoute} />
            ))}
          </div>
        </>
      ) : (
        "could not fetch posts"
      )}
    </main>
  );
};
