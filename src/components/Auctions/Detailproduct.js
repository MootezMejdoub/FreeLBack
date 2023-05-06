import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ButtonBase, Card, CardContent, CardMedia, Link, Typography } from "@mui/material";

function ProductDetail(props) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [topBids,setTopBids]=useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
    fetchTopBids();
  }, [id]);


    const fetchTopBids = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/topBidders/${id}`);
        setTopBids(data);
        console.log(data)
      } catch (err) {
        console.error(err.message);
      }
    };
  return (
   <Container>
   
    <Container maxWidth="md">
      <Card item xs={12} sm={6} md={4}>
      <CardMedia
                  component="img"
                  alt={product.name}
                  height="250"
                  image={`../..${product.imageUrl}`}
                  title={product.name}
                />
        <CardContent>
          <Typography variant="h2">{product.name}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="body1">Starting Price: ${product.startingPrice}</Typography>
          <Typography variant="body1">Current Price: ${product.currentPrice}</Typography>
          <Typography variant="body1">Bidding End Time: {product.biddingEndTime}</Typography>
        <h2>BIDS</h2>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
        <Link to={"/auctionList/"}>
                <ButtonBase variant="contained" color="error" type="submit" fullWidth className="submit-btn">
                  Back to List
                </ButtonBase>
              </Link>
      </div>
        </CardContent>
      </Card>
      </Container>
   
      </Container>
  );
}

export default ProductDetail;
