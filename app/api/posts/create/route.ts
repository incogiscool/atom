import { NextResponse } from "next/server";
import { ApiResponse } from "../../auth/signup/route";
import { ProjectsRef, connectToDatabase } from "@/lib/server/mongo/init";
import { validateRequest } from "@/lib/server/lucia/functions/validateRequest";
import { v4 as uuidv4 } from "uuid";
import { Post } from "@/lib/types";

export type CreatePostRequest = {
  title: string;
  author: string;
  body: string;
  image?: string;
  keywords?: string[];
  project_id: string;
};

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    await connectToDatabase();
    const { user } = await validateRequest();
    if (!user) throw new Error("Invalid session. Please sign in.");

    const project = await ProjectsRef.findOne({ _id: data.project_id });

    if (!project) throw new Error("Invalid project id.");

    const isAuth = user.id === project.creator_uid;

    if (!isAuth) throw new Error("Not authorized.");

    const post_id = uuidv4();

    await ProjectsRef.updateOne({
      $push: {
        posts: {
          id: post_id,
          author: data.author,
          title: data.title,
          body: data.body,
          image: data.image || null,
          keywords: data.keywords || [],
        },
      },
    });

    return NextResponse.json<ApiResponse<null>>({
      success: true,
      message: "Successfuly created post.",
      response: null,
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
