import React, { useState } from "react";
import "../stylesVisite/booking.css";
import iconRating from "../assets/icones/star-s-fill.png";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import close from "../assets/icones/close-line.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";

const Booking = ({ visit, avgRating }) => {
  const { price, reviews } = visit;

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userId: "",
    userEmail: "",
    fullName: "",
    phone: "",
    guestSize: "",
    bookAt: "",
    paymentOption: "",
  });
  const validateEmail = (userEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(userEmail);
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleCancel = () => {
    navigate("/visit");
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(credentials.guestSize) + Number(serviceFee);

  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState("");

  const handleRadioChange = (event) => {
    setCredentials({
      ...credentials,
      paymentOption: event.target.value, // Mettre à jour la valeur de la sélection de paiement
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // validation des champs
    if (
      credentials.fullName === "" ||
      credentials.userEmail === "" ||
      credentials.phone === "" ||
      credentials.guestSize === "" ||
      credentials.bookAt === ""
    ) {
      setAlertSeverity("error");
      setAlertMessage("Please fill in all fields");
    } else if (!validateEmail(credentials.userEmail)) {
      setAlertSeverity("error");
      setAlertMessage("Please enter a valid email address");
    } else if (credentials.phone.length !== 8) {
      setAlertSeverity("error");
      setAlertMessage("Please enter a valid phone number (8 digits)");
    } else if (new Date(credentials.bookAt) < new Date()) {
      setAlertSeverity("error");
      setAlertMessage("Please enter a date that is later than today");
    } else if (credentials.guestSize > visit.maxGroupSize) {
      setAlertSeverity("error");
      setAlertMessage(
        `The maximum group size for this visit is ${visit.maxGroupSize}`
      );
    } else if (!credentials.paymentOption) {
      setAlertSeverity("error");
      setAlertMessage("Please select a payment option");
    } else {
      console.log(credentials);
      axios
        .post("http://localhost:5000/api/booking/", credentials)
        .then((response) => {
          console.log(response.data);
          setAlertSeverity("success");
          setAlertMessage("Your booking has been successfully made!");
          setTimeout(() => {
            setAlertMessage("");
          }, 30000);
        })
        .catch((error) => {
          console.log(error);
          setAlertSeverity("error");
          setAlertMessage(
            "An error occurred during the booking, please try again."
          );
        });
    }
  };

  return (
    <div className="booking">
      {alertMessage && (
        <Alert severity={alertSeverity}>
          <AlertTitle>
            {alertSeverity === "success" ? "Succès" : "Erreur"}
          </AlertTitle>
          {alertMessage}
        </Alert>
      )}

      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="visit__rating d-flex align-items-center">
          <img src={iconRating}></img>
          {avgRating === 0 ? null : avgRating}({reviews?.length})
        </span>
      </div>
      <div className="booking__form">
        <h5>Informations</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="email"
              placeholder="Email"
              id="userEmail"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              required
              id="phone"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="date"
              placeholder=""
              required
              id="bookAt"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Guest"
              required
              id="guestSize"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <input
                  type="radio"
                  id="onlinePayment"
                  name="paymentOption"
                  value="onlinePayment"
                  checked={credentials.paymentOption === "onlinePayment"}
                  onChange={handleRadioChange}
                />
                <label
                  htmlFor="onlinePayment"
                  style={{ display: "inline-block", marginRight: "10px" }}
                >
                  Online Payment
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="payOnArrival"
                  name="paymentOption"
                  value="payOnArrival"
                  checked={credentials.paymentOption === "payOnArrival"}
                  onChange={handleRadioChange}
                />
                <label
                  htmlFor="payOnArrival"
                  style={{ display: "inline-block" }}
                >
                  Pay on Arrival
                </label>
              </div>
            </div>
          </FormGroup>
        </Form>
      </div>
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price}
              <img src={close}></img>1 person
            </h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button
          className="btn btn-light  w-100 mt-4"
          style={{ color: "black" }}
          onClick={handleClick}
        >
          Book Now
        </Button>
        <button
          type="button"
          class="btn btn-danger w-100 mt-4"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default Booking;
