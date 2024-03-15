import { ApiResponse } from "@/app/api/auth/signup/route";
import { ProjectsRef, connectToDatabase } from "@/lib/server/mongo/init";
import { Post, Project } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

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

export const GET = async (request: Request) => {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) throw new Error("Invalid project key.");

    const [authType, project_key] = authHeader.split(" ");

    if (authType !== "Bearer") throw new Error("Must be bearer token.");
    if (!project_key) throw new Error("Invalid project key.");

    await connectToDatabase();

    const project = await ProjectsRef.findOne({ project_key });

    if (!project) throw new Error("Could not find project.");

    const clientPosts = project.posts.map((post) => ({
      image: post.image,
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author,
      teaser: post.teaser,
    }));

    const clientProject: ClientProject = {
      title: project.title,
      id: project._id,
      posts: clientPosts,
    };

    return NextResponse.json<ApiResponse<ClientProject>>({
      response: clientProject,
      success: true,
      message: "Successfuly fetched posts.",
    });
  } catch (err: any) {
    console.log(err);

    return NextResponse.json<ApiResponse>({
      message: err.message || err,
      success: false,
      response: null,
    });
  }
};
