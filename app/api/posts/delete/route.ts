import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../auth/signup/route";
import { ProjectsRef, connectToDatabase } from "@/lib/server/mongo/init";
import { validateRequest } from "@/lib/server/lucia/functions/validate-request";
import { DeletePostSchema } from "@/lib/server/validators/schemas";

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const project_id = searchParams.get("project_id");
  const post_id = searchParams.get("post_id");

  try {
    const data = DeletePostSchema.parse({ project_id, post_id });

    await connectToDatabase();

    const { user } = await validateRequest();
    if (!user) throw new Error("Invalid session. Please sign in.");

    const project = await ProjectsRef.findOne({ _id: data.project_id });
    if (!project) throw new Error("Could not find project.");

    const isAuth = project.creator_uid === user.id;

    if (!isAuth) throw new Error("Not authorized.");

    const post = project.posts.find((post) => post.id === data.post_id);
    if (!post) throw new Error("Could not find post.");

    await ProjectsRef.updateOne(
      { _id: data.project_id },
      {
        $pull: {
          posts: { id: data.post_id },
        },
      }
    );

    return NextResponse.json<ApiResponse>({
      response: null,
      message: "Successfuly deleted post.",
      success: true,
    });
  } catch (err: any) {
    console.log(err);

    return NextResponse.json<ApiResponse>({
      response: null,
      message: err.message || err,
      success: false,
    });
  }
};
