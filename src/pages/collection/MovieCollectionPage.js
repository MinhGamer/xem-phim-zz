import React, { useEffect, useContext, useState } from 'react';

import './MovieCollectionPage.css';

import MovieItem from '../../components/movieItem/MovieItem';

import { CSSTransition } from 'react-transition-group';

import Slider from 'react-slick';
import { connect } from 'react-redux';

import * as actionTypes from '../../redux/actionTypes/actionTypes';

import { actUpdateMovieCollection } from '../../redux/actionCreator/userActions';

function MovieCollectionPage(props) {
  const [activeId, setActiveId] = useState(null);
  const [deleteMovie, setDeleteMovie] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const {
    user,
    username,
    isLoading,
    collection,
    toggleMovieInCollection,
    removeMovieFromCollection,
  } = props;

  const collectionArr = Object.values(collection || user.collection);

  const settingsWhislist = {
    //fix bug when number of movies less than 4
    infinite:
      collectionArr &&
      collectionArr.filter((movie) => !movie.isDone).length > 4,
    // infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    className: 'movie-collection-list',
  };

  const settingsFinishlist = {
    //fix bug when number of movies less than 4
    infinite:
      collectionArr && collectionArr.filter((movie) => movie.isDone).length > 4,
    // infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    className: 'movie-collection-list',
  };

  const renderMovies = (_collection) => {
    if (!_collection || _collection.length === 0) {
      return (
        !isLoading && (
          <h1 className='movie-collection__no-movies'>
            Bạn chưa có phim nào. Hãy thêm phim vào danh sách để thưởng thức
          </h1>
        )
      );
    }

    return _collection.map((movie) => (
      <>
        {/* animation enter */}
        {activeId === movie.id && !deleteMovie && (
          <CSSTransition
            in={true}
            timeout={800}
            appear
            // onEntering={() => setDeleteMovie(false)}
            classNames={'fade-on-top'}>
            <MovieItem
              isEdit
              clickMovieHandler={onClickMovieHandler}
              isAlreadyWatchced={movie.isDone}
              type='movie'
              key={movie.id}
              movie={movie}
            />
          </CSSTransition>
        )}

        {/* animation exit */}
        {activeId === movie.id && deleteMovie && (
          <CSSTransition
            in={deleteMovie}
            timeout={800}
            appear
            onEntered={() => deleteMovieHandler(movie)}
            classNames={'fade-on-top--delete'}>
            <MovieItem
              isEdit
              clickMovieHandler={onClickMovieHandler}
              isAlreadyWatchced={movie.isDone}
              type='movie'
              key={movie.id}
              movie={movie}
            />
          </CSSTransition>
        )}

        {/* other item */}
        {activeId !== movie.id && (
          <MovieItem
            isEdit
            clickMovieHandler={onClickMovieHandler}
            isAlreadyWatchced={movie.isDone}
            type='movie'
            key={movie.id}
            movie={movie}
          />
        )}
      </>
    ));
  };

  const onClickMovieHandler = async (movie, action) => {
    if (action === 'addFavorited' || action === 'addDone') {
      setDeleteMovie(false);
      toggleMovieInCollection(movie);
    }

    if (action === 'delete') {
      //create animation
      setDeleteMovie(true);
    }

    setActiveId(movie.id);
  };

  //when user delete a movie =>
  //1. animate movie item first
  //2. then delete from list
  //-> because if we delete movie Id first there is no movie Id to attach to CSSTransition
  const deleteMovieHandler = (movie) => {
    // setActiveId(null);
    removeMovieFromCollection(movie);
    // setDeleteMovie(false);
  };

  const navTab = [
    {
      label: `Muốn xem (${
        collectionArr.filter((movie) => !movie.isDone).length
      })`,
      component: (
        <Slider {...settingsWhislist}>
          {collectionArr &&
            renderMovies(collectionArr.filter((movie) => !movie.isDone))}
        </Slider>
      ),
    },
    {
      label: `Đã xem (${
        collectionArr && collectionArr.filter((movie) => movie.isDone).length
      })`,
      component: (
        <Slider {...settingsFinishlist}>
          {renderMovies(collectionArr.filter((movie) => movie.isDone))}
        </Slider>
      ),
    },
  ];

  return (
    collectionArr && (
      <div className='movie-collection'>
        <div className='collection-header'>
          Bộ sưu tập phim của <span>{username ? username : 'bạn'}</span>
        </div>

        <div className='movie-collection-navtab '>
          {navTab.map((navItem, index) => (
            <div
              onClick={() => setActiveTabIndex(index)}
              className={`movie-collection__title ${
                activeTabIndex === index ? 'navtab-active' : ''
              }`}>
              {navItem.label}
            </div>
          ))}
        </div>

        {navTab.map(
          (navItem, index) =>
            activeTabIndex === index && <>{navItem.component}</>
        )}
      </div>
    )
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    isLoading: state.userReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMovieInCollection: (movie) =>
      dispatch(
        actUpdateMovieCollection(actionTypes.TOGGLE_MOVIE_IN_COLLECTION, movie)
      ),

    removeMovieFromCollection: (movie) =>
      dispatch(
        actUpdateMovieCollection(
          actionTypes.REMOVIE_MOVIE_FROM_COLLECTION,
          movie
        )
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieCollectionPage);
