import { fetchUser } from "@/lib/server/functions/user/fetchUser";
import { ProjectPage } from "../../components/pages/projects/ProjectPage";
import { cookies } from "next/headers";

const AppPage = async () => {
  const _cookies = cookies();
  const { success, message, response: userDocument } = await fetchUser();

  return (
    <>
      {success ? (
        <>
          <ProjectPage
            userDocument={userDocument}
            authToken={_cookies.get("auth_session")?.value}
          />
        </>
      ) : (
        <p>{message || "Unknown error."}</p>
      )}
    </>
  );
};

export default AppPage;
