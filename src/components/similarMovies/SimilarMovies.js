import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import MovieItem from '../movieItem/MovieItem';

import './SimilarMovies.css';

function SimilarMovies(props) {
  const history = useHistory();
  console.log(props.movies);

  //scroll to top of page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [history.location.pathname]);

  return (
    props.movies.length > 0 && (
      <>
        <h1 className='similar-movies--title'>Có thể bạn cũng thích:</h1>
        <div className='similar-movies'>
          {props.movies.slice(0, 5).map((movie) => (
            <MovieItem type='movie' movie={movie} />
          ))}
        </div>
      </>
    )
  );
}

export default React.memo(SimilarMovies);
