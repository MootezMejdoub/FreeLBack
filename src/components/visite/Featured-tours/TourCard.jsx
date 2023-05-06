import React, { useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import iconLocalisation from "../assets/icones/map-pin-5-fill.png";
import { Link } from "react-router-dom";
import iconRating from "../assets/icones/star-s-fill.png";
import "../stylesVisite/tour-card.css";
import calculateAvgRating from "../utils/avgRating";
const TourCard = ({ tour }) => {
  const { _id, title, photo, city, price, featured, reviews } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={`/images/${photo}.jpg`} alt="tour-img" />
          {featured && <span>Featured</span>}
        </div>
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <img src={iconLocalisation} />
              {city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <img src={iconRating} />
              {avgRating === 0 ? 0 : avgRating}
              {totalRating === 0 ? (
                "Not rated"
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>
          <h5 className="tour__tile">
            <Link to={`/visit/${_id}`}>{title}</Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price}
              <span>/per person</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/visit/${_id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default TourCard;
