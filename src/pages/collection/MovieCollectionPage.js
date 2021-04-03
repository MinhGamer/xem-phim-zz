import React, { useEffect, useContext, useState } from 'react';

import './MovieCollectionPage.css';

import MovieItem from '../../components/movieItem/MovieItem';

import { AuthContext } from '../../shared/context/AuthContext';

import ErrorModal from '../../shared/components/UI/ErrorModal';

import useHttp from '../../shared/customHooks/useHttp';

export default function MovieCollectionPage() {
  // const [likedMovies, setLikedMovies] = useState([]);
  const [collection, setCollection] = useState([]);

  const auth = useContext(AuthContext);

  const authCollection = auth.user.collection;

  const { fetchMoviesByIdList, isLoading, error, clearError } = useHttp();

  useEffect(() => {
    const fetchMovies = async () => {
      let _collection = await fetchMoviesByIdList(authCollection);

      //assign property isDone to collection fetched from db
      _collection = _collection.map((movie) => ({
        ...movie,
        isDone: authCollection[movie.id].isDone,
      }));

      setCollection(_collection);
    };

    fetchMovies();
  }, [auth.user, fetchMoviesByIdList]);

  const renderMovies = (collection) => {
    if (!collection || collection.length === 0) {
      return (
        !isLoading && (
          <h1>
            Bạn chưa có phim nào. Hãy thêm phim vào danh sách để thưởng thức
          </h1>
        )
      );
    }

    return collection.map((movie) => (
      <>
        <MovieItem type='movie' key={movie.id} movie={movie} />
      </>
    ));
  };

  return (
    <div className='movie-collection'>
      {error && <ErrorModal error={error} clearError={clearError} />}

      <h1 className='text-center fs-1'>Bộ sưu tập phim của bạn</h1>

      <h1 className='fs-1'>Các phim bạn muốn xem:</h1>
      <div className='movie-collection__liked-movies'>
        {renderMovies(collection.filter((movie) => !movie.isDone))}
      </div>

      <h1 className='fs-1'>Các phim bạn đã xem:</h1>
      <div className='movie-collection__finished-movies'>
        {renderMovies(collection.filter((movie) => movie.isDone))}
      </div>
    </div>
  );
}
