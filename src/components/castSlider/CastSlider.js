import React from 'react';
import Slider from 'react-slick';

import { useHistory } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './CastSlider.css';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

function CastSlider(props) {
  const history = useHistory();

  var settings = {
    infinite: props.cast.length > 5,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
  };

  const gotoPersonPage = (personId) => {
    history.push(`/person/${personId}`);
  };

  return (
    <div className='cast-slider-container'>
      <Slider {...settings}>
        {props.cast.map((actor) => (
          <div className='cast-slider-item'>
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
            <div className='actor-character'>{actor.character}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default React.memo(CastSlider);
