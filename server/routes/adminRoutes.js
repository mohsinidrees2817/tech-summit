import express from "express";
import adminauthController from "../controllers/adminauthController.js";
const router = express.Router();
router.post("/signin", adminauthController.signin);
router.get("/signout", adminauthController.signout);

export default router;
