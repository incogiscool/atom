import { UserCredentials } from "@/lib/types";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const userCredentialsSchema = new Schema<UserCredentials>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: false }
);
