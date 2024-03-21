import { isPasswordValid } from "@/lib/server/encoding/isPasswordValid";
import { validateRequest } from "@/lib/server/lucia/functions/validaterequest";
import {
  ProjectsRef,
  SessionRef,
  UserCredentialsRef,
  UserDocumentsRef,
  connectToDatabase,
} from "@/lib/server/mongo/init";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ApiResponse } from "../signup/route";

export type DeleteUserRequestBody = {
  password: string;
};

export const DELETE = async (request: Request) => {
  try {
    const { password } = (await request.json()) as DeleteUserRequestBody;

    await connectToDatabase();
    const { user } = await validateRequest();

    if (!user) throw new Error("Invalid session. Please sign in.");
    const userCredential = await UserCredentialsRef.findOne({ _id: user.id });

    if (!userCredential) throw new Error("Could not find user.");

    const isAuth = await isPasswordValid(
      userCredential.password_hash,
      password
    );

    if (!isAuth) throw new Error("Invalid password.");

    const mongooseSession = await mongoose.startSession();

    await mongooseSession.withTransaction(async () => {
      await UserCredentialsRef.deleteOne(
        { _id: user.id },
        { session: mongooseSession }
      );
      await ProjectsRef.deleteMany(
        { creator_uid: user.id },
        { session: mongooseSession }
      );
      await UserDocumentsRef.deleteOne(
        { _id: user.id },
        { session: mongooseSession }
      );
      await SessionRef.deleteMany(
        { uid: user.id },
        { session: mongooseSession }
      );
    });

    return NextResponse.json<ApiResponse>({
      response: null,
      success: true,
      message: "Successfuly deleted user.",
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
