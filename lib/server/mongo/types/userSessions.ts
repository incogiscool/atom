import { Session } from "@/lib/types";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const sessionSchema = new Schema<Session>({
  uid: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
});
