import React, { useEffect, useContext, useState } from 'react';

import './MovieCollection.css';

import MovieItem from '../../components/movieItem/MovieItem';

import { AuthContext } from '../../shared/context/AuthContext';

import useHttp from '../../shared/customHooks/useHttp';

export default function MovieCollection() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [finishedMovies, setFinishedMovies] = useState([]);
  const auth = useContext(AuthContext);

  const { sendRequest, isLoading, error, clearError } = useHttp();

  useEffect(() => {
    const { finishedList, likedList } = auth.user;

    const fetchMovies = async () => {
      const fetchLikedList = likedList.map((movieId) => {
        return sendRequest(`/movie/${movieId}`);
      });

      const fetchFinishedList = finishedList.map((movieId) => {
        return sendRequest(`/movie/${movieId}`);
      });

      const likedListResponse = await Promise.all(fetchLikedList);

      const finishListRespons = await Promise.all(fetchFinishedList);

      setLikedMovies(likedListResponse);
      setFinishedMovies(finishListRespons);
    };

    fetchMovies();
  }, [auth.user, sendRequest]);

  return (
    <div className='movie-collection'>
      <h1 className='text-center fs-1'>Bộ sưu tập phim của bạn</h1>

      {/* liked movies */}
      <h1 className='fs-1'>Các phim bạn muốn xem:</h1>
      <div className='movie-collection__liked-movies'>
        {likedMovies &&
          likedMovies.map((item) => <MovieItem movie={item.movie} />)}
      </div>

      {/* finished movies */}
      <h1 className='fs-1'>Các phim bạn đã xem:</h1>
      <div className='movie-collection__finished-movies'>
        {finishedMovies &&
          finishedMovies.map((item) => <MovieItem movie={item.movie} />)}
      </div>
    </div>
  );
}
