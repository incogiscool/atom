import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../signup/route";
import { validateRequest } from "@/lib/server/lucia/functions/validaterequest";
import { UserDocumentsRef } from "@/lib/server/mongo/init";
import { UserDocument } from "@/lib/types";

export const GET = async (request: NextRequest) => {
  try {
    const { user } = await validateRequest();

    if (!user) throw new Error("Invalid session.");

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
