import { ProjectComponent } from "@/components/ui/project-page/ProjectComponent";
import { getProject } from "@/lib/client/projects/getProject";
import Link from "next/link";
import { HiArrowLongLeft } from "react-icons/hi2";

type ProjectPageParams = {
  params: {
    id: string;
  };
};

const ProjectPage = async ({ params }: ProjectPageParams) => {
  //this is a test function, it doesnt actually fetch anything
  const project = await getProject(params.id);

  return (
    <div className="h-screen flex flex-col">
      {/* <Link href={"/app"}>
        <div className="flex gap-2 items-center border py-3 px-5 text-center hover:bg-slate-100 transition">
          <HiArrowLongLeft className="text-2xl" />
          <p>Back to app</p>
        </div>
      </Link> */}
      <ProjectComponent project={project} />
    </div>
  );
};

export default ProjectPage;
