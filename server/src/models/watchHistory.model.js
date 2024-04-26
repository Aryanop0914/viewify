import { Schema, model } from "mongoose";

const watchHistorySchema = new Schema(
  {
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    owner: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  },
  { timestamps: true }
);

export const WatchHistory = model("WatchHistory", watchHistorySchema);
