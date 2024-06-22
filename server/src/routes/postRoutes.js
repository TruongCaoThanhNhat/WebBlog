import express from 'express'
import {
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsCategoryUser,
  getPost,
  getPostsByCategory,
  getPostsByUserName,
  getTop10PostOfMonth,
  updatePost,
  updateView,
  uploadImage,
  votePost,
} from '../controllers/postController.js'
import { verifyToken } from '../middleware/verifyToken.js';
import { upload } from '@/middleware/multers.js';


const router = express.Router()
router.get("/top-month", getTop10PostOfMonth);
// view post
router.put("/:postId/update-view", updateView);
router.post("/:postId/vote", verifyToken, votePost);

router.put("/:postId", verifyToken, updatePost);
router.delete("/:postId", verifyToken, deletePost);
router.get("/", getAllPosts);
router.get("/:slug", getPost);
router.get("/user/:username", getPostsByUserName);
router.get("/cate/:cateId", getPostsByCategory);
router.post("/create", verifyToken, createPost);
router.post("/upload", upload.single("file"), uploadImage);
router.get("/category/post", verifyToken, getAllPostsCategoryUser);

export default router
