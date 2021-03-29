import React from 'react';

import Slider from 'react-slick';

import { useHistory } from 'react-router-dom';

import './TrailerSlider.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function TrailerSlider(props) {
  const { onClickTrailer, trailers } = props;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // className: 'slider-item',
  };

  console.log(props.trailers);

  return (
    <div className='trailer-slider'>
      <Slider {...settings}>
        {trailers.map((trailer) => (
          <div
            onClick={() => onClickTrailer(trailer)}
            className='trailer-slider--item'>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title='YouTube video player'
              frameborder='0'></iframe>
          </div>
        ))}
      </Slider>
    </div>
  );
}
