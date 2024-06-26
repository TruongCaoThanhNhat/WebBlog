import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentsPost,
  voteComment,
  voteComment2,
} from "@/controllers/commentController";
import { verifyToken } from "@/middleware/verifyToken";
import express from "express";

const router = express.Router();
router.get("/all", getAllComments);
router.post("/create", verifyToken, createComment);
router.post("/delete", verifyToken, deleteComment);
router.post("/vote", verifyToken, voteComment);
router.get("/:id", getCommentsPost);
router.post("/vote2", verifyToken, voteComment2);
export default router;
