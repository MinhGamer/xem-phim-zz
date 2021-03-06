import React from 'react';
import Slider from 'react-slick';

import { useHistory } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './CastSlider.css';

import {
  API_MOVIE_IMAGE,
  API_MOVIE_IMAGE_CUSTOM,
} from '../../shared/util/config';

function CastSlider(props) {
  const history = useHistory();

  var settings = {
    infinite: props.cast.length > 5,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1216,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  const gotoPersonPage = (personId) => {
    history.push(`/person/${personId}`);
  };

  return (
    <div className='cast-slider-container'>
      <Slider {...settings}>
        {props.cast.slice(0, 10).map(
          (actor) =>
            actor.profile_path && (
              <div className='cast-slider-item'>
                <img
                  onClick={() => gotoPersonPage(actor.id)}
                  src={`${API_MOVIE_IMAGE_CUSTOM}/w92/${actor.profile_path}`}
                  alt='title'
                />
                <div
                  onClick={() => gotoPersonPage(actor.id)}
                  className='actor-name'>
                  {actor.name}
                </div>
                <div className='actor-character'>{actor.character}</div>
              </div>
            )
        )}
      </Slider>
    </div>
  );
}

export default React.memo(CastSlider);
