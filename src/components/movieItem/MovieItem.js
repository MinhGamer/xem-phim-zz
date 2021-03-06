import React, { useState, useRef, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import LazyLoad from 'react-lazyload';

import { API_MOVIE_IMAGE_CUSTOM } from '../../shared/util/config';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import './MovieItem.css';
import CardMovieDetail from '../cardMovieDetail/CardMovieDetail';

import { CSSTransition } from 'react-transition-group';

function MovieItem(props) {
  const {
    type,
    clickMovieHandler,
    isAlreadyWatchced,
    isEdit,
    noCardDetails,
  } = props;

  const {
    id,
    original_title,
    title,
    poster_path,
    name,
    original_name,
    backdrop_path,
  } = props.movie;

  const movieRef = useRef();

  useEffect(() => {}, []);

  const [showCardMovie, setShowCardMovie] = useState(false);
  const [cardMovieRight, setCardMovieRight] = useState(false);

  const history = useHistory();

  const imageUrl = `${API_MOVIE_IMAGE_CUSTOM}/w342/${
    poster_path || backdrop_path
  }`;

  const gotoMovieDetailPage = () => {
    history.push(`/${type}/${id}`);
  };

  const onClickMovieHandler = () => {
    if (type === 'series') {
      return clickMovieHandler(id);
    }

    //default behavior
    return gotoMovieDetailPage();
  };

  const onClickMovieEdit = (e, action) => {
    e.stopPropagation();

    clickMovieHandler(props.movie, action);
  };

  const mouseEnterMovieHandler = () => {
    // console.log(movieRef.current.getBoundingClientRect().x);
    const movieXAxiosPosition = movieRef.current.getBoundingClientRect().x;

    //check if movie item in the left or right of screen
    movieXAxiosPosition < window.innerWidth / 2
      ? setCardMovieRight(true)
      : setCardMovieRight(false);

    setShowCardMovie(true);
  };

  const renderMovie = () => {
    return (
      <div
        onMouseLeave={() => setShowCardMovie(false)}
        onMouseEnter={mouseEnterMovieHandler}
        ref={movieRef}
        className={`${!isEdit ? '' : 'movie-item'}`}>
        {/* when user hover to movie Item at homepage */}

        {!noCardDetails && (
          <CSSTransition
            in={showCardMovie}
            timeout={500}
            mountOnEnter
            unmountOnExit
            classNames={'fade-on-left'}>
            <CardMovieDetail
              onBackdropClick={() => setShowCardMovie(false)}
              cardMovieRight={cardMovieRight}
              movie={props.movie}
            />
          </CSSTransition>
        )}

        <div
          onClick={() => onClickMovieHandler()}
          className='movie-item__image'>
          {isEdit && (
            <div className='movie-item__edit'>
              {isAlreadyWatchced && (
                <div
                  onClick={(e) => onClickMovieEdit(e, 'addFavorited')}
                  className='collection-wishlist'>
                  <i class='fa fa-eye '></i>
                  <span>Mu???n xem l???i</span>
                </div>
              )}

              {!isAlreadyWatchced && (
                <div
                  onClick={(e) => onClickMovieEdit(e, 'addDone')}
                  className='collection-done'>
                  <i class='fa fa-check '></i>
                  <span>???? xem xong</span>
                </div>
              )}

              <div
                onClick={(e) => onClickMovieEdit(e, 'delete')}
                className='collection-delete'>
                <i class='fa fa-trash '></i>
                <span>Xo??</span>
              </div>
            </div>
          )}

          <img src={imageUrl} alt={original_title} />

          <div className='movie-item__play-icon'>
            {!isEdit && <i className='fa fa-play '></i>}
          </div>
        </div>

        <p className='movie-item__title--vn'>{title || name}</p>

        {!props.noVnTitle && (
          <p className='movie-item__title--eng'>
            {original_title || original_name}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      {poster_path && !isEdit && (
        <LazyLoad
          once
          offset={[300, 300]}
          height={600}
          key={id}
          placeholder={<LoadingSpinner />}
          className='movie-item'>
          {renderMovie()}
        </LazyLoad>
      )}

      {poster_path && isEdit && renderMovie()}
    </>
  );
}

export default MovieItem;
