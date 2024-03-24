import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../signup/route";
import { connectToDatabase } from "@/lib/server/mongo/init";
import { validateRequest } from "@/lib/server/lucia/functions/validateRequest";
import { lucia } from "@/lib/server/lucia/init";
import { cookies } from "next/headers";

export const POST = async (request: Request) => {
  try {
    await connectToDatabase();

    const { session } = await validateRequest();
    if (!session) throw new Error("Not authorized.");

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Successfuly signed out user.",
      response: null,
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
