import express from "express";
import {
  createReview,
  deleteReview,
  editReview,
  getReviewsById,
} from "../controllers/reviewsController.js";

const router = express.Router();

router.post("/:visitId", createReview);
router.delete("/delete/:id", deleteReview);
router.put("/edit/:id", editReview);
router.get("/review/:id", getReviewsById);
export default router;
