import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../auth/signup/route";
import {
  ProjectsRef,
  UserDocumentsRef,
  connectToDatabase,
} from "@/lib/server/mongo/init";
import { validateRequest } from "@/lib/server/lucia/functions/validate-request";
import { v4 as uuidv4 } from "uuid";
import { Post } from "@/lib/types";
import { planDetails } from "@/lib/contants";

export type CreatePostRequest = {
  title: string;
  author: string;
  body: string;
  image?: string;
  keywords?: string;
  teaser: string;
};

export const POST = async (request: NextRequest) => {
  const project_id = request.nextUrl.searchParams.get("project_id");

  try {
    const data = (await request.json()) as CreatePostRequest;

    if (!project_id) throw new Error("Invalid project id.");

    await connectToDatabase();
    const { user } = await validateRequest();
    if (!user) throw new Error("Invalid session. Please sign in.");

    const project = await ProjectsRef.findOne({ _id: project_id });

    if (!project) throw new Error("Invalid project id.");

    const isAuth = user.id === project.creator_uid;

    if (!isAuth) throw new Error("Not authorized.");

    const userDoc = await UserDocumentsRef.findOne({ _id: user.id });

    if (!userDoc) throw new Error("Could not find user.");

    const userPlan = planDetails.find((plan) => plan.id === userDoc.plan);

    if (!userPlan) throw new Error("Invalid plan.");

    if (data.body && data.body.length > userPlan.max_body_length)
      throw new Error(
        `Body cannot be more than ${userPlan.max_body_length} characters.`
      );

    const post_id = uuidv4();

    const keywords = data?.keywords?.split(",") || [];

    await project.updateOne({
      $push: {
        posts: {
          id: post_id,
          author: data.author,
          title: data.title,
          body: data.body,
          image: data.image || null,
          keywords,
          teaser: data.teaser,
        },
      },
    });

    const _project = await ProjectsRef.findOne({ _id: project_id });
    if (!_project) throw new Error("Project not found.");
    const post = _project?.posts.find((post) => post.id === post_id);

    if (!post) throw new Error("Post not found.");

    return NextResponse.json<ApiResponse<Post>>({
      success: true,
      message: "Successfuly created post.",
      response: post,
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
