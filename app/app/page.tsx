import { AppSidebarNav } from "@/components/sidebars/AppSidebarNav";
import { columns } from "@/components/tables/UserDocumentProjects/columns";
import { DataTable } from "@/components/tables/UserDocumentProjects/table";
import { UserDocumentProjects } from "@/lib/types";

const AppPage = () => {
  //CREATE PROTECTEDROUTES COMPONENT THAT WILL CHECK IF USER LOGGEDD IN ASWELL W SERVER COMPONENT

  const testProjects: UserDocumentProjects[] = [
    {
      id: "test1",
      title: "Test 1",
      creator: {
        email: "adam546944@gmail.com",
        uid: "123",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "test2",
      title: "Test 2",
      creator: {
        email: "adam546944@gmail.com",
        uid: "123",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "test3",
      title: "Test 3",
      creator: {
        email: "adam546944@gmail.com",
        uid: "123",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <div className="flex gap-12">
      <AppSidebarNav
        active="projects"
        email="adam546944@gmail.com"
        name="Adam El Taha"
      />
      <main className="flex-1 h-screen py-12 p-6">
        <h1 className="font-semibold text-4xl">Projects</h1>
        <div className="mt-12">
          <DataTable columns={columns} data={testProjects} />
        </div>
      </main>
    </div>
  );
};

export default AppPage;
