"use client";

import { AppSidebarNav } from "@/components/sidebars/AppSidebarNav";
import { columns } from "@/components/tables/UserDocumentProjects/columns";
import { DataTable } from "@/components/tables/UserDocumentProjects/table";
import { useUserDocument } from "@/state/UserDocumentState";

const AppPage = async () => {
  //CREATE PROTECTEDROUTES COMPONENT THAT WILL CHECK IF USER LOGGEDD IN ASWELL W SERVER COMPONENT
  const { userDocument } = useUserDocument();

  return (
    <>
      {userDocument ? (
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
          </main>
        </div>
      ) : (
        "make so that it is loading + make a container that does all of app and protected routes"
      )}
    </>
  );
};

export default AppPage;
