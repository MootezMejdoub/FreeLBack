import React, { useEffect, useRef, useState } from "react";
import "./stylesVisite/visit-details.css";
import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  Modal,
  Button,
} from "reactstrap";
import { useParams } from "react-router-dom";
import visitData from "./tours";
import calculateAvgRating from "./utils/avgRating";
import iconRating from "./assets/icones/star-s-fill.png";
import iconRatingSelected from "./assets/icones/star-s-fill (1).png";
import iconLocalisation from "./assets/icones/map-pin-5-fill.png";
import iconCity from "./assets/icones/map-pin-range-line.png";
import iconPer from "./assets/icones/group-fill.png";
import iconDollar from "./assets/icones/money-dollar-circle-line.png";
import avatar from "./assets/images/avatar.jpg";
import Booking from "./Booking/Booking";
import { BASE_URL } from "./utils/config";
import axios from "axios";
import { useSelector } from "react-redux";
import iconDelete from "./assets/icones/delete-bin-5-fill.png";
import iconEdit from "./assets/icones/edit-2-fill.png";
import "./details.css";

const VisitDetails = () => {
  const userLogin = useSelector((state) => state.user);
  console.log(userLogin);
  const { id } = useParams();
  const [visit, setVisit] = useState({});
  const [visitRating, setVisitRating] = useState(null);
  const reviewMsgRef = useRef("");
  const [reviews, setReviews] = useState([]);
  const username = userLogin;

  useEffect(() => {
    const fetchVisit = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/visits/visit/${id}`
        );
        setVisit(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVisit();
    console.log(visit);
  }, []);
  useEffect(() => {
    visit?.reviews?.map((visitt) => {
      console.log(visitt);
      const fetchReview = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/reviews/review/${visitt}`
          );
          const newReview = response.data;
          setReviews((prev) => [...prev, newReview]);
        } catch (error) {
          console.error(error);
        }
      };
      fetchReview();
    });
    console.log(reviews);
  }, [visit]);

  const { totalRating, avgRating } = calculateAvgRating(visit?.reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const handleEdit = async (review) => {
    const updatedReviewText = prompt(
      "Please enter updated review text:",
      review.reviewText
    );
    const updatedRating = prompt("Please enter updated rating:", review.rating);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/reviews/edit/${review._id}`,
        {
          reviewText: updatedReviewText,
          rating: updatedRating,
        }
      );

      if (response.status === 200) {
        alert("Review updated successfully!");
        window.location.reload();
        // reload the page or update the review list
      } else {
        alert("An error occurred while updating the review.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the review.");
    }
  };

  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/reviews/delete/${reviewId}`
        );

        if (response.status === 200) {
          alert("Review deleted successfully!");
          const {
            title,
            city,
            address,
            distance,
            photo,
            desc,
            price,
            maxGroupSize,
            state,
            featured,
          } = visit;
          console.log("updating visist", visit._id);
          console.log("visit.reviews before delete", visit.reviews);
          console.log("reviewid selected ", reviewId);
          const rreviews = visit.reviews.filter(
            (review) => review !== reviewId
          );
          console.log("rreviews f delete", rreviews);
          const reviewIds = rreviews.map((review) => review);
          console.log("review ids", reviewIds);
          console.log("visit", visit);
          const response = await axios.put(
            `http://localhost:5000/api/visits/edit/${visit._id}`,
            {
              title,
              city,
              address,
              distance,
              photo,
              desc,
              price,
              maxGroupSize,
              reviewIds,
              state,
              featured,
            }
          );
          setReviews((prevReviews) =>
            prevReviews.filter(
              (review) => review?._id !== reviewId && review?._id !== undefined
            )
          );

          window.location.reload();
          // reload the page or update the review list
        } else {
          alert("An error occurred while deleting the review.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while deleting the review.");
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    const rating = visitRating;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/reviews/${id}`,
        {
          reviewText,
          rating,
          username,
        }
      );

      // check the response status code
      if (response.status === 200) {
        alert("Review added successfully!");
        // update the UI with the new review data
        window.location.reload();
      } else {
        alert("An error occurred while adding the review.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the review.");
      // handle the error
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [visit]);

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="visit__content">
                <img
                  className="imgFarm"
                  src={`/images/${visit.photo}.jpg`}
                  alt="tour-img"
                />
                <div className="visit__info">
                  <h2>{visit.title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <img src={iconRating} />
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not rated"
                      ) : (
                        <span>({visit.reviews?.length})</span>
                      )}
                    </span>
                    <span>
                      <img src={iconLocalisation} style={{ color: "green" }} />
                      {visit.address}
                    </span>
                  </div>
                  <div className="visit__extra-details">
                    <span>
                      <img src={iconCity} style={{ color: "green" }} />
                      {visit.city}
                    </span>
                    <span>
                      <img src={iconDollar} style={{ color: "green" }} />$
                      {visit.price}/Per person
                    </span>
                    <span>
                      <img src={iconPer} style={{ color: "green" }} />
                      {visit.maxGroupSize} people
                    </span>
                  </div>
                  <h5>Desciption</h5>
                  <p>{visit.desc}</p>
                </div>
                <div className="visit__reviews mt-4">
                  <h4>Reviews({visit.reviews?.length} reviews)</h4>
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span
                        onClick={() => setVisitRating(1)}
                        className={visitRating >= 1 ? "selected" : ""}
                      >
                        {visitRating >= 1 ? (
                          <img src={iconRatingSelected} alt="" />
                        ) : (
                          <img src={iconRating} alt="" />
                        )}
                      </span>
                      <span
                        onClick={() => setVisitRating(2)}
                        className={visitRating >= 2 ? "selected" : ""}
                      >
                        {visitRating >= 2 ? (
                          <img src={iconRatingSelected} alt="" />
                        ) : (
                          <img src={iconRating} alt="" />
                        )}
                      </span>
                      <span
                        onClick={() => setVisitRating(3)}
                        className={visitRating >= 3 ? "selected" : ""}
                      >
                        {visitRating >= 3 ? (
                          <img src={iconRatingSelected} alt="" />
                        ) : (
                          <img src={iconRating} alt="" />
                        )}
                      </span>
                      <span
                        onClick={() => setVisitRating(4)}
                        className={visitRating >= 4 ? "selected" : ""}
                      >
                        {visitRating >= 4 ? (
                          <img src={iconRatingSelected} alt="" />
                        ) : (
                          <img src={iconRating} alt="" />
                        )}
                      </span>
                      <span
                        onClick={() => setVisitRating(5)}
                        className={visitRating >= 5 ? "selected" : ""}
                      >
                        {visitRating >= 5 ? (
                          <img src={iconRatingSelected} alt="" />
                        ) : (
                          <img src={iconRating} alt="" />
                        )}
                      </span>
                    </div>

                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="Share your thoughts"
                        required
                      />
                      <button
                        className="btn btn-success text-white "
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                  <ListGroup className="user__reviews">
                    {reviews?.map((review) => (
                      <div className="review__item mb-5">
                        <img className="imgAvatar" src={avatar} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review?.username}</h5>
                              <p>
                                {new Date(review?.createdAt).toLocaleDateString(
                                  "en-US",
                                  options
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review?.rating}
                              <img src={iconRating} />
                            </span>
                          </div>
                          <h6>{review?.reviewText}</h6>
                          {review?.username === userLogin.user?.name ? (
                            <div className="flex ">
                              <a
                                href="#"
                                onClick={() => handleEdit(review)}
                                style={{ marginRight: "20px" }}
                              >
                                <img src={iconEdit} alt="edit" />
                              </a>
                              <a
                                href="#"
                                onClick={() => handleDelete(review._id)}
                              >
                                <img src={iconDelete} alt="delete" />
                              </a>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <Booking visit={visit} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default VisitDetails;
