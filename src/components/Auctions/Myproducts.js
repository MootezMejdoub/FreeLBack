import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { useDispatch ,useSelector} from 'react-redux';


import {
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import './AuctionList.css'

const MyProducts = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  const [myProducts, setMyProducts] = useState([]);
  const [userInfo, setUserInfo] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchMyProducts = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        setUserInfo(userInfo);
      }
      const { data } = await axios.get(
        `http://localhost:5000/api/products/myproducts/${userInfo._id}`,
        config
      );
      setMyProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      const updatedProducts = myProducts.filter(
        (product) => product._id !== productId
      );
      setMyProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
<h1>My Products</h1>
        <Container className="my-3 p-3 bg-light" style={{ marginTop: "200px" }}>
        <Link to={`/otherproducts/`}>
          <Button  variant="contained"
            color="warning"
            type="submit"
            className="btn">
        Product to Bid
      </Button>
          </Link>
          <Link to="/auctionform">
            <Button
            variant="contained"
            color="success"
            type="submit"
            className="btn"
            >
              Add Product
            </Button>
          </Link>        
          <Container>
            {myProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card elevation={3}>
                  <CardMedia component="img" src={product.image} />
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {product.description}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Current Price: ${product.currentPrice}
                    </Typography>
                  </CardContent>
                  <CardActions  style={{ display: "flex", justifyContent: "center" }}>
                    <Link to={`/detailproduct/${product._id}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="btn"
                      >
                      Details
                      </Button>
                    </Link>
                    <Link to={`/updateformproduct/${product._id}`}>
                      <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        className="btn"
                      >
                      Update
                      </Button>
                    </Link>
                    
                    <Button
                      variant="contained"
                      color="error"
                      type="submit"
                      className="btn"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                    Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Container>
        </Container>
    </Container>
  );
};

export default MyProducts;
