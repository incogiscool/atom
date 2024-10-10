import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../signup/route";
import { validateRequest } from "@/lib/server/lucia/functions/validate-request";
import { UserDocumentsRef, connectToDatabase } from "@/lib/server/mongo/init";
import { UserDocument } from "@/lib/types";

export const maxDuration = 30; // 5 seconds
export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  const { user } = await validateRequest();

  console.log("session validated, connecting to database");

  try {
    await connectToDatabase();

    if (!user) throw new Error("Invalid session. Please sign in.");

    console.log("finding user in database");

    const data = await UserDocumentsRef.findOne({ _id: user.id });

    if (!data) throw new Error("Error fetching user data.");

    return NextResponse.json<ApiResponse<UserDocument>>({
      response: data,
      success: true,
      message: "Successfuly fetched user document.",
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
