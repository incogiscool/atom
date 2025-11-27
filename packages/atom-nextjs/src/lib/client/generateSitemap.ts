import { getProject } from './getProject';

export const generateSitemap = async (
  projectKey: string,
  blogRoute: string
) => {
  const response = await getProject(projectKey);

  const project = response.response;

  const routes =
    project?.posts
      .map((post) => ({
        url: `${blogRoute}/${post.id}`,
        lastModified: new Date(post.updatedAt),
        priority: 0.5,
      }))
      .concat([
        {
          url: blogRoute,
          lastModified: project.updatedAt,
          priority: 0.6,
        },
      ]) ?? [];

  return routes;
};
