import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import Button from '../../shared/components/UI/Button';

import useHttp from '../../shared/customHooks/useHttp';

import { CSSTransition } from 'react-transition-group';

import MovieTrailer from '../../components/movieTrailer/MovieTrailer';

import { API_MOVIE_IMAGE_CUSTOM } from '../../shared/util/config';

import './MovieDetailPage.css';

import TrailerSlider from '../../components/trailerSlider/TrailerSlider';
import SimilarMovies from '../../components/similarMovies/SimilarMovies';
import MoviePoster from '../../components/moviePoster/MoviePoster';
import MovieBelongToCollection from '../../components/belongToCollection/MovieBelongToCollection';
import MovieInfo from '../../components/movieInfo/MovieInfo';
import CastSlider from '../../components/castSlider/CastSlider';
import MovieSeason from '../../components/movieSeason/MovieSeason';
import MovieImageSlider from '../../components/movieImageSlider/MovieImageSlider';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ProductionCompany from '../../components/productionCompany/ProductionCompany';

import Modal from '../../shared/components/UI/Modal';
import { connect } from 'react-redux';
import MovieSeriesDetail from '../../components/movieSeriesDetail/MovieSeriesDetail';
import Comments from '../../components/comments/Comments';

import { actGetMovieDetail } from '../../redux/actionCreator/movieActions';

function MovieDetailPage(props) {
  const history = useHistory();
  const type = history.location.pathname.split('/')[1];
  const { movieId, seasonNumber } = useParams();
  const [movie, setMovie] = useState(null);
  const [series, setSeries] = useState(null);
  const [showSeries, setShowSeries] = useState(true);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [trailer, setTrailer] = useState('');
  const [movieImages, setMovieImages] = useState(null);

  const {
    isLoading,
    fetchMovieDetails,
    fetchSimilarMovies,
    fetchTvDetails,
    fetchSeries,
  } = useHttp();

  const { movieDetail, getMovieDetail } = props;

  //fetch movie when load page
  useEffect(() => {
    const fetchMovie = async () => {
      let data;

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

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

        const similarM = await fetchSimilarMovies(movieId);

        setSimilarMovies(similarM);
      }
      //season for tv show

      setMovie(data);

      //scroll to top of page
    };

    fetchMovie();
    //movie or tv
  }, [history.location.pathname]);

  useEffect(() => {
    getMovieDetail(movieId);
  }, []);

  let isAllowedToDisplay =
    !movieDetail || !movieDetail.allowedToDisplay
      ? true
      : movieDetail.allowedToDisplay;

  const clickSeriesHandler = async (seriesId) => {
    let fetchedseries = [{ id: seriesId }];

    const data = await fetchSeries(fetchedseries);

    window.scrollTo({
      top: 1500,
      behavior: 'smooth',
    });
    setSeries(data[0]);
    setShowSeries(true);
  };

  return (
    <>
      {/* show when admin un-displayed movie */}
      {!isAllowedToDisplay && (
        <Modal className='modal-control-display-movie' showed={true}>
          <div>
            Phim ??ang ???????c qu???n tr??? vi??n x??? l??, b???n vui l??ng quay l???i sau
          </div>
        </Modal>
      )}

      {/* show trailer with backdrop */}
      {movie && trailer && (
        <MovieTrailer
          trailer={trailer}
          backdropClick={() => setTrailer(null)}
        />
      )}

      {movieImages && (
        <MovieImageSlider
          type='slick-type-2'
          onBackdropClick={() => setMovieImages(null)}
          images={movie.images}
        />
      )}

      {isLoading && <LoadingSpinner asOverlay />}

      {movie && (
        <>
          <div className='movie-detail-container'>
            {/* background */}
            {isLoading && <LoadingSpinner />}
            <div
              style={{
                backgroundImage: `url("${API_MOVIE_IMAGE_CUSTOM}/w1280/${movie.backdrop_path}")`,
              }}
              className='movie-detail__background-image'></div>
            {/* content */}
            <div className='movie-detail__content'>
              <div className='movie-detail__image'>
                <div className='movie-detail__poster'>
                  <MoviePoster
                    onClick={() => setMovieImages(true)}
                    poster_path={movie.poster_path}
                    alt={movie.original_title}
                  />

                  <Button isFull isPrimary>
                    <i class='fa fa-play'></i>
                    Xem phim
                  </Button>
                </div>

                {movie.belongs_to_collection && (
                  <div className='movie-detail__collection'>
                    <MovieBelongToCollection
                      onClick={() =>
                        clickSeriesHandler(movie.belongs_to_collection.id)
                      }
                      belongs_to_collection={movie.belongs_to_collection}
                    />
                  </div>
                )}
              </div>

              <div className='movie-detail__info'>
                {movie && <MovieInfo movieId={movieId} movie={movie} />}

                <div className='movie-detail__casts'>
                  <div className='movie-detail__casts--title'>S???n xu???t</div>
                  <ProductionCompany companies={movie.production_companies} />
                  {/* <CastSlider cast={movie.credits.cast.slice(0, 20)} /> */}
                </div>

                <div className='movie-detail__casts'>
                  <div className='movie-detail__casts--title'>Di???n vi??n</div>
                  <CastSlider cast={movie.credits.cast.slice(0, 20)} />
                </div>

                <div className='movie-detail__trailers--title'>Trailer</div>

                {/* just use for render icon */}
                <div className='movie-detail__trailers'>
                  <TrailerSlider
                    onClickTrailer={setTrailer}
                    trailers={movie.videos.results}
                  />
                </div>
              </div>

              {movie.seasons && (
                <div className='movie-detail__seasons'>
                  <MovieSeason movieId={movieId} seasons={movie.seasons} />
                </div>
              )}
            </div>

            {series && movie.belongs_to_collection && (
              <div className='movie-detail__series'>
                {!showSeries && (
                  <Button onClick={() => setShowSeries(true)} isPrimary>
                    Chi ti???t series
                  </Button>
                )}
                {showSeries && (
                  <div
                    onClick={() => setShowSeries(false)}
                    className='movie-detail__series icon-config'>
                    <span>????ng</span>
                    <i class='fa fa-chevron-down'></i>
                  </div>
                )}

                <CSSTransition
                  mountOnEnter
                  unmountOnExit
                  in={showSeries}
                  timeout={700}
                  classNames='fade'>
                  <div>
                    <MovieSeriesDetail series={series.parts} />
                  </div>
                </CSSTransition>
              </div>
            )}
            {similarMovies && (
              <div className='movie-detail__similar-movies'>
                <SimilarMovies movies={similarMovies} />
              </div>
            )}

            <div className='movie-detail__comments'>
              <Comments movie={movie} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movieDetail: state.movieReducer.movieDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMovieDetail: (movieId) => dispatch(actGetMovieDetail(movieId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailPage);
