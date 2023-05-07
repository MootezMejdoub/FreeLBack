import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  Button,
  Container,
  Form,
  InputGroup,
  FormControl,
  Pagination,
} from "react-bootstrap";
import iconeEdit from "../../assets/Iconn/edit-2-fill.png";
import iconeReject from "../../assets/Iconn/chat-delete-fill.png";
import iconeConfirm from "../../assets/Iconn/add-box-fill.png";
import iconeDelete from "../../assets/Iconn/delete-bin-5-fill.png";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { PaginationItem, PaginationLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import "./liste.css";
import Sidebar from "./Sidebar/Sidebar";

const VisitList = ({ navigate }) => {
  // const visitList = useSelector((state) => state.visitList);
  // const { loading, error, users } = visitList;
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visites, setVisites] = useState([]);
  const [visitState, setVisitState] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const visitPerPage = 5;
  const pageVisited = pageNumber * visitPerPage;
  const Visitid = useParams();
  // console.log(Visitid.id);
  const navigateto = useNavigate();
  const [onMobile, setOnMobile] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  //  const handleSearchSubmit = async (e) => {
  //       e.preventDefault();
  //       try {
  //         const res = await axios.get(`http://localhost:500/api/visits/search?query=${searchText}`);
  //         setVisites(res.data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/visits/search?query=${searchText}`
        );
        setVisites(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    console.log(visites);
  }, [searchText]);

  useEffect(() => {
    const fetchVisit = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/visits/visit/${Visitid.id}`
      );
      setVisites(data);
      setVisitState(data.state ? "CONFIRME" : "EN COURS");
    };
    fetchVisit();
  }, [Visitid]);

  const handleConfirm = async (visitid) => {
    try {
      console.log(visitid);
      await axios.put(`http://localhost:5000/api/visits/setState/${visitid}`, {
        state: "Confirmed",
      });
      setVisitState("CONFIRME");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
    window.location.reload();
  };
  const handleReject = async (visitid) => {
    try {
      console.log(visitid);
      await axios.put(`http://localhost:5000/api/visits/setState/${visitid}`, {
        state: "Rejected",
      });
      setVisitState("CONFIRME");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
    window.location.reload();
  };
  async function getUsers() {
    fetch(`http://localhost:5000/api/visits/all`, {})
      .then((response) => response.json())
      .then((data) => setVisites(data));
  }

  useEffect(() => {
    getUsers();
  }, []);

  // const deleteVisit = async (id) => {
  //   //const result = window.confirm("Are you sure you want to delete?");

  //   await axios.delete(`http://localhost:5000/api/visits/delete/${id}`, {

  //   })
  //     .then((res) => {
  //       Swal.fire({
  //         title: 'Are you sure?',
  //         text: "You won't be able to revert this!",
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //         confirmButtonText: 'Yes, delete it!'
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           Swal.fire(
  //             'Deleted!',
  //             'Your file has been deleted.',
  //             'success'
  //           )
  //         }
  //       })
  //       navigate("/admin/visitlist")
  //     });
  //   getUsers();

  // }
  const deleteVisit = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axios.delete(`http://localhost:5000/api/visits/delete/${id}`);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
    window.location.reload();
    navigate("/admin/visitlist");
    getUsers();
  };

  //---------------------- Pagination ------------------------------------------//
  const pageSize = 3;
  const pageCount1 = Math.ceil(visites.length / pageSize);
  const pages = Array.from({ length: pageCount1 }, (_, i) => i + 1);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const paginatedVisites = visites.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <LinkContainer style={{ float: "right" }} to="/admin/visite/addvisit">
        <Button className="mr-3">ADD Visit</Button>
      </LinkContainer>

      <Table striped bordered hover responsive className="table-sm ml-5">
        <div
          className="bg-white rounded-xl shadow-lg w-full "
          style={{ height: 270 }}
        >
          <thead>
            <tr>
              <th>TITLE</th>
              <th>CITY</th>
              <th>ADDRESS</th>
              <th>DISTANCE</th>
              <th>PHOTO</th>
              <th>DESCRIPTION</th>
              <th>PRICE</th>
              <th>MAXGROUPSIZE</th>
              <th>FEATURED</th>
              <th>OPTIONS </th>
              {/* <th> DELETE</th>
              <th> CONFIRME</th> */}
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {/* {visites.map((visit) => ( */}

            {paginatedVisites.map((visit) => (
              <tr key={visit._id}>
                <td>{visit.title}</td>
                <td>{visit.city}</td>
                <td>{visit.address}</td>
                <td>{visit.distance}</td>
                <td>
                  <img src={visit.photo} alt="img1" />
                  {visit.photo}
                </td>
                <td>{visit.desc}</td>
                <td>{visit.price}</td>
                <td>{visit.maxGroupSize}</td>
                <td>
                  {visit.featured ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: "green" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      style={{ color: "red" }}
                    />
                  )}
                </td>
                {/* <td>{visit.featured}</td> */}
                <td>
                  <div className="d-flex mr-5">
                    <Link to={`/admin/visite/${visit._id}/editvisit`}>
                      <img
                        src={iconeEdit}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          color: "blue",
                        }}
                      />
                    </Link>
                    <img
                      src={iconeDelete}
                      onClick={() => deleteVisit(visit._id)}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        color: "red",
                      }}
                    />
                    <img
                      src={iconeConfirm}
                      onClick={() => handleConfirm(visit._id)}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                    <img
                      src={iconeReject}
                      onClick={() => handleReject(visit._id)}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </td>
                {/* <td>
                  {/* <Button
                    variant="danger"
                    className="btn-sm delete-btn mr-2 custom-btn"
                    onClick={() => deleteVisit(visit._id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button> */}
                {/* </td> */}
                {/* <td>
                  {/* {visit.state !== 'En Cours' 
                    
                  } */}
                {/* <div>
                  <Button
                      variant="success"
                      className="btn-sm delete-btn mr-2"
                      onClick={()=>handleConfirm(visit._id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm delete-btn mr-2"
                      onClick={()=>handleReject(visit._id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                    </div> */}
                {/* 
                  <div className="d-flex">
                    <Button
                      variant="success"
                      className="btn-sm delete-btn mr-2"
                      onClick={() => handleConfirm(visit._id)}
                    >
                      <i className="fas fa-check"></i>
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm delete-btn"
                      onClick={() => handleReject(visit._id)}
                    >
                      <i className="fas fa-times"></i>
                    </Button>
                  </div> */}
                {/* </td> */}
                <td>{visit.state}</td>
                {/* <td>
                  <LinkContainer to={`/admin/user/${visit._id}/edit`}>
                      <Button variant="success" className="btn btn-sm edit-btn">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                  </td> */}
                {/* <td>{visit.state ? "CONFIRME" :  "EN COURS"}</td> */}
                {/* <td>{visitState}</td> */}
              </tr>
            ))}
          </tbody>
        </div>
      </Table>
      <Pagination
        className="pagination justify-content-end mb-0"
        listClassName="justify-content-end mb-0"
      >
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink
            onClick={() => handlePageClick(currentPage - 1)}
            tabIndex="-1"
          >
            <i className="fas fa-angle-left" />
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page} active={currentPage === page}>
            <PaginationLink onClick={() => handlePageClick(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage === pageCount1}>
          <PaginationLink
            onClick={() => handlePageClick(currentPage + 1)}
            tabIndex="-1"
          >
            <i className="fas fa-angle-right" />
            <span className="sr-only">Next</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default VisitList;
