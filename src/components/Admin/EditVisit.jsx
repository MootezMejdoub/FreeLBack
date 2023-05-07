import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./edit.css";

// reactstrap components

import { Form, Button, Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar/Sidebar";

function EditVisit({ visit }) {
  // const [title, setTitle] = useState(visit?.title);
  // const [city, setCity] = useState(visit?.city);
  // const [address, setAddress] = useState(visit?.address);
  // const [distance, setDistance] = useState(visit?.distance);
  // const [photo, setPhoto] = useState(visit?.photo);
  // const [desc, setDesc] = useState(visit?.desc);
  // const [price, setPrice] = useState(visit?.price);
  // const [maxGroupSize, setMaxGroupSize] = useState(visit?.maxGroupSize);

  //     const [title, setTitle] = useState("");
  // const [city, setCity] = useState("");
  // const [address, setAddress] = useState("");
  // const [distance, setDistance] = useState("");
  // const [photo, setPhoto] = useState("");
  // const [desc, setDesc] = useState("");
  // const [price, setPrice] = useState("");
  // const [maxGroupSize, setMaxGroupSize] = useState("");
  //     const [message, setMessage] = useState('');
  //     const[avgRating,setAvgRating]=useState('');
  //     const[featured,setFeatured]=useState('');

  // const navigate = useNavigate();
  const handleCancel = () => {
    setTitle("");
    setCity("");
    setAddress("");
    setDistance("");
    setPhoto("");
    setDesc("");
    setPrice("");
    setMaxGroupSize("");
    navigate("/admin/visitlist");
  };
  //     const Visitid = useParams();
  //     console.log(Visitid.id);

  // //     const location1 = useLocation();
  // //   const searchParams = new URLSearchParams(location1.search);
  // //   const id = searchParams.get('id');
  // //   console.log(id);
  // useEffect(() => {
  //   const fetchVisit = async () => {
  //       console.log(Visitid)
  //     const { data } = await axios.get(`http://localhost:5000/api/visits/edit/${Visitid.id}`);
  //     setTitle(data.title);
  //     setCity(data.city);
  //     setAddress(data.address);
  //     setDistance(data.distance);
  //     setPhoto(data.photo);
  //     setDesc(data.desc);
  //     setPrice(data.price);
  //     setMaxGroupSize(data.maxGroupSize);

  //   };
  //   fetchVisit();
  // }, [Visitid]);
  // const handleSubmit = async (event) => {
  //     event.preventDefault();
  //       console.log({ title, city, address,distance,photo,desc,price,maxGroupSize });
  //     try {
  //         const response = await axios.put(`http://localhost:500/api/visits/edit/${Visitid.id}`,{
  //           title,
  //             city,
  //             address,
  //             distance,
  //             photo,
  //             desc,
  //             price,
  //             maxGroupSize,

  //         }
  //         );
  //         setMessage(response.data.message);
  //           Swal.fire(
  //             'Successful Edit!',
  //             'Visit Edit successfully!',
  //             'success'
  //             )
  //           navigate("/admin/visitlist");
  //         } catch (error) {
  //           console.error("There was a problem with the fetch operation:", error);
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Visit not edited...',
  //             text: 'Something went wrong!',
  //           })
  //         }

  //   }
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [photo, setPhoto] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");
  const [message, setMessage] = useState("");
  const [avgRating, setAvgRating] = useState("");
  const [featured, setFeatured] = useState("");

  const navigate = useNavigate();
  const Visitid = useParams();
  console.log(Visitid.id);

  useEffect(() => {
    const fetchVisit = async () => {
      console.log("Fetching visit data for ID:", Visitid.id);
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/visits/visit/${Visitid.id}`
        );
        console.log("Fetched visit data:", data);
        console.log(data);
        setTitle(data.title);
        setCity(data.city);
        setAddress(data.address);
        setDistance(data.distance);
        // setPhoto(data.photo);
        setDesc(data.desc);
        setPrice(data.price);
        setMaxGroupSize(data.maxGroupSize);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchVisit();
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      title,
      city,
      address,
      distance,
      photo,
      desc,
      price,
      maxGroupSize,
    });
    try {
      const response = await axios.put(
        `http://localhost:5000/api/visits/edit/${Visitid.id}`,
        {
          title,
          city,
          address,
          distance,
          photo,
          desc,
          price,
          maxGroupSize,
        }
      );
      setMessage(response.data.message);
      Swal.fire("Successful Edit!", "Visit Edit successfully!", "success");
      navigate("/admin/visitlist");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      Swal.fire({
        icon: "error",
        title: "Visit not edited...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <main className="flex min-h-screen mt-14 sm:min-w-full">
      <Sidebar />

      <div className="flex flex-col w-full gap-0 my-8">
        <Container>
          {/* <h2 style={{textalign:"center",marginTop:"100px"}}></h2> */}
          <Form onSubmit={handleSubmit} style={{ marginLeft: 200 }}>
            <h2 style={{ textalign: "center", marginTop: "-80px" }}>
              Edit VISIT
            </h2>
            <Row>
              <Form.Group controlId="title" className="col-md-6">
                <Form.Label>Title </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your visit title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="city" className="col-md-6">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city "
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="address" className="col-md-6">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address "
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="distance" className="col-md-6">
                <Form.Label>Distance</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter distance "
                  value={distance}
                  onChange={(event) => setDistance(event.target.value)}
                />
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
                />
              </Form.Group>
              <Form.Group controlId="desc" className="col-md-6">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter desc "
                  value={desc}
                  onChange={(event) => setDesc(event.target.value)}
                />
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
                />
              </Form.Group>
              <Form.Group controlId="maxGroupSize" className="col-md-6">
                <Form.Label>MaxGroupSize</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter maxGroupSize "
                  value={maxGroupSize}
                  onChange={(event) => setMaxGroupSize(event.target.value)}
                />
              </Form.Group>
            </Row>{" "}
            <div className="flex mt-5" style={{ marginLeft: 150 }}>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </main>
  );
}

export default EditVisit;
