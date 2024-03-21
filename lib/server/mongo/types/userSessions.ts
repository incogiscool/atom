import { Session } from "@/lib/types";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const sessionSchema = new Schema<Session>({
  user_id: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
});
