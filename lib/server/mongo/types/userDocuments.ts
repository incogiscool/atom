import { plans } from "@/lib/contants";
import {
  Post,
  UserDocument,
  UserDocumentProjects,
  UserDocumnetProjectsCreator,
} from "@/lib/types";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const userDocumentProjectsCreatorSchema =
  new Schema<UserDocumnetProjectsCreator>(
    {
      uid: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    { _id: false }
  );

export const userDocumentProjectsSchema = new Schema<UserDocumentProjects>(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
    creator: {
      type: userDocumentProjectsCreatorSchema,
      required: true,
    },
  },
  { _id: false }
);

export const userDocumentsSchema = new Schema<UserDocument>(
  {
    _id: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    projects: {
      type: [userDocumentProjectsSchema],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: plans,
      required: true,
    },
  },
  { timestamps: true, _id: false }
);
