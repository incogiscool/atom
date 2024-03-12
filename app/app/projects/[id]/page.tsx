import { ProjectComponent } from "@/components/ui/project-page/ProjectComponent";
import { getProject } from "@/lib/server/functions/projects/getProject";

type ProjectPageParams = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: ProjectPageParams) => {
  const { success, message, response: project } = await getProject(params.id);

  return (
    <>
      {success ? (
        <div className="h-screen flex flex-col">
          <ProjectComponent project={project} />
        </div>
      ) : (
        <p>{message || "Unknown error."}</p>
      )}
    </>
  );
};

export default Page;
