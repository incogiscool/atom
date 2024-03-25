import { validateRequest } from "../lucia/functions/validate-request";
import { UserDocumentsRef } from "../mongo/init";

// CONNECT TO MONGODB BEFORE USING FUNCTION
export const validateRequestFetchUser = async () => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Invalid session.");

  const userDoc = await UserDocumentsRef.findOne({ _id: user.id });

  if (!userDoc) throw new Error("Error fetching user document.");

  return userDoc;
};
