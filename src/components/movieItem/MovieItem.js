import React from 'react';

import './MovieItem.css';

export default function MovieItem(props) {
  const { title, description, imageUrl } = props.movie;

  console.log(imageUrl);

  console.log(props.movie);

  return (
    <div className='movie-item'>
      <div className='movie-item__image'>
        <img src={imageUrl} alt={title} />
        <div className='movie-item__overlay'></div>
        <div className='movie-item__play-icon'>
          <i className='fa fa-play '></i>
        </div>
      </div>
      <p className='movie-item__title--eng'>{title}</p>
      <p className='movie-item__title--vn'>{description}</p>
    </div>
  );
}
