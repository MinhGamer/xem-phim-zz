import React, { useState, useEffect, useContext } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import Button from '../../shared/components/UI/Button';

import useHttp from '../../shared/customHooks/useHttp';

import MovieTrailer from '../../components/movieTrailer/MovieTrailer';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

import { AuthContext } from '../../shared/context/AuthContext';

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

export default function MovieDetailPage() {
  const auth = useContext(AuthContext);

  const history = useHistory();
  const type = history.location.pathname.split('/')[1];
  const { movieId, seasonNumber } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [trailer, setTrailer] = useState('');
  const [movieImages, setMovieImages] = useState(null);

  const {
    isLoading,
    error,
    clearError,
    fetchMovieDetails,
    fetchSimilarMovies,
    fetchTvDetails,
  } = useHttp();

  //fetch movie when load page
  useEffect(() => {
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

        const similarM = await fetchSimilarMovies(movieId);

        console.log(similarM);
        setSimilarMovies(similarM);
      }
      //season for tv show

      setMovie(data);
    };

    fetchMovie();
    //movie or tv
  }, [history.location.pathname]);

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

      {movieImages && (
        <MovieImageSlider
          onBackdropClick={() => setMovieImages(null)}
          images={movie.images}
        />
      )}

      {movie && (
        <>
          {isLoading && <LoadingSpinner />}
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
                <MoviePoster
                  onClick={() => setMovieImages(true)}
                  poster_path={movie.poster_path}
                  alt={movie.original_title}
                />

                <Button isFull isPrimary>
                  <i class='fa fa-play'></i>
                  Xem phim
                </Button>

                {movie.belongs_to_collection && (
                  <div className='movie-detail__collection'>
                    <MovieBelongToCollection
                      belongs_to_collection={movie.belongs_to_collection}
                    />
                  </div>
                )}
              </div>

              <div className='movie-detail__info'>
                {movie && <MovieInfo movie={movie} />}

                <div className='movie-detail__casts'>
                  <div className='movie-detail__casts--title'>Diễn viên</div>
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

                {movie.seasons && (
                  <div className='movie-detail__seasons'>
                    <MovieSeason movieId={movieId} seasons={movie.seasons} />
                  </div>
                )}
              </div>

              {similarMovies && (
                <div className='movie-detail__similar-movies'>
                  <SimilarMovies movies={similarMovies} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
