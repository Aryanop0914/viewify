import { Router } from "express";
import {
  AddwatchHistory,
  addViews,
  deleteVideo,
  getAllVideo,
  getAllVideosOfUser,
  getAllVideosOfWatchHistory,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router(); // Apply verifyJWT middleware to all routes in this file

router.route("/uploadVideo").post(
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  verifyJWT,
  publishAVideo
);

router.route("/getvideo/:userId").get(getAllVideosOfUser);

router.route("/getallvideo").get(getAllVideo);

router
  .route("/:videoId")
  .get(verifyJWT, getVideoById)
  .delete(deleteVideo)
  .patch(verifyJWT, upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus, verifyJWT);
router.route("/watchHistory/:videoId").post(AddwatchHistory);
router.route("/getAllwatchHistory").post(getAllVideosOfWatchHistory);
router.route("/addviews/:videoId").post(addViews);

export default router;
