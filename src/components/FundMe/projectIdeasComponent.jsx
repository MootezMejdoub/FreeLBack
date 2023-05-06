import React, { useEffect, useState } from 'react';
import './projectIdeas.css';
import './top10.css'
import { Link } from 'react-router-dom';
import ideaImage from "./idea.jpg";
import axios from 'axios';
import { Container, Row, Col, Card, Button, ProgressBar, Alert } from 'react-bootstrap';
import TopDonationsComponent from './Top10Donations';
import ProjectIdeasWithMostRaised from './topProjects.jsx'
import { useDispatch, useSelector } from 'react-redux';


const ProjectIdeasComponent = () => {
  const [projectIdeas, setProjectIdeas] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userInfo, setUserInfo] = useState("");
  const userLogin = useSelector(state => state.user);
console .log(userLogin)
  const fetchProjectIdeas = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/fundMe/projects`);
      setProjectIdeas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(userLogin.user,"this user")
    fetchProjectIdeas();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, []);

  

  return (
    <Container fluid style={{marginTop:"100px"}}>
    <Row>
    <Col md={3} className="sticky-col">
        <div className="d-flex flex-column">
          <TopDonationsComponent />
          <ProjectIdeasWithMostRaised />
        </div>
      </Col>
      <Col md={9}>
        <h1>FundMe : </h1>
        <h2>FundMe is a feature offered by Efarm that allows young farmers and entrepeneurs to share their project ideas and ask for funding.</h2>
        <h3>Many great ideas go out without trying for lack of funding.
          Your contribution can make one of these the next big thing!
          You can even be one of them!
        </h3>
      <div className="d-flex align-items-center">
    <Link to="/fundMe/create-idea">
      <Button variant="primary" className="my-3 mr-3">
        Add New Project Idea
      </Button>
    </Link>
    <Link to="/fundMe/myProjects">
      <Button variant="primary" className="my-3 ml-3">
        My Projects
      </Button>
    </Link>
  </div>
      {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          {successMessage}
        </Alert>
      )}
      {showErrorAlert && (
        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Row>
        {projectIdeas.map((projectIdea) => (
          <Col key={projectIdea._id} className="mb-4" md={4}>
            <Card className='card-container'>
              <Card.Img width="150px" src={ideaImage} className="card-img-top" />
              <Card.Body>
                <Card.Title>{projectIdea.title}</Card.Title>
                <Card.Text>
                  {projectIdea.description.slice(0, 100)}{projectIdea.description.length > 100 ? '...' : ''}
                </Card.Text>
                
                <Card.Text>
                  Funding Goal: ${projectIdea.fundingGoal}
                </Card.Text>
                <br />
                <ProgressBar
                  now={projectIdea.currentAmountRaised}
                  max={projectIdea.fundingGoal}
                  label={`$${projectIdea.currentAmountRaised}`}
                  style={{marginBottom:"50px"}}
                />
                

                <Link to={`/fundMe/project_detail/${projectIdea._id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </Col>
      </Row>
      
    </Container>
  );
};

export default ProjectIdeasComponent;
