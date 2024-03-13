"use client";
import { Project } from "@/lib/types";
import { useState } from "react";
import { ProjectComponentSidebar } from "@/components/sidebars/ProjectComponentSidebar";
import { ProjectFormComponent } from "./ProjectFormComponent";

export const ProjectComponent = ({ project }: { project: Project }) => {
  const [openedPostId, setOpenedPostId] = useState(
    project.posts[1]?.id || null
  );

  const openedPost =
    project.posts.find((post) => post.id === openedPostId) || null;

  async function onSubmit() {}

  return (
    <div className="flex">
      <ProjectComponentSidebar
        project={project}
        setSelectedPostId={setOpenedPostId}
        selectedPostId={openedPostId}
      />
      <div className="p-6 w-full flex-1 h-screen">
        <div className="flex h-full">
          <div className="overflow-auto w-full">
            {openedPost ? (
              <ProjectFormComponent openedPost={openedPost} />
            ) : (
              "No opened post."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
