import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../auth/signup/route";
import { ProjectsRef, connectToDatabase } from "@/lib/server/mongo/init";
import { validateRequest } from "@/lib/server/lucia/functions/validateRequest";

export type UpdatePostRequestParams = {
  title?: string;
  author?: string;
  body?: string;
  teaser?: string;
  keywords?: string;
  image?: string;
};

// Function to filter out empty strings or null values
const filterEmptyValues = (obj: any) => {
  const newObj: any = {};
  for (const key in obj) {
    if (obj[key] && obj[key] !== "") {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export const PUT = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const project_id = searchParams.get("project_id");
    const post_id = searchParams.get("post_id");
    const body = (await request.json()) as UpdatePostRequestParams;

    await connectToDatabase();

    const { user } = await validateRequest();
    if (!user) throw new Error("Invalid session. Please sign in.");

    const project = await ProjectsRef.findOne({ _id: project_id });
    if (!project) throw new Error("Could not find project.");

    const isAuth = project.creator_uid === user.id;

    if (!isAuth) throw new Error("Not authorized.");

    const post = project.posts.find((post) => post.id === post_id);

    if (!post) throw new Error("Could not find post.");

    const filteredBody = filterEmptyValues(body);

    // Do logic
  } catch (err: any) {
    console.log(err);

    return NextResponse.json<ApiResponse>({
      response: null,
      message: err.message || err,
      success: false,
    });
  }
};
