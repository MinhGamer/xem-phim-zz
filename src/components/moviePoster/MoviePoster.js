import React from 'react';

import {
  API_MOVIE_IMAGE,
  API_MOVIE_IMAGE_CUSTOM,
} from '../../shared/util/config';

function MoviePoster(props) {
  const { onClick } = props;

  return (
    <img
      onClick={onClick}
      src={`${API_MOVIE_IMAGE_CUSTOM}/w342/${props.poster_path}`}
      alt={props.original_title}
    />
  );
}

export default React.memo(MoviePoster);
