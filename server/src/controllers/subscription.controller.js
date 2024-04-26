import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  if (!isValidObjectId(channelId)) {
    throw new ApiError(401, "channel Id is incorrect");
  }
  const userid = req.user._id;
  const findChannel = await Subscription.findOne({
    subscriber: userid,
    channel: channelId,
  });
  if (!findChannel) {
    const subscribed = await Subscription.create({
      subscriber: userid,
      channel: channelId,
    });
    if (!subscribed) {
      throw new ApiError(400, "Something Went Wrong While Subscribing");
    }
    return res.status(200).json(new ApiResponse(200, "Subscribed"));
  } else {
    const unsubscribe = await Subscription.findOneAndDelete({
      subscriber: userid,
      channel: channelId,
    });
    if (!unsubscribe) {
      throw new ApiError(400, "Something Went Wrong While UnSubscribing");
    }
    return res.status(200).json(new ApiResponse(200, "Unsubscribed"));
  }
  // TODO: toggle subscription
});

// controller to return boolean value that if user has subscribed
const getUserIsSubscribed = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  if (!isValidObjectId(channelId)) {
    throw new ApiError(401, "channel Id is incorrect");
  }
  const userid = req.user._id;
  const findChannel = await Subscription.findOne({
    subscriber: userid,
    channel: channelId,
  });
  if (!findChannel) {
    return res.status(200).json(new ApiResponse(200, "false"));
  } else {
    return res.status(200).json(new ApiResponse(200, "true"));
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const subscribers = await Subscription.aggregate([
    [
      {
        $group: {
          _id: "$channel",
          subscriber: { $push: "$subscriber" },
        },
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(channelId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "subscriber",
          foreignField: "_id",
          as: "subscriber",
        },
      },
    ],
  ]);
  if (!subscribers) {
    throw new ApiError(500, "Subscribers Not Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, subscribers[0], "Fetched Successfully"));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(500, "User Id is invalid");
  }

  const subscribedChannel = await Subscription.aggregate([
    {
      $group: {
        _id: "$subscriber",
        channels: { $push: "$channel" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channels",
        foreignField: "_id",
        as: "channelDetails",
      },
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $project: {
        channelDetails: 1,
      },
    },
  ]);
  if (!subscribedChannel) {
    throw new ApiError(500, "Channels Not Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, subscribedChannel, "Fetched Successfully"));
});

export {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
  getUserIsSubscribed,
};
