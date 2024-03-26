import { validateRequest } from "@/lib/server/lucia/functions/validate-request";
import { UserDocumentsRef, connectToDatabase } from "@/lib/server/mongo/init";
import { NextResponse } from "next/server";
import { ApiResponse } from "../../signup/route";
import { maxInputLength } from "@/lib/contants";

export type UpdateUserRequestParams = {
  first_name?: string;
  last_name?: string;
};

export const PATCH = async (request: Request) => {
  const { user } = await validateRequest();

  try {
    const body = await request.json();

    await connectToDatabase();

    if (!user) throw new Error("Invalid session. Please sign in.");

    const { first_name, last_name } = body; // Destructure only the allowed properties

    if (first_name && first_name.length > maxInputLength)
      throw new Error(
        `First name cannot be longer than ${maxInputLength} characters.`
      );

    if (first_name && first_name.length > maxInputLength)
      throw new Error(
        `Last name cannot be longer than ${maxInputLength} characters.`
      );

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
