import React, { useRef, useEffect, useState } from "react";
import "./stylesVisite/search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import iconeSearch from "./assets/icones/search-fill.png";
import iconLocalisation from "./assets/icones/map-pin-5-fill.png";
import iconDate from "./assets/icones/calendar-fill.png";
import iconPerson from "./assets/icones/group-fill.png";
import { BASE_URL } from "./utils/config";
const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState({});
  useEffect(() => {}, [searchResults]);
  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("data", data);
    setSearchInput(data);
    const res = await fetch(
      `/api/visits/search?city=${data.location}&distance=${data.distance}&maxGroupSize=${data.maxGroupSize}`
    );

    if (!res.ok) {
      alert("Something went wrong");
    } else {
      const result = await res.json();
      console.log(result);
      setSearchResults(result);
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form
          onSubmit={handleSearch}
          className="d-flex align-items-center gap-4"
        >
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <img src={iconLocalisation} />
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                name="location"
                placeholder="Where are you going?"
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <img src={iconLocalisation} />
            </span>
            <div>
              <h6>Distance</h6>
              <input type="number" name="distance" />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <img src={iconPerson} />
            </span>
            <div>
              <h6>Number persons</h6>
              <input type="number" name="maxGroupSize" placeholder="0" />
            </div>
          </FormGroup>

          <button type="submit">
            <img src={iconeSearch} alt="" />
          </button>
        </Form>
      </div>

      {searchResults.length > 0 && (
        <div>
          <h2>Search results:</h2>
          <ul>
            {searchResults.map((visit) =>
              visit?._id &&
              (visit.city === searchInput.location ||
                visit.distance == searchInput.distance ||
                visit.maxGroupSize == searchInput.maxGroupSize) ? (
                <li key={visit._id}>
                  <h3>{visit.title}</h3>
                  <p>Description : {visit.desc}</p>
                  <p>Price: {visit.price}</p>
                  <img src={`/images/${visit.photo}.jpg`} alt={visit.name} />
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </Col>
  );
};

export default SearchBar;
