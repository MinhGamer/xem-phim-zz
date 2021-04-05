import React from 'react';
import Slider from 'react-slick';

import BackDrop from '../../shared/components/UI/Backdrop';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './MovieTrailer.css';

export default function MovieTrailer(props) {
  const { backdropClick, trailer } = props;

  console.log('MovieTrailer', trailer);
  return (
    <>
      <BackDrop onClick={backdropClick} />
      <div className='movie-trailer'>
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title='YouTube video player'
          frameborder='0'
          allow='fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen></iframe>
      </div>
    </>
  );
}
