import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";
import {
  createUser,
  getAllUser,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/userController";

export const router = express.Router();

// CRUD

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUser);

router.route("/auth").post(loginUser);
router.route("/logout").post(logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

// ADMIN ROUTES 👇
router
  .route("/:id")
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById)
  .delete(authenticate, authorizeAdmin, deleteUserById);
