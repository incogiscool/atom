import { validateRequestFetchUser } from "@/lib/server/utils/validateRequestFetchUser";
import { NextResponse } from "next/server";
import { ApiResponse } from "../../auth/signup/route";
import { connectToDatabase } from "@/lib/server/mongo/init";

export const POST = async (request: Request) => {
  try {
    await connectToDatabase();

    const user = await validateRequestFetchUser();

    return NextResponse.json({
      user,
    });
  } catch (err: any) {
    console.log(err);

    return NextResponse.json<ApiResponse>({
      response: null,
      message: err.message || err.message,
      success: false,
    });
  }
};
