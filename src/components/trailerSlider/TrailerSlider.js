import React from 'react';

import Slider from 'react-slick';

import './TrailerSlider.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function TrailerSlider(props) {
  const { onClickTrailer, trailers } = props;

  var settings = {
    infinite: trailers.slice.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className='trailer-slider left-align-slick'>
      <Slider {...settings}>
        {trailers.map((trailer) => (
          <div
            className='trailer-slider--item '
            onClick={() => onClickTrailer(trailer)}>
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
