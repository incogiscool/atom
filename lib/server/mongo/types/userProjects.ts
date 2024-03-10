import { Post, Project } from "@/lib/types";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const postSchema = new Schema<Post>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
    creator_uid: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export const projectsSchema = new Schema<Project>(
  {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    posts: {
      type: [postSchema],
      required: true,
    },
    project_key: {
      type: String,
      required: true,
    },
    creator_uid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
