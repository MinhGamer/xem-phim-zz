import React from 'react';

import { useHistory } from 'react-router-dom';

import './MovieSeriesDetail.css';

import { API_MOVIE_IMAGE, GENRES_LIST_VN } from '../../shared/util/config';

export default function MovieSeriesDetail(props) {
  const history = useHistory();
  const { series } = props;

  const renderGenres = (genres_ids) => {
    const genresList = genres_ids.map((genres_id) =>
      GENRES_LIST_VN.filter((genres) => genres.id === genres_id.toString())
    );

    return genresList.map((genres) => (
      <span className='series-genres' key={genres[0].id}>
        {genres[0].name}
      </span>
    ));
  };

  const gotoMovieDetailPage = (movieId) => {
    history.push(`/movie/${movieId}`);
  };

  console.log(series);

  return (
    <>
      {series.map((movie) => (
        <>
          <div key={movie.id} className='series-item'>
            <div className='series-detail__image'>
              <img
                onClick={() => gotoMovieDetailPage(movie.id)}
                src={`${API_MOVIE_IMAGE}/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            <div className='series-detail__content'>
              {/* vietnamese title */}
              <p className='series-detail__content-row'>
                <p
                  onClick={() => gotoMovieDetailPage(movie.id)}
                  className='series-title-vn'>
                  {movie.title}
                </p>
                <p>Lượt bình chọn: {movie.vote_count}</p>
              </p>

              {/* original title */}
              <p className='series-detail__content-row'>
                <p
                  onClick={() => gotoMovieDetailPage(movie.id)}
                  className='series-title-en'>
                  {movie.original_title}
                </p>
                <div>
                  <span className='IMDb--icon'>IMDb</span>
                  <span>{movie.vote_average}</span>
                </div>

                {/* <p>{movie.release_date}</p> */}
              </p>
              <p className='series-detail__content-row'>
                <p className='series-description'>{movie.overview}</p>
              </p>
              <p className='series-detail__content-row'>
                <div>{renderGenres(movie.genre_ids)}</div>

                <div>Ngày công chiếu: {movie.release_date}</div>
              </p>
            </div>
          </div>
          <hr />
        </>
      ))}
    </>
  );
}
