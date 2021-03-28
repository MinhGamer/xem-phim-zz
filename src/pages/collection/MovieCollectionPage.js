import React, { useEffect, useContext, useState } from 'react';

import './MovieCollectionPage.css';

import MovieItem from '../../components/movieItem/MovieItem';

import { AuthContext } from '../../shared/context/AuthContext';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ErrorModal from '../../shared/components/UI/ErrorModal';

import useHttp from '../../shared/customHooks/useHttp';

export default function MovieCollectionPage() {
  // const [likedMovies, setLikedMovies] = useState([]);
  const [whisedList, setWishedList] = useState([]);
  const [finishedList, setFinishedList] = useState([]);
  const auth = useContext(AuthContext);

  const { fetchMoviesByIdList, isLoading, error, clearError } = useHttp();

  useEffect(() => {
    const { finishList, whisList } = auth.user;

    const fetchMovies = async () => {
      const whisListResults = await fetchMoviesByIdList(whisList);

      const finishListResults = await fetchMoviesByIdList(finishList);

      setFinishedList(finishListResults);
      setWishedList(whisListResults);
    };

    fetchMovies();
  }, [auth.user, fetchMoviesByIdList]);

  const renderMovies = (movies) => {
    if (!movies || movies.length === 0) {
      return (
        !isLoading && (
          <h1>
            Bạn chưa có phim nào. Hãy thêm phim vào danh sách để thưởng thức
          </h1>
        )
      );
    }

    return movies.map((movie) => (
      <>{!isLoading && <MovieItem key={movie.id} movie={movie} />}</>
    ));
  };

  return (
    <div className='movie-collection'>
      {error && <ErrorModal error={error} clearError={clearError} />}

      <h1 className='text-center fs-1'>Bộ sưu tập phim của bạn</h1>

      {/* liked movies */}
      <h1 className='fs-1'>Các phim bạn muốn xem:</h1>
      <div className='movie-collection__liked-movies'>
        {isLoading && <LoadingSpinner />}
        {renderMovies(whisedList)}
      </div>

      {/* finished movies */}
      <h1 className='fs-1'>Các phim bạn đã xem:</h1>
      <div className='movie-collection__finished-movies'>
        {isLoading && <LoadingSpinner />}
        {renderMovies(finishedList)}
      </div>
    </div>
  );
}
