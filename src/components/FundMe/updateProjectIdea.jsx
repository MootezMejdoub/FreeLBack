import React, {useState } from 'react';
import {useParams, useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Message from './Message';

import {
  Form,
  Button,
  Row,
  Col,
  Container,
} from 'react-bootstrap';

import './updateProject.css';
import { Input } from '@mui/material';

const UpdateProjectForm = () => {
  const {id} = useParams()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedProjectData = {
      title: title,
      description: description,
      amount: amount,
    };

    axios.put(`http://localhost:5000/api/fundMe/updateProjects/${id}`, updatedProjectData)
      .then(response => {
        console.log('Project updated successfully!');
        navigate('/fundMe/project-ideas');
      })
      .catch(error => {
        setErrorMessage('An error occurred while updating the project.');
        console.error(error);
      });
  }
  return (
    <Container>
      <h2 style={{ textAlign: 'center', marginTop: '100px', marginBottom:"100px" }}>
        Update your project idea and let others fund it!
      </h2>
      <Form onSubmit={handleSubmit} className="update-form">
  {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
  <div className="form-row">
    <Form.Group controlId='title'>
      <Form.Label>
        Title <span style={{ color: 'red' }}>*</span>
      </Form.Label>
      <Input
        type='text'
        placeholder='Enter title'
        value={title}
        required
        onChange={(event) => setTitle(event.target.value)}
      />
    </Form.Group>
  </div>
  <div className="form-row">
    <Form.Group controlId='description'>
      <Form.Label>
        Description <span style={{ color: 'red' }}>*</span>
      </Form.Label>
      <Input
        multiline
        rows={4}
        type='description'
        placeholder='Enter description'
        value={description}
        required
        onChange={(event) => setDescription(event.target.value)}
      />
    </Form.Group>
  </div>
  <div className="form-row">
    <Form.Group controlId='amount'>
      <Form.Label>
        Amount <span style={{ color: 'red' }}>*</span>
      </Form.Label>
      <Input
        type='number'
        placeholder='Enter funding amount'
        value={amount}
        required
        onChange={(event) => setAmount(event.target.value)}
      />
    </Form.Group>
  </div>
  <Button variant='success' type='submit' className="submit-btn">
    Update Project
  </Button>
</Form>
    </Container>
  );
}
export default UpdateProjectForm;
