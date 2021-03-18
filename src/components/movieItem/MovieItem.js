import React from 'react';

import './MovieItem.css';

export default function MovieItem(props) {
  const { title, description, imageUrl } = props.movie;

  console.log(imageUrl);

  console.log(props.movie);

  return (
    <div className='movie-item'>
      <img src={imageUrl} alt={title} />
      <p className='movie-item__title--eng'>{title}</p>
      <p className='movie-item__title--vn'>{description}</p>
    </div>
  );
}
