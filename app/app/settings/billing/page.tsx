import { AppContainer } from "@/components/containers/AppContainer";
import { fetchUser } from "@/lib/server/functions/user/fetchUser";

const Page = async () => {
  const { success, message, response: userDocument } = await fetchUser();

  return (
    <>
      {success ? (
        <AppContainer
          email={userDocument.email}
          first_name={userDocument.first_name}
          active="billing"
          plan={userDocument.plan}
        >
          <h1 className="font-semibold text-4xl">Billing</h1>

          <div className="mt-12"></div>
        </AppContainer>
      ) : (
        message
      )}
    </>
  );
};

export default Page;
