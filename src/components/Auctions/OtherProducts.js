import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Card } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import './AuctionList.css'
import { Link } from "react-router-dom";

import {
  Box,
  ButtonBase,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MyProducts from "./Myproducts";

const { Meta } = Card;
const socket = io("ws://localhost:5000");

function OtherProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [biddingAmount, setBiddingAmount] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isTimeLeft, setIsTimeLeft] = useState(false);
  const [timeleft, setTimeleft] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [topBids, setTopBids] = useState([]);
  const [userInfo, setUserInfo] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const handleClick = () => {
    setShowDetails(true);
  };

  const countdown = (productId, endDate) => {
    const date1 = new Date(endDate);
    const date2 = Date.now();
  
    const diffInMs = date1 - date2;
  
    console.log(diffInMs, "diff");
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const remainingSeconds = diffInSeconds % 60;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const remainingMinutes = diffInMinutes % 60;
  
    const diffString = `${diffInHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;
    setTimeleft(diffString);
    if (date1 == date2 || date1 < date2) setIsTimeLeft(true);
    console.log(diffString);
  };
  useEffect(()=>{
    socket.on("bidWinner", ({ productId, amount })=> {
      console.log(productId, amount)
    })
  })
  useEffect(() => {
    let timer;
    if (currentProduct) {
      const { biddingEndTime } = currentProduct;
      countdown(currentProduct._id, biddingEndTime);
  
      // Update the time left every second
      timer = setInterval(
        () => countdown(currentProduct._id, biddingEndTime),
        1000
      );
    }
    return () => clearInterval(timer);
  }, [currentProduct]);
  
  const fetchMyProducts = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        setUserInfo(userInfo);
      }
      const { data } = await axios.get(
        `http://localhost:5000/api/products/otherproducts/${userInfo._id}`,
        config
      );
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(products);
  useEffect(() => {
    fetchMyProducts();
  }, []);
  console.log(userInfo);

  useEffect(() => {
    fetchTopBids();
  }, []);

  const fetchTopBids = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/topBidders/${id}`
      );
      setTopBids(data);
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleProductSelect = (product) => {
    setCurrentProduct(product);
    setWinner(null);
    console.log(product);
  };

  const handleBiddingAmountChange = (event) => {
    setBiddingAmount(Number(event.target.value));
  };

  const handleBidSubmit = () => {
    socket.emit("bid", {
      productId: currentProduct._id,
      userId: "64124730022147aecf137014", // Replace with the actual user ID
      amount: biddingAmount,
    });
    socket.on("newBid", ({ productId, user, amount }) => {
      let productToBid = currentProduct;
      productToBid.bids.push({ user, amount });
      setCurrentProduct(productToBid);

      // Check if the bid is the highest so far
      const highestBid = Math.max(
        ...productToBid.bids.map((bid) => bid.amount)
      );
      const highestBidder = productToBid.bids.find(
        (bid) => bid.amount === highestBid
      );

      // Update the winner state with the user ID of the highest bidder
      setWinner(highestBidder.user);
    });

    setBiddingAmount(0);
  };

  const handleEndBidding = () => {
    socket.emit("endBidding", currentProduct._id);
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/products`);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );
      console.log("Product Deleted!");
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Container maxWidth="md">
        <Box my={4}>
          <Link to={`/auctionform`}>
          <Button variant="primary" className="my-3 ml-3">
              Add Product
            </Button>
          </Link>
          <Link to={`/myproducts`}>
          <Button variant="primary" className="my-3 ml-3">  
              My Products
            </Button>
          </Link>
        </Box>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card elevation={3}>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="250"
                  image={`../..${product.imageUrl}`}
                  title={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {product.description} - {product.currentPrice}
                  </Typography>
                </CardContent>
                <CardActions>
                  <div>
                    <Link to={`/detailproduct/${product._id}`}>
                      <ButtonBase
                        variant="contained"
                        color="info"
                        type="submit"
                        className="submit-btn"
                      >
                        Details
                      </ButtonBase>
                    </Link>
                    {userInfo === product.id && (
                      <div>
                        <Link to={`/updateformproduct/${product._id}`}>
                          <ButtonBase
                            variant="contained"
                            color="success"
                            type="submit"
                            className="submit-btn"
                          >
                            Update
                          </ButtonBase>
                        </Link>
                        <ButtonBase
                          variant="contained"
                          color="error"
                          type="submit"
                          className="submit-btn"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </ButtonBase>
                      </div>
                    )}
                  </div>
                  <ButtonBase
                    variant="contained"
                    color="dark"
                    type="submit"
                    size="medium"
                    className="submit-btn"
                    onClick={() => handleProductSelect(product)}
                  >
                    Select
                  </ButtonBase>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {currentProduct && (
          <div>
            <Typography variant="h4" gutterBottom>
              {currentProduct.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Current price: {currentProduct.currentPrice}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Time left: {isTimeLeft ? "Auction has ended" : timeleft}
            </Typography>
            {/* Display the remaining time left */}
            <Typography variant="h5" gutterBottom>
              Bids
            </Typography>
            <ul>
              {currentProduct.bids.map((bid, index) => (
                <li key={index}>
                  {bid.user} - {bid.amount}
                </li>
              ))}
            </ul>
            {currentProduct._id === userInfo ? null : (
              <div>
                <TextField
                  type="number"
                  placeholder="Enter your bid amount"
                  value={biddingAmount}
                  onChange={handleBiddingAmountChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBidSubmit}
                >
                  Submit Bid
                </Button>
              </div>
            )}
            <Button onClick={handleEndBidding}>End bidding</Button>
          </div>
        )}
        {winner && winner === userInfo._id && (
          <Typography variant="h6" gutterBottom>
            You won the bid! Congratulations!
          </Typography>
        )}
      </Container>
    </div>
  );
}

export default OtherProducts;
