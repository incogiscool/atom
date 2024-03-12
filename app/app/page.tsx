import { AppSidebarNav } from "@/components/sidebars/AppSidebarNav";
import { columns } from "@/components/tables/UserDocumentProjects/columns";
import { DataTable } from "@/components/tables/UserDocumentProjects/table";
import { fetchUser } from "@/lib/server/functions/user/fetchUser";
import { redirect } from "next/navigation";

const AppPage = async () => {
  const { success, message, response: userDocument } = await fetchUser();

  return (
    <>
      {success ? (
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
        <p>{message || "Unknown error."}</p>
      )}
    </>
  );
};

export default AppPage;
