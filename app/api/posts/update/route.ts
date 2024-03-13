import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../auth/signup/route";

export type UpdatePostRequestParams = {};

export const PUT = async (request: NextRequest) => {
  try {
    const post_id = request.nextUrl.searchParams.get("post_id");
    const body = (await request.json()) as UpdatePostRequestParams;

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
