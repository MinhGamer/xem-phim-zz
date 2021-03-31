import React from 'react';

import MovieItem from '../movieItem/MovieItem';

import './SimilarMovies.css';

export default function SimilarMovies(props) {
  console.log(props.movies);

  return (
    <>
      <h1 className='similar-movies--title'>Có thể bạn cũng thích:</h1>
      <div className='similar-movies'>
        {props.movies.slice(0, 5).map((movie) => (
          <MovieItem type='movie' movie={movie} />
        ))}
      </div>
    </>
  );
}
