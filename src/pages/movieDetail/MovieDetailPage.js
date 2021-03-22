import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Button from '../../shared/components/UI/Button';

import useHttp from '../../shared/customHooks/useHttp';

import MovieTrailer from '../../components/movieTrailer/MovieTrailer';

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

  //get single movie

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
              <div className='movie-detail__length'>4 giờ 2 phút</div>

              <div className='movie-detail__IMDb'>
                <span className='movie-detail__IMDb--icon'>IMDb</span>
                8.9
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
                    Zack Snyde
                  </span>
                </p>
                <p>
                  <span className='movie-detail__sub-info--label'>
                    QUỐC GIA
                  </span>
                  <span className='movie-detail__sub-info--value'>Mỹ</span>
                </p>
                <p>
                  <span className='movie-detail__sub-info--label'>
                    KHỞI CHIẾU
                  </span>
                  <span className='movie-detail__sub-info--value'>
                    3/18/2021
                  </span>
                </p>
              </div>

              <div className='movie-detail__description'>
                <p>
                  Để đảm bảo sự hi sinh của Superman không trở thành vô ích,
                  Bruce Wayne liên kết lực lượng với Diana Prince và lên kế
                  hoạch chiêu mộ một đội metahuman để bảo vệ thế giới khỏi mối
                  đe dọa thảm khốc đang đến gần.
                </p>
              </div>

              <div className='movie-detail__casts'></div>

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
