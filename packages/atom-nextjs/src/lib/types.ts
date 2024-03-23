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

export type ClientPost = {
  image?: string | null;
  id: string;
  teaser: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
};

export type ClientProject = {
  title: string;
  posts: ClientPost[];
  id: string;
};
export type ApiResponse<T = null> = {
  response: T;
  success: boolean;
  message: string;
};
