import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './myProjects.css'
import axios from 'axios';
import ideaImage from "./idea.jpg";
import { CardActions, CardContent,CircularProgress, CardMedia, Grid, Typography } from '@mui/material';
import {
  Container,
  Col,
  Card,
  Button,
  ProgressBar,
  Row
} from 'react-bootstrap';


const MyProjectsComponent = () => {
  const [myProjects, setMyProjects] = useState([]);
  
  const [userInfo, setUserInfo] = useState("");
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const fetchMyProjects = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo) {
        setUserInfo(userInfo);
      }
      const { data } = await axios.get(
        `http://localhost:5000/api/fundMe/myProjects/${userInfo._id}`,
        config
      );
      setMyProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:5000/api/fundMe/deleteProjects/${projectId}`);
        const updatedProjects = myProjects.filter((project) => project._id !== projectId);
        setMyProjects(updatedProjects);
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  return (
    
      <Container className="container" style={{ marginTop: "200px" }}>
        <h1>Fund Me</h1>
        <h3>My Projects</h3>
        <h4>In this section you can modify the projects that you already posted. </h4>
        <Link to="/fundMe/create-idea">
          <Button variant="primary" className="my-3">
            Add New Project
          </Button>
        </Link>
        <Row>
        {myProjects.map((project) => (
          <Col key={project._id} className="mb-4" md={4}>
            <Card>
              <Card.Img width="150px" src={ideaImage} className="card-img-top" />
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>
                  {project.description.slice(0, 100)}{project.description.length > 100 ? '...' : ''}
                </Card.Text>
                <Card.Text>
                  Funding Goal: ${project.fundingGoal}
                </Card.Text>
                <br />
                <ProgressBar
                  now={project.currentAmountRaised}
                  max={project.fundingGoal}
                  label={`$${project.currentAmountRaised}`}
                  style={{marginBottom:"10px"}}
                />
                
<div className='button-group'>
                <Link to={`/fundMe/project_detail/${project._id}`}>
                  <Button className='btn' variant="primary">View Details</Button>
                </Link>
                <Link to={`/fundMe/updateProjects/${project._id}`}>
                  <Button className='btn' variant="primary">
                    Update Project
                  </Button>
                </Link>
                <Button variant="danger" className="btn" onClick={() => handleDeleteProject(project._id)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
                
            
        </Container>
      
    
  );
};

export default MyProjectsComponent;
