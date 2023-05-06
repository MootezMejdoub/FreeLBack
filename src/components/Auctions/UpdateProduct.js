import { useState, useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import axios from "axios";
import Card from "@mui/material/Card";

import { Box, Button, TextField, Typography } from "@mui/material";
function UpdateProduct() {
  const {id} = useParams()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const [startingPrice, setStartingPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [biddingEndTime, setBiddingEndTime] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const updateproductData = {
      name: name,
      description: description,
      startingPrice: startingPrice,
      currentPrice: currentPrice,
      biddingEndTime:biddingEndTime,
    };

    axios.put(`http://localhost:5000/api/products/${id}`, updateproductData 
      )
      .then(response => {
        alert('Product updated successfully!');
      })
      .catch(error => {
        console.error(error);
        alert("Failed to update product.");
      });
    }
    return (
      <Card>
        <Box
          variant="gradient"
          bgColor="secondary"
          borderRadius="lg"
          coloredShadow="secondary"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
            Update Your Product
          </Typography>
        </Box>
        <Box pt={4} pb={3} px={3}>
          <Box component="form" role="form">
            <Box mb={2}>
              <TextField
                type="text"
                label="Name"
                variant="filled"
                fullWidth
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                type="textarea"
                label="Description"
                variant="filled"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                type="number"
                label="Starting Price"
                variant="filled"
                fullWidth
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                required
              />
            </Box>
            <Box mb={2}>
            <TextField
            type="number"
             id="filled-basic"
              label="Current Price"
               variant="filled"
               onChange={(e) => setCurrentPrice(e.target.value)}
               required
               fullWidth />
            </Box>
            <Box mb={2}>
            <TextField
            type="datetime-local"
             id="filled-basic"
              label="Bidding End Time"
               variant="filled"
               value={biddingEndTime}
                onChange={(e) => setBiddingEndTime(e.target.value)}
                required
               fullWidth />
            </Box>
            <Box mt={4} mb={1}>
              <Button variant="contained"
              color="primary"  onClick={handleSubmit}>
                Update
              </Button>
              <Link to={`/myproducts/`}>
              <Button variant="contained" color="secondary" fullWidth>
                Back to List
              </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Card>
    
      );
    
}

export default UpdateProduct;        
