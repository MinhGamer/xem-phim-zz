import React, { useState, useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';

import Button from '../../shared/components/UI/Button';

import useHttp from '../../shared/customHooks/useHttp';

import MovieTrailer from '../../components/movieTrailer/MovieTrailer';
import Slider from '../../shared/components/Slider/Slider';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

import { AuthContext } from '../../shared/context/AuthContext';

import './MovieDetailPage.css';
import Collection from '../../components/collection/Collection';

export default function MovieDetailPage() {
  const auth = useContext(AuthContext);
  const { sendUser } = useHttp();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState('');
  const {
    sendRequest,
    isLoading,
    error,
    clearError,
    fetchMovieDetails,
  } = useHttp();

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await fetchMovieDetails(`movie/${movieId}`, 'GET');

      console.log(data);
      setMovie(data);
    };

    fetchMovie();
  }, [sendRequest, movieId]);

  const convertMovieLength = (runtime) => {
    const minutes = +runtime % 60;
    const hours = Math.floor(+runtime / 60);

    return `${hours} giờ ${minutes} phút`;
  };

  const renderGenres = (genres) => {
    return genres.map((genre) => {
      genre.name = genre.name.replace('Phim', '');

      return (
        <span key={genre.id} className='movie-detail__genres--item'>
          {genre.name}
        </span>
      );
    });
  };

  const renderDirectors = (directors) =>
    directors.map((director, index) =>
      index === directors.length - 1 ? (
        <span>{director} </span>
      ) : (
        <span>{director}, </span>
      )
    );

  const clickCollectionHandler = async (type) => {
    console.log(type, movieId);

    let updateUser;

    if (type === 'wishlist') {
      //wish list
      const updateWhisList = [...auth.user.whisList] || [];

      const index = updateWhisList.findIndsex((mId) => mId === movieId);

      if (index === -1) {
        //add to list
        updateWhisList.push(movieId);
      } else {
        updateWhisList.splice(index, 1);
      }

      console.log(updateWhisList);

      updateUser = {
        whisList: updateWhisList,
        ...updateUser,
      };

      auth.user.whisList = updateWhisList;
    } else {
      //finish list
      const updateFinishList = [...auth.user.finishList] || [];

      const index = updateFinishList.findIndex((mId) => mId === movieId);

      if (index === -1) {
        //add to list
        updateFinishList.push(movieId);
      } else {
        updateFinishList.splice(index, 1);
      }

      updateUser = {
        finishList: updateFinishList,
        ...updateUser,
      };

      auth.user.finishList = updateFinishList;
    }

    console.log(auth.user);

    // const data = await sendUser('user', 'PATCH', JSON.stringify(updateUser), {
    //   Authorization: auth.token,
    // });

    // console.log(data);
  };

  return (
    <>
      {movie && trailer && (
        <MovieTrailer trailer={trailer} backdropClick={() => setTrailer} />
      )}

      {movie && (
        <div className='movie-detail'>
          {/* background */}
          <div
            style={{
              backgroundImage: `url("${API_MOVIE_IMAGE}/${movie.backdrop_path}")`,
            }}
            className='movie-detail__background-image'></div>

          {/* content */}
          <div className='movie-detail__content'>
            <div className='movie-detail__image'>
              <img
                src={`${API_MOVIE_IMAGE}/${movie.poster_path}`}
                alt={movie.original_title}
              />

              <Button isFull isPrimary>
                <i class='fa fa-play'></i>
                Xem phim
              </Button>
            </div>

            <div className='movie-detail__info'>
              <div className='movie-detail__title-eng'>
                {movie.original_title}
              </div>
              <div className='movie-detail__title-vn'>{movie.title}</div>
              <div className='movie-detail__length'>
                {convertMovieLength(movie.runtime)}
              </div>

              <div className='movie-detail__IMDb'>
                <span className='movie-detail__IMDb--icon'>IMDb</span>
                {movie.vote_average}
              </div>

              <div className='movie-detail__wrap-share-genres'>
                <div className='movie-detail__share'>
                  <span className='movie-detail__share--facebook'>
                    <i className='fab fa-facebook'></i>
                    Chia sẻ
                  </span>
                  <span className='movie-detail__share--bookmark'>
                    <Collection onClick={clickCollectionHandler} />
                  </span>
                </div>

                <div className='movie-detail__genres text-right'>
                  {renderGenres(movie.genres)}
                </div>
              </div>

              <div className='movie-detail__sub-info'>
                <p>
                  <span className='movie-detail__sub-info--label'>
                    ĐẠO DIỄN
                  </span>
                  <span className='movie-detail__sub-info--value'>
                    {renderDirectors(movie.directors)}
                  </span>
                </p>
                <p>
                  <span className='movie-detail__sub-info--label'>
                    QUỐC GIA
                  </span>
                  <span className='movie-detail__sub-info--value'>
                    {movie.production_countries}
                  </span>
                </p>
                <p>
                  <span className='movie-detail__sub-info--label'>
                    KHỞI CHIẾU
                  </span>
                  <span className='movie-detail__sub-info--value'>
                    {movie.release_date}
                  </span>
                </p>
              </div>

              <div className='movie-detail__description'>
                <p>{movie.overview}</p>
              </div>

              <div className='movie-detail__casts'>
                <div className='movie-detail__casts--title'>Diễn viên</div>
                <Slider cast={movie.credits.cast.slice(0, 20)} />
              </div>

              <div className='movie-detail__trailers--title'>Trailer</div>
              <div className='movie-detail__trailers'>
                {/* just use for render icon */}
                {movie.videos.results.map((trailer) => (
                  <div
                    onClick={() => setTrailer(trailer)}
                    className='movie-detail__trailers-item'>
                    <iframe
                      src={`https://www.youtube.com/embed/${trailer.key}`}
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
