import React, { useEffect, useState } from "react";

import { Container, Row, Col, Button } from "reactstrap";
import Subtitle from "./Subtitle";
import farmImg1 from "./assets/images/farm.png";
import farmImg2 from "./assets/images/agriculture-farm.png";
import farmVideo from "./assets/Farm-life.mp4";
import farmImg3 from "./assets/images/screen-shot-2012-07-06-at-4-53-12-pm.jpg";
import SearchBar from "./SearchBar";
import experinceImg from "./assets/images/exp2-modified.png";
import FeaturedToursList from "./Featured-tours/FeaturedToursList";
import MasonryImagesGallery from "./Gallery/MasonryImagesGallery";
import { LinkContainer } from "react-router-bootstrap";
import "./visit.css";

const VisitComponent = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const pages = Math.ceil(5 / 8);
    setPageCount(pages);
  }, [page]);
  return (
    <>
      <main className="w-full mt-14 sm:mt-0">
        <section>
          <Container>
            <Row>
              <Col lg="6">
                <div className="hero__content">
                  <div className="hero__subtitle d-flex align-items-center">
                    <Subtitle subtitle={"Know Before You Go"} />
                    <img src={farmImg1} alt="farm" />
                  </div>
                  <h1>
                    Visiting our farms opens the door to creating{" "}
                    <span className="highlight">memories</span>{" "}
                  </h1>
                  <p>
                    With our user-friendly interface, you can easily search for
                    farms, view farm details and availability, and book your
                    visit all in one place. At our farms, you'll have the chance
                    to see how our farmers work hard to grow the freshest
                    produce and care for their animals. You'll also learn about
                    sustainable farming practices and how we're committed to
                    preserving the environment for future generations. We look
                    forward to helping you plan your next farm visit and sharing
                    the wonders of agriculture with you!
                  </p>
                </div>
              </Col>
              <Col lg="2">
                <div className="hero__img-box">
                  <img src={farmImg2} alt="" />
                </div>
              </Col>
              <Col lg="2">
                <div className="hero__img-box mt-4">
                  <video src={farmVideo} alt="" controls />
                </div>
              </Col>
              <Col lg="2">
                <div className="hero__img-box mt-5">
                  <img src={farmImg3} alt="" />
                </div>
              </Col>
              <SearchBar />
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5">
                <Subtitle subtitle={"Explore"} />

                <h2 className="featured__tour-title">Our featured tours</h2>
                <LinkContainer style={{ float: "left" }} to="/visit/addvisit2">
                  <Button className="mr-3 mb-3">ADD Visit</Button>
                </LinkContainer>
              </Col>

              <FeaturedToursList />
            </Row>
          </Container>
        </section>
        <section>
          <Container>
            <Row>
              <Col lg="6">
                <div className="experience__content">
                  <Subtitle subtitle={"Experience"} />
                  <h2>
                    With our all experience <br /> we will serve you
                  </h2>
                  <p>
                    Our team has a wealth of knowledge and expertise in our
                    field,
                    <br />
                    and we are committed to utilizing this experience to ensure
                    that you receive the highest quality support and guidance.
                  </p>
                </div>

                <div className="counter_wrapper d-flex align-center gap-5">
                  <div className="counter__box">
                    <span>12k+</span>
                    <h6>Wonderful experience </h6>
                  </div>
                  <div className="counter__box">
                    <span>2k+</span>
                    <h6>Regular visitors</h6>
                  </div>
                  <div className="counter__box">
                    <span>15</span>
                    <h6>Years experience</h6>
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="experience__img">
                  <img src={experinceImg} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Row>
              <Col lg="12">
                <Subtitle subtitle={"Gallery"} />
                <h2 className="gallery__title">Our visitors tour gallery</h2>
              </Col>
              <Col lg="12">
                <MasonryImagesGallery />
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default VisitComponent;
