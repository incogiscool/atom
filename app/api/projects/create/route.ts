import { NextResponse } from "next/server";
import { ApiResponse } from "../../auth/signup/route";
import {
  ProjectsRef,
  UserDocumentsRef,
  connectToDatabase,
} from "@/lib/server/mongo/init";
import { generateProjectKey } from "@/lib/server/utils/generateProjectKey";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import { projectTitleMaxLength } from "@/lib/contants";
import { Project } from "@/lib/types";
import { validateRequest } from "@/lib/server/lucia/functions/validateRequest";

export type CreateProjectRequest = {
  title: string;
};

export const POST = async (request: Request) => {
  try {
    const { title } = (await request.json()) as CreateProjectRequest;

    if (!title || title.length > projectTitleMaxLength || title === "")
      throw new Error("Invalid title.");

    await connectToDatabase();

    const { user } = await validateRequest();

    if (!user) throw new Error("Invalid session. Please sign in.");

    const project_key = generateProjectKey();
    const project_id = uuidv4();

    const mongooseSession = await mongoose.startSession();

    let project: Project | null = null;

    await mongooseSession.withTransaction(async () => {
      const _project = await ProjectsRef.create(
        [
          {
            _id: project_id,
            title,
            posts: [],
            project_key,
            creator_uid: user.id,
          },
        ],
        { session: mongooseSession }
      );

      project = _project[0];

      await UserDocumentsRef.updateOne(
        { _id: user.id },
        {
          $push: {
            projects: {
              title,
              id: project_id,
              createdAt: project.createdAt,
              updatedAt: project.updatedAt,
              creator: {
                uid: user.id,
                email: user.email,
              },
            },
          },
        },
        { session: mongooseSession }
      );
    });

    if (!project) throw new Error("Invalid project.");

    return NextResponse.json<ApiResponse<Project>>({
      response: project,
      message: "Successfuly created project.",
      success: true,
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
