import React from 'react';

import MovieItem from '../movieItem/MovieItem';

import './MovieList.css';

export default function MovieList(props) {
  const { movies } = props;

  return (
    <div className='movie-list'>
      {movies.map((movie) => (
        <MovieItem movie={movie} />
      ))}
    </div>
  );
}
