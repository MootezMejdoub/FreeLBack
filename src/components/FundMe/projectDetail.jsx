import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Card, Row, Col, Form, Button, ProgressBar  } from "react-bootstrap";
import './projectDetail.css'
import ideaImage from "./idea.jpg";
import paymentImage from "./methods.png"
import { Input } from "@mui/material";


const ProjectIdeaDetailComponent = () => {
  const { id } = useParams();
  const history = useHistory();
  const [amount, setAmount] = useState("");
  const [projectIdea, setProjectIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAmountRaised, setCurrentAmountRaised] = useState(0);
  const [topDonations, setTopDonations] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchProjectIdea = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/fundMe/projects/${id}`)
      setProjectIdea(data);
      setCurrentAmountRaised(data.currentAmountRaised);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const fetchTopDonations = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/fundMe/topDonations/${id}`);
      setTopDonations(data);
      console.log(data)
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchProjectIdea();
    fetchTopDonations();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
      const donor=userInfo
      console.log(donor)
    try {
      const { data } = await axios.post(`http://localhost:5000/api/fundMe/createDonation/${id}`, { 
        amount,
        donor,
        projectIdea: projectIdea._id 
      }, config);   
      console.log(data); // or do something else with the response
      
      setAmount('');
      history.push('/fundMe/project-ideas');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container style={{ marginTop: "100px" }} className="container">
      <h3>You can donate to this project idea.
        Remember that every donation counts !
      </h3>
      {loading && <p>Loading project idea...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && projectIdea && (
        <Row>
          <Col sm={12} md={6}>
            <Card className="my-3 p-3">
              <img
                src={ideaImage}
                alt="Project Idea Image"
                className="project-idea-image"
              />
              <Card.Body>
                <Card.Title className="project-idea-title">
                  {projectIdea.title}
                </Card.Title>
                <Card.Text className="project-idea-description">
                  {projectIdea.description}
                </Card.Text>
                <div className="project-idea-stats">
                  <p>Funding Goal: {projectIdea.fundingGoal}</p>
                  <p>
                    Current Amount Raised: ${currentAmountRaised} out of $
                    {projectIdea.fundingGoal}
                  </p>
                </div>
                <ProgressBar
                  now={projectIdea.currentAmountRaised}
                  max={projectIdea.fundingGoal}
                  label={`$${projectIdea.currentAmountRaised}`}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6}>
            <Card className="my-3 p-3">
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <br />
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Donate
                  </Button>
                </Form>
                <img className="payment_image" src={paymentImage} alt="Project Idea Image"></img>
              </Card.Body>
            </Card>
            <p className="tabletitle">Top 5 donations for this project : </p>
            <table className="table table-striped">
                      <thead>
                          <tr>
                              <th>Amount</th>
                          </tr>
                      </thead>
                      <tbody>
                          {topDonations.slice(0, 5).map((donation) => (
                              <tr key={donation._id}>
                                  <td>${donation.amount}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProjectIdeaDetailComponent;
