import React, { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import validator from "validator";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './add.css'
function AddVisit2() {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState('');
  const [photo, setPhoto] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [maxGroupSize, setMaxGroupSize] = useState('');
  const [message, setMessage] = useState('');
  const [avgRating, setAvgRating] = useState('');
  const [featured, setFeatured] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [titleError, setTitleError] = useState('');
  const [cityError, setCityError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [distanceError, setDistanceError] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [descError, setDescError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [maxGroupSizeError, setMaxGroupSizeError] = useState('');
  const [uploading, setUploading] = useState(false)

  const navigate = useNavigate();
  const handleCancel = () => {
    setTitle("");
    setCity("");
    setAddress("");
    setDistance("");
    setPhoto("");
    setDesc("");
    setPrice("");
    setMaxGroupSize("");
    navigate("/visit");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    const errors = {};
    if (validator.isEmpty(title)) {
      errors.title = 'Title is required';
    }
    if (validator.isEmpty(city)) {
      errors.city = 'City is required';
    }
    if (validator.isEmpty(address)) {
      errors.address = 'Address is required';
    }
    if (validator.isEmpty(distance)) {
      errors.distance = 'Distance is required';
    }
    if (validator.isEmpty(photo)) {
      errors.photo = 'Invalid photo ';
    }
    if (validator.isEmpty(desc)) {
      errors.desc = 'Description is required';
    }
    if (validator.isEmpty(price)) {
      errors.price = 'Price is required';
    }
    if (validator.isEmpty(maxGroupSize)) {
      errors.maxGroupSize = 'Max group size is required';
    }

    // Set errors or submit data
    if (Object.keys(errors).length > 0) {
      setTitleError(errors.title || '');
      setCityError(errors.city || '');
      setAddressError(errors.address || '');
      setDistanceError(errors.distance || '');
      setPhotoError(errors.photo || '');
      setDescError(errors.desc || '');
      setPriceError(errors.price || '');
      setMaxGroupSizeError(errors.maxGroupSize || '');
    } else {
      console.log({ title, city, address, distance, photo, desc, price, maxGroupSize });
    }
    try {
      const response = await axios.post('http://localhost:5000/api/visits/add', {
        title,
        city,
        address,
        distance,
        photo,
        desc,
        price,
        maxGroupSize,

      });
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your visit has been added',
        showConfirmButton: false,
        timer: 1500
      })
      setMessage(response.data.message);
      navigate("/visit");
    } catch (error) {
      console.error(error);
      // setMessage('Error creating visit');
      Swal.fire({
        icon: "error",
        title: "Visit not added...",
        text: "Something went wrong!",
      });
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
  }
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setPhoto(data)
      setUploading(false)

    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  const handleInputChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Container>
      {/* <h2 style={{textalign:"center",marginTop:"100px"}}> Add Visit</h2> */}
      <Form onSubmit={handleSubmit}>

        <Row>
          <Form.Group controlId="title" className="col-md-6">
            <Form.Label>Title </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your visit title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              // isInvalid={!!titleError}
              isValid={!titleError && title.length > 0}
              isInvalid={titleError}
            />
            <Form.Control.Feedback type="invalid">{titleError}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="city" className="col-md-6">
            <Form.Label className="ml-20">City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city "
              value={city}
              onChange={(event) => setCity(event.target.value)}
              isInvalid={!!cityError}
            />
            <Form.Control.Feedback type="invalid">{cityError}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
        <Form.Group controlId="address" className="col-md-6">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter address "
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            isInvalid={!!addressError}
          />
          <Form.Control.Feedback type="invalid">{addressError}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="distance" className="col-md-6">
          <Form.Label>Distance</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter distance "
            value={distance}
            onChange={(event) => setDistance(event.target.value)}
            isInvalid={!!distanceError}
          />
          <Form.Control.Feedback type="invalid">{distanceError}</Form.Control.Feedback>
        </Form.Group>
        </Row>
        <Row>
        <Form.Group controlId="photo" className="col-md-6">
          <Form.Label>Image</Form.Label>
          <Form.Control />
          <input
            as="file "
            placeholder="Enter image "
            type="file"
            value={photo}
            onChange={(event) => setPhoto(event.target.value)}
            //onChange={uploadFileHandler}
            isInvalid={!!photoError} />


          <Form.Control.Feedback type="invalid">{photoError}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="desc" className="col-md-6">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter desc "
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
            isInvalid={!!descError}
          />
          <Form.Control.Feedback type="invalid">{descError}</Form.Control.Feedback>
        </Form.Group>
        </Row>
        <Row>
        <Form.Group controlId="price" className="col-md-6">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price "
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            isInvalid={!!priceError}
          />
          <Form.Control.Feedback type="invalid">{priceError}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="maxGroupSize" className="col-md-6">
          <Form.Label>MaxGroupSize</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter maxGroupSize "
            value={maxGroupSize}
            onChange={(event) => setMaxGroupSize(event.target.value)}
            isInvalid={!!maxGroupSizeError}
          />
          <Form.Control.Feedback type="invalid">{maxGroupSizeError}</Form.Control.Feedback>
        </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
 }

export default AddVisit2;
