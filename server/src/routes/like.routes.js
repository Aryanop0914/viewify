import { Router } from "express";
import {
  getAllUsersWhoLiked,
  toggleCommentLike,
  toggleVideoLike,
  toggleTweetLike,
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router(); // Apply verifyJWT middleware to all routes in this file

router.route("/toggle/v/:videoId").post(verifyJWT, toggleVideoLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/watchHistory/:videoId").post(toggleTweetLike);
router.route("/videos/:videoId").get(getAllUsersWhoLiked);

export default router;
