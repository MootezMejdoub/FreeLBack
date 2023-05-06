import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';

const TopDonationsComponent = () => {
  const [topDonations, setTopDonations] = useState([]);

  const fetchTopDonations = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/fundMe/toptendonationbyproject', {
        params: {
          populate: 'donor'
        }
      });
      setTopDonations(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopDonations();
  }, []);

  return (
    <div className="top-donations-container">
      <h5>Top 10 Donations:</h5>
      <ListGroup className='list'>
        {topDonations.map((donation) => (
          <ListGroupItem key={donation._id}>
            {donation.donor && donation.donor.firstName} {donation.donor && donation.donor.lastName}: ${donation.amount}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default TopDonationsComponent;
