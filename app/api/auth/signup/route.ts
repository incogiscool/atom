import { maxInputLength, mongoDBURI, plans } from "@/lib/contants";
import { encodePassword } from "@/lib/server/encoding/encodePassword";
import { lucia } from "@/lib/server/lucia/init";
import {
  UserCredentialsRef,
  UserDocumentsRef,
  connectToDatabase,
} from "@/lib/server/mongo/init";
import { UserDocument } from "@/lib/types";
import { validateEmail } from "@/lib/utils/validateEmail";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export type ApiResponse<T = null> = {
  success: boolean;
  message: string | null;
  response: T;
};

export type SignupRequestParams = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

const verifySignupRequestInputs = (
  email: string,
  password: string,
  first_name: string,
  last_name: string
) => {
  if (!validateEmail(email)) throw new Error("Email not valid.");
  if (!password) throw new Error("Please enter a password.");
  if (!first_name || first_name.length > maxInputLength)
    throw new Error("Invalid first name.");
  if (!last_name || last_name.length > maxInputLength)
    throw new Error("Invalid last name.");
  if (password.length < 8)
    throw new Error("Password must be at least 8 characters long.");
};

export const POST = async (request: NextRequest) => {
  try {
    console.log("recieved request for signup");

    const { email, password, first_name, last_name } =
      (await request.json()) as SignupRequestParams;

    verifySignupRequestInputs(email, password, first_name, last_name);

    const hashedAndSaltedPassword = await encodePassword(password);
    const uid = uuidv4();

    if (!mongoDBURI) throw new Error("Mongo DB URI invalid.");

    await connectToDatabase();

    const mongooseSession = await mongoose.startSession();

    let userDocument: UserDocument | null = null;

    await mongooseSession.withTransaction(async () => {
      await UserCredentialsRef.create(
        [
          {
            password_hash: hashedAndSaltedPassword,
            email,
            uid,
            _id: uid,
          },
        ],
        { session: mongooseSession }
      );

      const _userDocument = await UserDocumentsRef.create(
        [
          {
            email,
            plan: "single",
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            _id: uid,
            projects: [],
          },
        ],
        { session: mongooseSession }
      );

      userDocument = _userDocument[0];
    });

    if (!userDocument) throw new Error("Invalid user document.");

    //@ts-expect-error Property 'uid' does not exist on type 'never' --  Not sure why this error occurs
    const luciaSession = await lucia.createSession(userDocument._id, {});
    const luciaSessionCookie = lucia.createSessionCookie(luciaSession.id);
    cookies().set(
      luciaSessionCookie.name,
      luciaSessionCookie.value,
      luciaSessionCookie.attributes
    );

    return NextResponse.json<ApiResponse<UserDocument>>({
      success: true,
      message: "Created account successfuly.",
      response: userDocument,
    });
  } catch (err: any) {
    console.log(err);

    if (err?.code === 11000) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: "Email already in use.",
        response: null,
      });
    }

    return NextResponse.json<ApiResponse>({
      success: false,
      message: err.message || err,
      response: null,
    });
  }
};
