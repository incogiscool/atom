import { UserDocument } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../signup/route";
import {
  UserCredentialsRef,
  UserDocumentsRef,
  connectToDatabase,
} from "@/lib/server/mongo/init";
import { isPasswordValid } from "@/lib/server/encoding/isPasswordValid";
import { lucia } from "@/lib/server/lucia/init";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";

export type SigninRequestParams = {
  email: string;
  password: string;
};

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = (await request.json()) as SigninRequestParams;

    await connectToDatabase();

    const emailCredentialDoc = await UserCredentialsRef.findOne({ email });

    if (!emailCredentialDoc) throw new Error("Account does not exist.");

    const isPasswordSame = isPasswordValid(
      emailCredentialDoc.password_hash,
      password
    );

    if (!isPasswordSame) throw new Error("Password is incorrect.");

    const userDocument = await UserDocumentsRef.findOne({
      _id: emailCredentialDoc._id,
    });

    if (!userDocument)
      throw new Error("User document does not exist. Please contact support.");

    const session = await lucia.createSession(userDocument._id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return NextResponse.json<ApiResponse<UserDocument>>({
      success: true,
      response: userDocument,
      message: "Signed in successfuly.",
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
