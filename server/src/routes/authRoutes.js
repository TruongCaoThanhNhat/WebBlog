import express from "express";
import { getCurrentUser, login, register } from "../controllers/authController";
import { checkCurrentUser } from "../middleware/authUser";

// import * as authController from '@/controllers/authController'

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", checkCurrentUser, getCurrentUser);

export default router;