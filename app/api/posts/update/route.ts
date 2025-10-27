import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../auth/signup/route";
import {
  ProjectsRef,
  UserDocumentsRef,
  connectToDatabase,
} from "@/lib/server/mongo/init";
import { validateRequest } from "@/lib/server/lucia/functions/validate-request";
import {
  maxInputLength,
  planDetails,
  projectTitleMaxLength,
} from "@/lib/contants";
import { UpdatePostSchema } from "@/lib/server/validators/schemas";

export type UpdatePostRequestParams = {
  title?: string;
  author?: string;
  body?: string;
  teaser?: string;
  keywords?: string;
  image?: string;
};

// Function to filter out empty strings or null values
const formatBody = (obj: any, parentField: string) => {
  const newObj: any = {};
  for (const key in obj) {
    if (obj[key] && obj[key] !== "") {
      newObj[`${parentField}.$.${key}`] = obj[key];
    }
  }
  return newObj;
};

export const PATCH = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const project_id = searchParams.get("project_id");
    const post_id = searchParams.get("post_id");
    const rawData = await request.json();

    const data = UpdatePostSchema.parse({
      ...rawData,
      project_id,
      post_id,
    });

    await connectToDatabase();

    const { user } = await validateRequest();
    if (!user) throw new Error("Invalid session. Please sign in.");

    const project = await ProjectsRef.findOne({ _id: data.project_id });
    if (!project) throw new Error("Could not find project.");

    const isAuth = project.creator_uid === user.id;

    if (!isAuth) throw new Error("Not authorized.");

    const post = project.posts.find((p: any) => p.id === data.post_id);

    if (!post) throw new Error("Could not find post.");

    const userDoc = await UserDocumentsRef.findOne({ _id: user.id });

    if (!userDoc) throw new Error("Could not find user.");

    const userPlan = planDetails.find((plan) => plan.id === userDoc.plan);

    if (!userPlan) throw new Error("Invalid plan.");

    if (data.body && data.body.length > userPlan.max_body_length)
      throw new Error(
        `Body cannot be more than ${userPlan.max_body_length} characters.`
      );

    const filteredBody: UpdatePostRequestParams = {};

    if (data.title) {
      filteredBody.title = data.title;
    }
    if (data.author) {
      filteredBody.author = data.author;
    }
    if (data.body) {
      filteredBody.body = data.body;
    }
    if (data.teaser) {
      filteredBody.teaser = data.teaser;
    }
    if (data.keywords) {
      filteredBody.keywords = data.keywords;
    }
    if (data.image) {
      filteredBody.image = data.image;
    }

    const formattedBody = formatBody(filteredBody, "posts");

    await ProjectsRef.updateOne(
      { _id: data.project_id, "posts.id": data.post_id },
      {
        $set: formattedBody,
      }
    );

    return NextResponse.json<ApiResponse>({
      response: null,
      message: "Successfuly updated post",
      success: true,
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
