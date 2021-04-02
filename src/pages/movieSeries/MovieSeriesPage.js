import React, { useEffect, useState } from 'react';

import './MovieSeriesPage.css';

import { useHistory, useParams } from 'react-router-dom';

import { CSSTransition } from 'react-transition-group';

import useHttp from '../../shared/customHooks/useHttp';

import { seriesList, API_MOVIE_IMAGE } from '../../shared/util/config';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import MovieList from '../../components/movieList/MovieList';

import MovieSeriesDetail from '../../components/movieSeriesDetail/MovieSeriesDetail';

import './MovieSeriesPage.css';

import Button from '../../shared/components/UI/Button';

import MoviePoster from '../../components/moviePoster/MoviePoster';
import MovieImageSlider from '../../components/movieImageSlider/MovieImageSlider';

export default function MovieSeriesPage() {
  const history = useHistory();

  //use seriesId as a flag to show series detail or series list
  const { seriesId } = useParams();
  const { fetchSeries, isLoading } = useHttp();
  const [series, setSeries] = useState([]);
  const [movieId, setMovieId] = useState(null);
  const [show, setShow] = useState(false);
  const [seriesImages, setSeriesImages] = useState(false);

  useEffect(() => {
    const fetchSeriesData = async () => {
      let fetchedseries = [];
      //if seriesId exist => render series details
      if (seriesId) {
        fetchedseries.push({ id: seriesId });
      } else {
        //seriesList in file config
        //a list of collection give by db
        fetchedseries = seriesList;
      }
      console.log(fetchedseries);

      const data = await fetchSeries(fetchedseries);

      console.log(data);

      setSeries(data);
    };

    fetchSeriesData();
  }, [history.location.pathname]);

  const clickMovieHandler = (clickId) => {
    setShow(true);
    setMovieId(clickId);
  };

  const renderSeriesInfo = () => {
    const singleSeries = series[0];

    return (
      <div
        style={{
          backgroundImage: `url(${API_MOVIE_IMAGE}${singleSeries.backdrop_path})`,
        }}
        className='series-single-item'>
        <div className='series-single-item__poster'>
          <MoviePoster
            onClick={() => setSeriesImages(true)}
            poster_path={singleSeries.poster_path}
          />

          <Button onClick={() => clickMovieHandler(singleSeries.id)} isDarkblue>
            Xem chi tiết
          </Button>
        </div>
        {/* <p
          onClick={() => clickMovieHandler(singleSeries.id)}
          className='series-single-item__name'>
          {singleSeries.name}
        </p> */}
      </div>
    );
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}

      {seriesImages && (
        <MovieImageSlider
          type='slick-type-1'
          onBackdropClick={() => setSeriesImages(false)}
          images={series[0].posters}
        />
      )}

      {series.length > 0 && (
        <div className='series-container'>
          {/* render series list */}
          {!seriesId && (
            <MovieList
              clickMovieHandler={clickMovieHandler}
              type='series'
              movies={series}
            />
          )}

          {/* render series item if only single series */}
          {seriesId && renderSeriesInfo()}

          <CSSTransition
            mountOnEnter
            onEntered={() => setShow(false)}
            onExiting={() =>
              window.scrollTo({
                top: 750,
                behavior: 'smooth',
              })
            }
            in={show}
            timeout={500}
            classNames='fade'>
            <div className='series-list'>
              {series.map(
                (movie) =>
                  movieId === movie.id && (
                    <MovieSeriesDetail series={movie.parts} />
                  )
              )}
            </div>
          </CSSTransition>
        </div>
      )}
    </>
  );
}
