import React from 'react';
import Slider from 'react-slick';

import { useHistory } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Slider.css';

import { API_MOVIE_IMAGE } from '../../util/config';

export default function SimpleSlider(props) {
  const history = useHistory();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    className: 'slider-item',
  };

  const gotoPersonPage = (personId) => {
    history.push(`/person/${personId}`);
  };

  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {props.cast.map((actor) => (
          <div className='slider-item'>
            <img
              onClick={() => gotoPersonPage(actor.id)}
              src={`${API_MOVIE_IMAGE}/${actor.profile_path}`}
              alt='title'
            />
            <div
              onClick={() => gotoPersonPage(actor.id)}
              className='actor-name'>
              {actor.name}
            </div>
            <div className='actor-cast'>{actor.character}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
