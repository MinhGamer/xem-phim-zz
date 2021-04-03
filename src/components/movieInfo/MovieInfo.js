import React, { useContext, useCallback } from 'react';

import { LANGUAGE_LIST_VN } from '../../shared/util/config';

import { useHistory, useParams } from 'react-router-dom';

import useHttp from '../../shared/customHooks/useHttp';

import { AuthContext } from '../../shared/context/AuthContext';

import Collection from '../collection/Collection';

function MovieInfo(props) {
  const { movie, movieId } = props;
  const history = useHistory();
  const type = history.location.pathname.split('/')[1];
  const { sendUser } = useHttp();

  const auth = useContext(AuthContext);

  const convertMovieLength = useCallback(
    (runtime) => {
      const minutes = +runtime % 60;
      const hours = Math.floor(+runtime / 60);

      if (hours <= 0 && type === 'tv') {
        return `${minutes} phút / tập`;
      }

      return `${hours} giờ ${minutes} phút`;
    },
    [movieId]
  );

  const gotoHomePageToFilter = (type, value) => {
    switch (type) {
      case 'year':
        history.push(`/?primary_release_year=${value}`);
        break;

      case 'genres':
        history.push(`/?with_genres=${value}`);
        break;

      case 'language':
        history.push(`/?with_original_language=${value}`);
        break;

      default:
    }
  };

  const renderGenres = (genres) => {
    return genres.map((genre) => {
      genre.name = genre.name.replace('Phim', '');

      return (
        <span
          onClick={() => gotoHomePageToFilter('genres', genre.id)}
          key={genre.id}
          className='movie-detail__genres--item'>
          {genre.name}
        </span>
      );
    });
  };

  const renderDirectors = (directors) => {
    //may render many director
    return directors.map((director, index) =>
      index === directors.length - 1 ? (
        <span onClick={() => gotoPersonPage(director.id)}>{director.name}</span>
      ) : (
        <span onClick={() => gotoPersonPage(director.id)}>
          {director.name},
        </span>
      )
    );
  };

  const gotoPersonPage = (personId) => {
    history.push(`/person/${personId}`);
  };

  const clickCollectionHandler = async (movieIsDone) => {
    //when movie go to collection
    // colletec: array = [
    //  1771: {isDone: true}, => finish list
    // 527774: {isDone: false} => wishlist
    // ]

    auth.user.collection[movieId] = { isDone: movieIsDone };

    const updateMovie = {
      [movieId]: { isDone: movieIsDone },
    };

    const data = await sendUser('user', 'PATCH', JSON.stringify(updateMovie), {
      Authorization: 'Bearer ' + auth.token,
    });
    console.log(data);
  };

  const renderLanguge = (langugeId) => {
    const index = LANGUAGE_LIST_VN.findIndex(
      (languge) => languge.id === langugeId
    );

    if (index === -1) return;

    return LANGUAGE_LIST_VN[index].name;
  };

  return (
    <div>
      <div className='movie-detail__title-eng'>
        {movie.original_title || movie.original_name}
      </div>
      <div className='movie-detail__title-vn'>
        {movie.title || movie.name} (
        <span
          onClick={() =>
            gotoHomePageToFilter('year', movie.release_date.split('-')[0])
          }
          className='movie-detail__title--year'>
          {movie.release_date.split('-')[0]}
          {/*release year */}
        </span>
        )
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
            <Collection
              status={(auth.user && auth.user.collection[movieId]) || null}
              onClick={clickCollectionHandler}
            />
          </span>
        </div>

        <div className='movie-detail__genres text-right'>
          {renderGenres(movie.genres)}
        </div>
      </div>

      <div className='movie-detail__sub-info'>
        <p>
          <span className='movie-detail__sub-info--label'>ĐẠO DIỄN</span>
          <span className='movie-detail__sub-info--value movie-detail__sub-info--directors'>
            {renderDirectors(movie.directors)}
          </span>
        </p>
        {movie.original_language && (
          <p>
            <span className='movie-detail__sub-info--label'>NGÔN NGỮ</span>
            <span className='movie-detail__sub-info--value'>
              {/* {movie.original_language || movie.origin_country} */}
              <span
                onClick={() =>
                  gotoHomePageToFilter('language', movie.original_language)
                }
                className='movie-detail__sub-info--language'>
                {renderLanguge(movie.original_language)}
              </span>
            </span>
          </p>
        )}
        <p>
          <span className='movie-detail__sub-info--label'>KHỞI CHIẾU</span>
          <span className='movie-detail__sub-info--value'>
            {movie.release_date || movie.air_date || movie.first_air_date}
          </span>
        </p>
      </div>

      <div className='movie-detail__description'>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}

export default React.memo(MovieInfo);
