import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';


const ProjectIdeasWithMostRaised = () => {
  const [projectIdeas, setProjectIdeas] = useState([]);

  useEffect(() => {
    const fetchProjectIdeas = async () => {
      const { data } = await axios.get('http://localhost:5000/api/fundMe/projects');
      setProjectIdeas(data);
    };
    fetchProjectIdeas();
  }, []);

  const projectIdeasWithMostRaised = projectIdeas.sort((a, b) => b.currentAmountRaised - a.currentAmountRaised);

  return (
    <div className="top-donations-container" style={{marginTop:"500px"}}>
    <h5>Hot Projects :</h5>
    <ListGroup className='list'>
      {projectIdeasWithMostRaised.slice(0, 5).map((projectIdea) => (
        <ListGroupItem key={projectIdea._id}>
          {projectIdea.title.slice(0, 10)} : {projectIdea.currentAmountRaised} $
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
  
  );
};

export default ProjectIdeasWithMostRaised;