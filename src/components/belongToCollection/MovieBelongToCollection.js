import React from 'react';
import MoviePoster from '../moviePoster/MoviePoster';

import Button from '../../shared/components/UI/Button';

export default function MovieBelongToCollection(props) {
  const { belongs_to_collection } = props;
  console.log();
  return (
    <>
      <h2> Phim này nằm trong bộ series:</h2>
      <MoviePoster
        poster_path={belongs_to_collection.poster_path}
        alt={belongs_to_collection.name}
      />
      <Button isFull isSecondary>
        <i class='fa fa-play'></i>
        Xem Bộ sưu tập
      </Button>
    </>
  );
}
