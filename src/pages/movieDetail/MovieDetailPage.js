import React, { useState, useEffect, useContext } from 'react';

import { useParams, useHistory, NavLink } from 'react-router-dom';

import Button from '../../shared/components/UI/Button';

import useHttp from '../../shared/customHooks/useHttp';

import MovieTrailer from '../../components/movieTrailer/MovieTrailer';
import Slider from '../../shared/components/Slider/Slider';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

import { AuthContext } from '../../shared/context/AuthContext';

import './MovieDetailPage.css';
import Collection from '../../components/collection/Collection';
import TrailerSlider from '../../components/trailerSlider/TrailerSlider';

export default function MovieDetailPage() {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const type = history.location.pathname.split('/')[1];
  const { sendUser } = useHttp();
  const { movieId, seasonNumber } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState('');
  const {
    sendRequest,
    isLoading,
    error,
    clearError,
    fetchMovieDetails,
    fetchTvDetails,
  } = useHttp();

  //fetch movie when load page
  useEffect(() => {
    console.log(seasonNumber);

    const fetchMovie = async () => {
      let data;

      //tv show
      if (type === 'tv') {
        data = await fetchTvDetails(movieId);
      }

      if (type === 'tv' && seasonNumber) {
        data = await fetchTvDetails(movieId, seasonNumber);
      }

      //movie
      if (type === 'movie') {
        data = await fetchMovieDetails(`${type}/${movieId}`, 'GET');
      }
      //season for tv show

      setMovie(data);
    };

    fetchMovie();
    //movie or tv
  }, [history.location.pathname]);

  const convertMovieLength = (runtime) => {
    const minutes = +runtime % 60;
    const hours = Math.floor(+runtime / 60);

    if (hours <= 0 && type === 'tv') {
      return `${minutes} phút / tập`;
    }

    return `${hours} giờ ${minutes} phút`;
  };

  const gotoHomePage = (genresId) => {
    history.push(`/?with_genres=${genresId}`);
  };

  const renderGenres = (genres) => {
    return genres.map((genre) => {
      genre.name = genre.name.replace('Phim', '');

      return (
        <span
          onClick={() => gotoHomePage(genre.id)}
          key={genre.id}
          className='movie-detail__genres--item'>
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

  const renderSeason = (seasons) => {
    // console.log(seasons);
    const gotoSeasonDetailPage = (season) => {
      history.push(`/tv/${movieId}/season/${season.season_number}`);
    };

    return seasons.map(
      (season) =>
        season.season_number > 0 && (
          <>
            <div className='movie-detail__seasons--item'>
              <img
                onClick={() => gotoSeasonDetailPage(season)}
                src={`${API_MOVIE_IMAGE}/${season.poster_path}`}
                alt='season'
              />
              <p className='movie-detail__seasons--item__content'>
                <NavLink to={`/tv/${movieId}/season/${season.season_number}`}>
                  Season {season.season_number}
                </NavLink>
                <p>Số tập: {season.episode_count}</p>
                <p>Ngày công chiếu: {season.air_date}</p>
              </p>
            </div>
            <hr />
          </>
        )
    );
  };

  const clickCollectionHandler = async (type) => {
    console.log(type, movieId);

    let updateUser;

    if (type === 'wishlist') {
      //wish list
      const updateWhisList = [...auth.user.whisList] || [];

      const index = updateWhisList.findIndex((mId) => mId === movieId);

      if (index === -1) {
        //add to list
        updateWhisList.push(movieId);
      } else {
        updateWhisList.splice(index, 1);
      }

      updateUser = {
        whisList: updateWhisList,
        finishList: auth.user.finishList,
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
        whisList: auth.user.whisList,
      };

      auth.user.finishList = updateFinishList;
    }

    console.log(updateUser);

    const data = await sendUser('user', 'PATCH', JSON.stringify(updateUser), {
      Authorization: 'Bearer ' + auth.token,
    });

    console.log(data);
  };

  console.log(movie);

  return (
    <>
      {/* show trailer with backdrop */}
      {movie && trailer && (
        <MovieTrailer
          trailer={trailer}
          backdropClick={() => setTrailer(null)}
        />
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
                {movie.original_title || movie.original_name}
              </div>
              <div className='movie-detail__title-vn'>
                {movie.title || movie.name}
              </div>

              <div className='movie-detail__length'>
                {convertMovieLength(movie.runtime || movie.episode_run_time)}
              </div>

              {movie.number_of_seasons && (
                <div className='movie-detail__season'>
                  {movie.number_of_seasons || ''} seasons
                </div>
              )}

              {movie.number_of_episodes && (
                <div className='movie-detail__season'>
                  {movie.number_of_episodes || ''} tập
                </div>
              )}

              <div className='movie-detail__IMDb'>
                <span className='IMDb--icon'>IMDb</span>
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
                    {movie.production_countries || movie.origin_country}
                  </span>
                </p>
                <p>
                  <span className='movie-detail__sub-info--label'>
                    KHỞI CHIẾU
                  </span>
                  <span className='movie-detail__sub-info--value'>
                    {movie.release_date ||
                      movie.air_date ||
                      movie.first_air_date}
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

              {/* just use for render icon */}
              <div className='movie-detail__trailers'>
                <TrailerSlider
                  onClickTrailer={setTrailer}
                  trailers={movie.videos.results}
                />
              </div>

              {movie.seasons && (
                <>
                  <div>Seasons</div>
                  <div className='movie-detail__seasons'>
                    {renderSeason(movie.seasons)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
