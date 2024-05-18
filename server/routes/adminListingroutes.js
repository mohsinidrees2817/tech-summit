import express from "express";
import { verifyToken } from "../utils/verifyuser.js";
import propertyController from "../controllers/adminListingcontroller.js";
const router = express.Router();

router.get("/get/:id", propertyController.getAdminListing);
router.post("/create", propertyController.createListing);
router.get("/getlistings", propertyController.getAdminListings);
router.post("/update/:id", propertyController.updateListing);
router.post("/uploadtoweb/:id", propertyController.uploadtoWeb);
router.delete("/delete/:id", propertyController.deleteListing);
router.post("/removefromweb/:id", propertyController.removefromWeb);

export default router;
