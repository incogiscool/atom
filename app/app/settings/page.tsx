import { AppContainer } from "@/components/containers/AppContainer";
import { DeleteUserModal } from "@/components/modals/DeleteUserModal";
import { SettingsForm } from "@/components/pages/settings/SettingsForm";
import { fetchUser } from "@/lib/server/functions/user/fetchUser";

const SettingsPage = async () => {
  const { success, message, response: userDocument } = await fetchUser();

  return (
    <>
      {success ? (
        <AppContainer
          email={userDocument.email}
          first_name={userDocument.first_name}
          active="settings"
          plan={userDocument.plan}
        >
          <h1 className="font-semibold text-4xl">Settings</h1>

          <div className="mt-12 space-y-8">
            <SettingsForm userDocument={userDocument} />
            <DeleteUserModal />
          </div>
        </AppContainer>
      ) : (
        message
      )}
    </>
  );
};

export default SettingsPage;
