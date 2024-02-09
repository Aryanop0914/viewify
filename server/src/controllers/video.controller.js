import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  // const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  const { userId } = req.params;
  const videos = await Video.find({ owner: userId });
  res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched Successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video
  const videoLocalPath = req.files?.video[0]?.path;
  let thumbnailLocalPath;
  if (Array.isArray(req.files.thumbnail) && req.files.thumbnail.length > 0) {
    thumbnailLocalPath = req.files.thumbnail[0].path;
  }
  if (!videoLocalPath) {
    throw new ApiError(400, "video file is required");
  }
  const video = await uploadOnCloudinary(videoLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!video) {
    throw new ApiError(400, "video file is required");
  }
  const uploadObject = await Video.create({
    title,
    description,
    views: 0,
    isPublished: true,
    duration: video.duration,
    owner: req.user?.id,
    "video.url": video.url,
    "video.publicId": video.public_id,
    "thumbnail.url": thumbnail?.url || "",
    "thumbnail.publicId": thumbnail?.public_id || "",
  });
  if (!uploadObject) {
    throw new ApiError(500, "Something went wrong while Uploading images");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Video Uploaded Successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Video Id is not Correct");
  }
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(400, "Something Went Wrong While Fetching video");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video Fetched Succesfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
