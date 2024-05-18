import express from "express";
import userController from "../controllers/usersController.js";

const router = express.Router();

router.get("/user", userController.getAllUsers);
router.post("/user", userController.getUserById);
// router.delete("/delete/:id", )
export default router;
