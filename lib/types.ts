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
  keywords?: string[];
  teaser: string;
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
  user_id: string;
  expires_at: Date;
};

export type NavOptionIds = (typeof navOptions)[number]["id"];

export type PlanDetailsPlan = {
  title: string;
  id: Plan;
  price: number | null;
  description: string;
  max_docs: number;
  max_body_length: number;
  features: string[];
  max_projects: number;
  active: boolean;
  disabled: boolean;
};
