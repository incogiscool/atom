import { NextRequest, NextResponse } from "next/server";
import { ProjectsRef, connectToDatabase } from "@/lib/server/mongo/init";
import { ApiResponse } from "@/app/api/auth/signup/route";
import { Project } from "@/lib/types";
import { cookies } from "next/headers";
import { validateRequest } from "@/lib/server/lucia/functions/validateRequest";

export const GET = async (request: NextRequest) => {
  try {
    await connectToDatabase();
    const headers = request.headers;
    const auth = headers.get("Authorization");

    if (auth) {
      const [auth_type, project_key] = auth.split(" ");
      const project = await ProjectsRef.findOne({ project_key });
      if (!project) throw new Error("Invalid project key.");

      return NextResponse.json<ApiResponse<Project>>({
        success: true,
        response: project,
        message: "Successfuly fetched posts.",
      });
    } else {
      const project_id = request.nextUrl.searchParams.get("project_id");
      const { user } = await validateRequest();

      if (!user) throw new Error("Invalid session. Please sign in.");
      if (!project_id) throw new Error("Invalid project id.");

      const project = await ProjectsRef.findOne({ _id: project_id });
      if (!project) throw new Error("Invalid project id.");

      const isAuth = project.creator_uid === user.id;

      if (!isAuth) throw new Error("Not authorized.");

      return NextResponse.json<ApiResponse<Project>>({
        success: true,
        response: project,
        message: "Successfuly fetched posts.",
      });
    }
  } catch (err: any) {
    console.log(err);

    return NextResponse.json<ApiResponse>({
      success: false,
      response: null,
      message: err.message || err,
    });
  }
};
