import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Video Id is not Correct");
  }
  const userId = req.user._id;
  const videoLiked = await Like.find({ video: videoId, likedBy: userId });
  if (videoLiked?.length !== 0) {
    const likedVideo = await Like.findByIdAndDelete(videoLiked[0]._id);
    if (!likedVideo) {
      throw new ApiError(400, "Something Went Wrong");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, likedVideo, "Video Toggle Successfull"));
  } else {
    const likedVideo = await Like.create({ video: videoId, likedBy: userId });
    if (!likedVideo) {
      throw new ApiError(400, "Something Went Wrong");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, likedVideo, "Video Toggle Successfull"));
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
});

const getAllUsersWhoLiked = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const { videoId } = req.params;
  const liked = await Like.aggregate([
    {
      $group: {
        _id: "$video",
        likedBy: {
          $push: "$likedBy",
        },
      },
    },
    {
      $unwind: "$likedBy",
    },
    {
      $lookup: {
        from: "users",
        localField: "likedBy",
        foreignField: "_id",
        as: "result",
      },
    },
    { $unwind: "$result" },
    {
      $group: {
        _id: "$_id",
        likedBy: {
          $push: "$result",
        },
      },
    },
    {
      $match: { _id: new mongoose.Types.ObjectId(videoId) },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, liked[0], "Video Toggle Successfull"));
});

export {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getAllUsersWhoLiked,
};
