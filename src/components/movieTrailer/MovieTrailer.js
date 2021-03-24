import React from 'react';

import BackDrop from '../../shared/components/UI/Backdrop';

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
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen></iframe>
      </div>
    </>
  );
}
