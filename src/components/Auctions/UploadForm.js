import { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

 import { Link } from 'react-router-dom';

import { Box, Button, Card, Container, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    maxWidth: 600,
    margin: '0 auto',
  },
  form: {
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
  submitButton: {
    marginRight: theme.spacing(2),
  },
}));

  
function UploadFormProduct() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startingPrice, setStartingPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [biddingEndTime, setBiddingEndTime] = useState("");
  const [products, setProducts] = useState([]);
  const [productslist, setProductslist] = useState([]);
  const id = JSON.parse(localStorage.getItem('userInfo'));
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${id.token}`,
    },
  };
  
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/products`);
      setProductslist(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    /*
      route accepts an object with the following key-value pairs
      don't use a formData obj
      just send the obj as is, just like in the POSTMAN
    */
    
    const data = {
      name,
      description,
      imageUrl,
      startingPrice,
      currentPrice,
      biddingEndTime,
      id
    };

    addProduct(data);
    fetchProducts();
  };

  const addProduct = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/",formData );

      // POST requests generate a 201 HTTP response code rather than 200
      if (response.status === 201) {
        const product = response.data;
        console.log(response);
        setProducts([...products, product]);
        alert("Product added successfully!");
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      alert("Failed to add product.");
    }
  };

  return (
    <Container className={classes.container}>
    <Card className={classes.card}>
      <Box
        variant="gradient"
        bgcolor=""
        marginTop={100}
        borderRadius="lg"
        color="common.white"
        mx={2}
        mt={-3}
        p={3}
        mb={1}
        textAlign="center"
      >
        <Typography variant="h4" fontWeight="medium">
          Product Form
        </Typography>
      </Box>
      <Box pt={4} pb={3} px={3}>
        <Box component="form" onSubmit={handleFormSubmit} className={classes.form}>
          <TextField
            label="Name"
            variant="standard"
            fullWidth
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Description"
            variant="standard"
            fullWidth
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Image"
            variant="standard"
            fullWidth
            value={imageUrl}
            required
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <TextField
            label="Starting Price"
            variant="standard"
            fullWidth
            type="number"
            value={startingPrice}
            required
            onChange={(e) => setStartingPrice(e.target.value)}
          />
          <TextField
            label="Current Price"
            variant="standard"
            fullWidth
            value={currentPrice}
            required
            type="number"
            onChange={(e) => setCurrentPrice(e.target.value)}
          />
          <TextField
            label="Bidding End Time"
            variant="standard"
            fullWidth
            type="datetime-local"
            required
            value={biddingEndTime}
            onChange={(e) => setBiddingEndTime(e.target.value)}
          />
          <Box mt={4} mb={1}>
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              type="submit"
            >
              Submit
            </Button>
            <Link to={`/myproducts/`}>
              <Button variant="contained" color="secondary">
                Back to List
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Card>
  </Container>
    );
}
export default UploadFormProduct;
