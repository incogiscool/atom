import { fetchUser } from "@/lib/server/functions/user/fetchUser";
import { ProjectPage } from "../../components/pages/projects/ProjectPage";
import { cookies } from "next/headers";

const AppPage = async () => {
  // disable cache as using cookies opts out of caching
  const _cookies = cookies();

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
