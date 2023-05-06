import React, { props, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
import Loader from './Loader';
import createImage from './create.jpeg'
import './createProject.css'
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  
} from 'react-bootstrap';
import { Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const CreateProjectIdea = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log(user)



  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/fundMe/createProject`, { title, description, fundingGoal }, config);
      setTitle('');
      setDescription('');
      setFundingGoal('');
      setLoading(false);
      navigate('/fundMe/project-ideas');
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message || err.message);
    }
  };
  return (
    <Container>
      <h2 style={{ textAlign: 'center', marginTop: '100px' }}>
        Create your own project idea and let others fund it!
      </h2>
      <Form onSubmit={submitHandler}>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <Row>
          <Col md={5} style={{ marginTop: '20px' }}>
            <Form.Group controlId='title'>
              <Form.Label>
                Title <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <br />
              <Input
                type='text'
                placeholder='Enter title'
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>
                Description <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <br />
              <Input
                 multiline
                 rows={4}
                placeholder='Enter description'
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='fundingGoal'>
              <Form.Label>
                Funding Goal <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <br />
              <Input
                type='number'
                
                placeholder='Enter funding goal'
                value={fundingGoal}
                required
                onChange={(e) => setFundingGoal(e.target.value)}
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Col>
          <Col md={7}>
            <img src={createImage} alt='project image' style={{ maxWidth: '100%' }} />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateProjectIdea