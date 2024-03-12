"use client";
import { AppSidebarNav } from "@/components/sidebars/AppSidebarNav";
import { columns } from "@/components/tables/UserDocumentProjects/columns";
import { DataTable } from "@/components/tables/UserDocumentProjects/table";
import { Button } from "@/components/ui/button";
import { createProject } from "@/lib/client/projects/createProject";
import { UserDocument, UserDocumentProjects } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { projectTitleMaxLength } from "@/lib/contants";

export function ProjectPage({ userDocument }: { userDocument: UserDocument }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  async function handleCreateProject() {
    try {
      if (projectTitle === "") throw new Error("Project name cannot be blank.");

      setIsLoading(true);

      await createProject(projectTitle);
      setIsLoading(false);

      setDialogOpen(false);

      router.refresh();
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);

      toast.error(err.message || err);
    }
  }

  return (
    <div className="flex gap-12">
      <AppSidebarNav
        active="projects"
        email={userDocument.email}
        name={userDocument.first_name}
      />
      <main className="flex-1 h-screen py-12 p-6">
        <h1 className="font-semibold text-4xl">Projects</h1>
        <div className="mt-12">
          <DataTable columns={columns} data={userDocument.projects} />
        </div>

        <Button className="w-full mt-4" onClick={() => setDialogOpen(true)}>
          Create Project
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create project</DialogTitle>
            </DialogHeader>
            <div>
              <form>
                <div>
                  <label>Project title</label>
                  <Input
                    type="text"
                    className="mt-1"
                    maxLength={projectTitleMaxLength}
                    onChange={(e) => setProjectTitle(e.target.value)}
                  />
                </div>
                <Button
                  className="mt-6"
                  disabled={isLoading}
                  onClick={handleCreateProject}
                >
                  Create project
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
