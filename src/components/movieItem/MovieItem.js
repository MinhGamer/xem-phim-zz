import React from 'react';

import './MovieItem.css';

export default function MovieItem(props) {
  const { titleEng, titleVn, imageUrl } = props.movie;

  return (
    <div className='movie-item'>
      <div className='movie-item__image'>
        <img src={imageUrl} alt={titleEng} />
        <div className='movie-item__overlay'></div>
        <div className='movie-item__play-icon'>
          <i className='fa fa-play '></i>
        </div>
      </div>
      <p className='movie-item__title--vn'>{titleVn}</p>
      <p className='movie-item__title--eng'>{titleEng}</p>
    </div>
  );
}
