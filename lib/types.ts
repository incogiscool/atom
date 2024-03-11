import { navOptions, plans } from "./contants";

export type UserCredentials = {
  email: string;
  password_hash: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
};

export type Post = {
  createdAt: Date;
  id: string;
  updatedAt: Date;
  title: string;
  author: string;
  body: string;
  image: string | null;
  creator_uid: string;
  keywords: string[];
};

export type Plan = (typeof plans)[number];

export type UserDocumentProjects = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  creator: UserDocumnetProjectsCreator;
};

export type UserDocumnetProjectsCreator = {
  uid: string;
  email: string;
};

export type Project = {
  title: string;
  _id: string;
  posts: Post[];
  project_key: string;
  creator_uid: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserDocument = {
  _id: string;
  first_name: string;
  last_name: string;
  createdAt: Date;
  updatedAt: Date;
  projects: UserDocumentProjects[];
  email: string;
  plan: Plan;
};

export type Session = {
  uid: string;
  expires_at: Date;
};

export type NavOptionIds = (typeof navOptions)[number]["id"];
