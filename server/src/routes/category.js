import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  uploadImage,
} from "../controllers/categoryController";
// import { isAdmin, isSuperAdmin } from '@/middlewares/authUser'
// import { upload } from '@/middlewares/multers'
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/:slug", getCategory);
router.get("/", getAllCategories);

router.use(verifyToken);
router.post("/create", createCategory);
router.put("/:cateId", updateCategory);
router.delete("/:cateId", deleteCategory);
// router.post('/upload/:cateId', upload.single('file'), uploadImage)
export default router;
