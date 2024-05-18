import express from "express";
import { verifyToken } from "../utils/verifyuser.js";
import propertyController from "../controllers/userlistingController.js.js";
const router = express.Router();

router.get("/get/:id", propertyController.getListing);
// router.post("/create", propertyController.createListing);
router.get("/getlistings", propertyController.getListings);
// router.post("/update/:id", propertyController.updateListing);
// router.delete('/delete/:id', propertyController.deleteListing);
export default router;
