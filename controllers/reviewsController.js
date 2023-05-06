import Visit from "../models/visitModel.js";
import Review from "../models/ReviewModel.js";
import asyncHandler from "express-async-handler";

export const createReview = async (req, res) => {
  console.log("creating review");
  const visitId = req.params.visitId;
  const { username, reviewText, rating } = req.body;
  const usern = username.user.name;
  console.log("reqbody", req.body);
  const newReview = new Review({
    visitId,
    username: usern,
    reviewText,
    rating,
  });
  console.log("news", newReview);
  try {
    const savedReview = await newReview.save();
    console.log(visitId);
    await Visit.findByIdAndUpdate(visitId, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({
      success: true,
      message: "Review submitted",
      data: savedReview,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to submit",
    });
  }
};
export const getReviewsById = asyncHandler(async (req, res) => {
  console.log("gerreviewdid");
  //   const Visite = await visit.findById(req.params.id).populate("reviews");
  try {
    console.log(req.params.id);
    const review = await Review.findById(req.params.id);
    console.log(review);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
    throw new Error("review not Found");
  }
});
export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Review Removed" });
  } catch (err) {
    res.status(404).json(err);
  }
};

export const editReview = async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  const { reviewText, rating } = req.body;

  if (reviewText) {
    review.reviewText = reviewText;
  }

  if (rating) {
    review.rating = rating;
  }

  const updatedReview = await review.save();

  res.json({
    _id: updatedReview._id,
    reviewText: updatedReview.reviewText,
    rating: updatedReview.rating,
    message: "Review updated successfully!",
  });
};
