import React from 'react';
import MoviePoster from '../moviePoster/MoviePoster';

// import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/UI/Button';

import './MovieBelongToCollection.css';

function MovieBelongToCollection(props) {
  const { belongs_to_collection, onClick } = props;

  return (
    belongs_to_collection && (
      <div className='movie-belong-to-collection'>
        <h2 className='movie-belong-to-collection--title'>
          Phim này nằm trong series
        </h2>
        <MoviePoster
          onClick={onClick}
          poster_path={belongs_to_collection.poster_path}
          alt={belongs_to_collection.name}
        />
        <Button onClick={onClick} isFull isSecondary>
          <i class='fa fa-play'></i>
          Xem Bộ sưu tập
        </Button>
      </div>
    )
  );
}

export default React.memo(MovieBelongToCollection);
