import { ApiResponse } from "@/app/api/auth/signup/route";
import {
  ProjectsRef,
  UserDocumentsRef,
  connectToDatabase,
} from "@/lib/server/mongo/init";
import { Post } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { GetPostSchema } from "@/lib/server/validators/schemas";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const post_id = searchParams.get("post_id");
  const authHeader = request.headers.get("Authorization");

  try {
    if (!authHeader) throw new Error("Invalid project key.");
    if (!post_id) throw new Error("Could not find post.");

    const [authType, project_key] = authHeader.split(" ");

    const data = GetPostSchema.parse({ post_id, project_key });

    if (authType !== "Bearer") throw new Error("Must be bearer token.");

    await connectToDatabase();

    const project = await ProjectsRef.findOne({
      project_key: data.project_key,
    });

    if (!project) throw new Error("Could not find project.");

    let post = project.posts.find((post) => post.id === data.post_id);

    if (!post) throw new Error("Could not find post.");

    const user = await UserDocumentsRef.findOne({ _id: project.creator_uid });
    if (!user) throw new Error("Owner user does not exist.");
    const planType = user.plan;

    const watermark = `\n\nThis post was created using [Atom](https://atomcms.vercel.app/)`;

    if (planType === "single") post.body = post.body + watermark;

    return NextResponse.json<ApiResponse<Post>>({
      response: post,
      success: true,
      message: "Successfuly fetched post.",
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json<ApiResponse>({
      response: null,
      success: false,
      // @ts-expect-error 'err' is of type 'unknown'
      message: err.message || err,
    });
  }
};
