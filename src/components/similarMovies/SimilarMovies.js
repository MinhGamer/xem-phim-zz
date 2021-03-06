import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import MovieItem from '../movieItem/MovieItem';

import './SimilarMovies.css';

function SimilarMovies(props) {
  console.log(props.movies);

  return (
    props.movies.length > 0 && (
      <div className='similar-movies-container'>
        <h1 className='similar-movies--title'>Có thể bạn cũng thích</h1>
        <div className='similar-movies'>
          {props.movies.slice(0, 5).map((movie) => (
            <MovieItem type='movie' movie={movie} />
          ))}
        </div>
      </div>
    )
  );
}

export default React.memo(SimilarMovies);
