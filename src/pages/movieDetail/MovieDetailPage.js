import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Button from '../../shared/components/UI/Button';

import useHttp from '../../shared/customHooks/useHttp';

import './MovieDetailPage.css';

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { sendRequest, isLoading, error, clearError } = useHttp();

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await sendRequest(`/movie/${movieId}`, 'GET');

      console.log(data);
      setMovie(data.movie);
    };

    fetchMovie();
  }, [sendRequest, movieId]);

  //get single movie

  console.log(movie);

  return (
    movie && (
      <div className='movie-detail'>
        {/* background */}
        <div
          style={{
            backgroundImage: `url("${movie.backgroundUrl}")`,
          }}
          className='movie-detail__background-image'></div>

        {/* content */}
        <div className='movie-detail__content'>
          <div className='movie-detail__image'>
            <img src={movie.imageUrl} alt={movie.titleEng} />

            <Button></Button>
          </div>
          <div className='movie-detail__info'>
            <div className='movie-detail__title-eng'></div>
            <div className='movie-detail__title-vn'></div>
            <div className='movie-detail__length'></div>
            <div className='movie-detail__IMDb'></div>
            <div className='movie-detail__social'></div>
            <div className='movie-detail__director'></div>
            <div className='movie-detail__description'></div>
            <div className='movie-detail__casts'></div>
            <div className='movie-detail__trailers'></div>
          </div>
        </div>
      </div>
    )
  );
}
