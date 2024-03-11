import { navOptions, plans } from "./contants";

export type UserCredentials = {
  email: string;
  password_hash: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

export type Post = {
  createdAt: string;
  id: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
  creator: {
    uid: string;
    first_name: string;
  };
};

export type Project = {
  title: string;
  _id: string;
  posts: Post[];
  project_key: string;
  creator_uid: string;
  createdAt: string;
  updatedAt: string;
};

export type UserDocument = {
  _id: string;
  first_name: string;
  last_name: string;
  createdAt: string;
  updatedAt: string;
  projects: UserDocumentProjects[];
  email: string;
  plan: Plan;
};

export type Session = {
  uid: string;
  expires_at: Date;
};

export type NavOptionIds = (typeof navOptions)[number]["id"];
