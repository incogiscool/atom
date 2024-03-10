import { Project, Session, UserCredentials, UserDocument } from "@/lib/types";
import mongoose from "mongoose";
import { userCredentialsSchema } from "./types/userCredentials";
import { userDocumentsSchema } from "./types/userDocuments";
import { sessionSchema } from "./types/userSessions";
import { projectsSchema } from "./types/userProjects";
import { mongoDBURI } from "@/lib/contants";

export const connectToDatabase = async () => {
  if (!mongoDBURI) throw new Error("No Mongo DB URI in .env file.");

  await mongoose.connect(mongoDBURI);

  console.log("connected to database");
};

export const UserCredentialsRef =
  (mongoose.models.credentials as mongoose.Model<UserCredentials>) ||
  mongoose.model<UserCredentials>("credentials", userCredentialsSchema);

export const UserDocumentsRef =
  (mongoose.models.documents as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>("documents", userDocumentsSchema);

export const ProjectsRef =
  (mongoose.models.projects as mongoose.Model<Project>) ||
  mongoose.model<Project>("projects", projectsSchema);

export const SessionRef =
  (mongoose.models.session as mongoose.Model<Session>) ||
  mongoose.model<Session>("session", sessionSchema);
