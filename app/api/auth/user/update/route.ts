import { validateRequest } from "@/lib/server/lucia/functions/validateRequest";
import { UserDocumentsRef, connectToDatabase } from "@/lib/server/mongo/init";
import { NextResponse } from "next/server";
import { ApiResponse } from "../../signup/route";

export type UpdateUserRequestParams = {
  first_name?: string;
  last_name?: string;
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();

    await connectToDatabase();

    const { user } = await validateRequest();

    if (!user) throw new Error("Invalid session. Please sign in.");

    const { first_name, last_name } = body; // Destructure only the allowed properties

    const filteredBody: UpdateUserRequestParams = {}; // Create an empty object to hold filtered properties

    if (first_name) {
      filteredBody.first_name = first_name;
    }

    if (last_name) {
      filteredBody.last_name = last_name;
    }

    await UserDocumentsRef.updateOne({ _id: user.id }, filteredBody);

    return NextResponse.json<ApiResponse>({
      success: true,
      response: null,
      message: "Successfuly updated user.",
    });
  } catch (err: any) {
    console.log(err);

    return NextResponse.json<ApiResponse>({
      response: null,
      success: false,
      message: err.message || err,
    });
  }
};
