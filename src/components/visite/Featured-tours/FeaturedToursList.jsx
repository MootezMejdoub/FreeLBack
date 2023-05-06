import React from "react";
import TourCard from "./TourCard";
import { Col } from "react-bootstrap";

import useFetch from "../useFetch";
const FeaturedToursList =()=>{
    const {data:featuredTours, loading, error}=useFetch(
        `http://localhost:5000/api/visits/getFeatured`
        
    );
    console.log(featuredTours);
    return(
        <>
        {loading && <h4>Loading....</h4>}
        {error &&<h4>{error}</h4>}
        {!loading && !error &&
            featuredTours?.map(tour=>(
                <Col lg='3' className="mb-4" key={tour._id}>
                    <TourCard tour={tour}/>
                </Col>
            ))
        }
        </>
    )
}
export default FeaturedToursList;