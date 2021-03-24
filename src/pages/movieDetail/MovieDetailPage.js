import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Button from '../../shared/components/UI/Button';

import useHttp from '../../shared/customHooks/useHttp';

import MovieTrailer from '../../components/movieTrailer/MovieTrailer';
import Slider from '../../shared/components/Slider/Slider';

import './MovieDetailPage.css';

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState('');
  const { sendRequest, isLoading, error, clearError } = useHttp();

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await sendRequest(`/movie/${movieId}`, 'GET');

      console.log(data);
      setMovie(data.movie);
    };

    fetchMovie();
  }, [sendRequest, movieId]);

  const convertMovieLength = () => {
    const { length } = movie;

    const minutes = +length % 60;
    const hours = Math.floor(+length / 60);

    return `${hours} giờ ${minutes} phút`;
  };

  return (
    <>
      {movie && trailer && (
        <MovieTrailer trailer={trailer} backdropClick={() => setTrailer('')} />
      )}

      {movie && (
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

              <Button isFull isPrimary>
                <i class='fa fa-play'></i>
                Xem phim
              </Button>
            </div>
            <div className='movie-detail__info'>
              <div className='movie-detail__title-eng'>{movie.titleEng}</div>
              <div className='movie-detail__title-vn'>{movie.titleVn}</div>
              <div className='movie-detail__length'>{convertMovieLength()}</div>

              <div className='movie-detail__IMDb'>
                <span className='movie-detail__IMDb--icon'>IMDb</span>
                {movie.imdb}
              </div>

              <div className='movie-detail__share'>
                <span className='movie-detail__share--facebook'>
                  <i className='fab fa-facebook'></i>
                  Chia sẻ
                </span>
                <span className='movie-detail__share--bookmark'>
                  <i className='fa fa-bookmark'></i>
                  Bộ sưu tập
                </span>
              </div>

              <div className='movie-detail__sub-info'>
                <p>
                  <span className='movie-detail__sub-info--label'>
                    ĐẠO DIỄN
                  </span>
                  <span className='movie-detail__sub-info--value'>
                    {movie.director}
                  </span>
                </p>
                <p>
                  <span className='movie-detail__sub-info--label'>
                    QUỐC GIA
                  </span>
                  <span className='movie-detail__sub-info--value'>
                    {movie.nation}
                  </span>
                </p>
                <p>
                  <span className='movie-detail__sub-info--label'>
                    KHỞI CHIẾU
                  </span>
                  <span className='movie-detail__sub-info--value'>
                    {movie.openingDay}
                  </span>
                </p>
              </div>

              <div className='movie-detail__description'>
                <p>{movie.description}</p>
              </div>

              <div className='movie-detail__casts'>
                <div className='movie-detail__casts--title'>Diễn viên</div>
                <Slider />
              </div>

              <div className='movie-detail__trailers--title'>Trailer</div>
              <div className='movie-detail__trailers'>
                {movie.trailers.map((trailer) => (
                  <div
                    onClick={() => setTrailer(trailer)}
                    className='movie-detail__trailers-item'>
                    <iframe
                      src={trailer}
                      title='YouTube video player'
                      frameborder='0'></iframe>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
