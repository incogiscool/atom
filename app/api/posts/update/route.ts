import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../auth/signup/route";
import { connectToDatabase } from "@/lib/server/mongo/init";
import { validateRequest } from "@/lib/server/lucia/functions/validateRequest";

export type UpdatePostRequestParams = {
  title?: string;
  author?: string;
  body?: string;
  teaser?: string;
  keywords?: string;
  image?: string;
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
