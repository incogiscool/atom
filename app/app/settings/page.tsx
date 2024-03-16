import { AppContainer } from "@/components/containers/AppContainer";
import { fetchUser } from "@/lib/server/functions/user/fetchUser";

const SettingsPage = async () => {
  const { success, message, response: userDocument } = await fetchUser();

  return (
    <AppContainer
      email={userDocument.email}
      first_name={userDocument.first_name}
      active="settings"
    >
      <h1 className="font-semibold text-4xl">Settings</h1>

      <div className="mt-12"></div>
    </AppContainer>
  );
};

export default SettingsPage;
