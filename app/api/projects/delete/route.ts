import { validateRequest } from "@/lib/server/lucia/functions/validate-request";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../auth/signup/route";
import {
  ProjectsRef,
  UserDocumentsRef,
  connectToDatabase,
} from "@/lib/server/mongo/init";
import mongoose from "mongoose";
import { DeleteProjectSchema } from "@/lib/server/validators/schemas";

export type DeleteProjectRequestParams = {
  project_id: string;
};

export const DELETE = async (request: NextRequest) => {
  try {
    await connectToDatabase();

    const { user } = await validateRequest();
    const project_id = request.nextUrl.searchParams.get("project_id");

    const data = DeleteProjectSchema.parse({ project_id });

    if (!user) throw new Error("Invalid session. Please sign in.");

    const project = await ProjectsRef.findOne({ _id: data.project_id });
    if (!project) throw new Error("Invalid project id.");

    const isAuth = project.creator_uid === user.id;

    if (!isAuth) throw new Error("Not authorized.");

    const mongooseSession = await mongoose.startSession();

    await mongooseSession.withTransaction(async () => {
      await ProjectsRef.deleteOne(
        { _id: data.project_id },
        { session: mongooseSession }
      );
      await UserDocumentsRef.updateOne(
        { _id: user.id },
        {
          $pull: {
            projects: { id: data.project_id },
          },
        },
        { session: mongooseSession }
      );
    });

    return NextResponse.json<ApiResponse>({
      response: null,
      success: true,
      message: "Successfuly deleted project.",
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
