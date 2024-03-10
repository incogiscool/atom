import { UserDocumentsRef } from "../mongo/init";

// NOTE - Must connect to database before using this function
export const validateProjectKey = async (
  projectKey: string | undefined | null
) => {
  if (!projectKey) throw new Error("Invalid project key.");

  const userDocument = await UserDocumentsRef.findOne({
    project_key: projectKey,
  });

  if (!userDocument) throw new Error("Project key not found.");

  console.log("project key validated");

  return userDocument;
};
