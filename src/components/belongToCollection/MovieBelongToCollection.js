import React from 'react';
import MoviePoster from '../moviePoster/MoviePoster';

import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/UI/Button';

function MovieBelongToCollection(props) {
  const { belongs_to_collection } = props;
  const history = useHistory();

  console.log(belongs_to_collection);

  return (
    belongs_to_collection && (
      <div className='movie-belong-to-collection'>
        <h2> Phim này nằm trong bộ series:</h2>
        <MoviePoster
          onClick={() => history.push(`/series/${belongs_to_collection.id}`)}
          poster_path={belongs_to_collection.poster_path}
          alt={belongs_to_collection.name}
        />
        <Button isFull isSecondary>
          <i class='fa fa-play'></i>
          Xem Bộ sưu tập
        </Button>
      </div>
    )
  );
}

export default React.memo(MovieBelongToCollection);
