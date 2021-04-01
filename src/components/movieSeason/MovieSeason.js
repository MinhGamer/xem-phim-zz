import React, { useEffect } from 'react';

import { useHistory, NavLink } from 'react-router-dom';

import MoviePoster from '../moviePoster/MoviePoster';

export default function MovieSeason(props) {
  const { seasons, movieId } = props;
  const history = useHistory();

  const gotoSeasonDetailPage = (season) => {
    history.push(`/tv/${movieId}/season/${season.season_number}`);
  };

  //scroll to top of page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [history.location.pathname]);

  return (
    <>
      <h3 className=''>Seasons</h3>
      {seasons.map(
        (season) =>
          season.season_number > 0 && (
            <>
              <div className='movie-detail__seasons--item'>
                <MoviePoster
                  onClick={() => gotoSeasonDetailPage(season)}
                  poster_path={season.poster_path}
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
      )}
    </>
  );
}
