import React from 'react';
import Slider from 'react-slick';
import ava1 from '../assets/images/ava-1.jpg';
import ava2 from '../assets/images/ava-2.jpg';
import ava3 from '../assets/images/ava-3.jpg';


const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      <div className='testimonial py-4 px-3'>
        <div className='d-flex flex-column align-items-center'>
          <p>"I can't wait to come back and visit again!"</p>
          <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava1} className='w-25 h-25 rounded-2' alt='' />
            <div>
              <h6 className='mb-0 mt-3'>John Doe</h6>
              <p>Visitor</p>
            </div>
          </div>
        </div>
      </div>
      <div className='testimonial py-4 px-3'>
        <div className='d-flex flex-column align-items-center'>
          <p>"I had the most amazing time at the farm!"</p>
          <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava2} className='w-25 h-25 rounded-2' alt='' />
            <div>
              <h6 className='mb-0 mt-3'>John Doe</h6>
              <p>Visitor</p>
            </div>
          </div>
        </div>
      </div>
      <div className='testimonial py-4 px-3'>
        <div className='d-flex flex-column align-items-center'>
          <p>"I never realized how much hard work goes into running a farm! But despite the labor..."</p>
          <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava3} className='w-25 h-25 rounded-2' alt='' />
            <div>
              <h6 className='mb-0 mt-3'>John Doe</h6>
              <p>Visitor</p>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonials;
