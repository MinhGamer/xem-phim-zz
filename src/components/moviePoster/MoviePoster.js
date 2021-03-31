import React from 'react';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

export default function MoviePoster(props) {
  return (
    <img
      src={`${API_MOVIE_IMAGE}/${props.poster_path}`}
      alt={props.original_title}
    />
  );
}
