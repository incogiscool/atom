import { fetchUser } from "@/lib/server/functions/user/fetchUser";
import { ProjectPage } from "../../components/pages/projects/ProjectPage";

const AppPage = async () => {
  const { success, message, response: userDocument } = await fetchUser();

  return (
    <>
      {success ? (
        <ProjectPage userDocument={userDocument} />
      ) : (
        <p>{message || "Unknown error."}</p>
      )}
    </>
  );
};

export default AppPage;
