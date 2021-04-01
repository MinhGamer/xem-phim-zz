import React from 'react';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

function MoviePoster(props) {
  const { onClick } = props;

  return (
    <img
      onClick={onClick}
      src={`${API_MOVIE_IMAGE}/${props.poster_path}`}
      alt={props.original_title}
    />
  );
}

export default React.memo(MoviePoster);
