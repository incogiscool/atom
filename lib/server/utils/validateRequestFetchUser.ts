import { validateRequest } from "../lucia/functions/validateRequest";
import { UserDocumentsRef } from "../mongo/init";

export const validateRequestFetchUser = async () => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Invalid session.");

  console.log(user);
  const userDoc = await UserDocumentsRef.findOne({ _id: user.id });

  if (!userDoc) throw new Error("Error fetching user document.");

  return userDoc;
};
