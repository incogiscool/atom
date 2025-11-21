import { CreatePostSchema } from "@/lib/server/validators/schemas";

export const methods = [
  {
    method: "POST",
    name: "createPost",
    description: "Create a new post in a project",
    params: CreatePostSchema,
    paramsType: "body",
  },
];
