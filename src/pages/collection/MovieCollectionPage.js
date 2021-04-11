import React, { useEffect, useContext, useState } from 'react';

import './MovieCollectionPage.css';

import MovieItem from '../../components/movieItem/MovieItem';

import { AuthContext } from '../../shared/context/AuthContext';

import ErrorModal from '../../shared/components/UI/ErrorModal';

import useHttp from '../../shared/customHooks/useHttp';

import { CSSTransition } from 'react-transition-group';

import Slider from 'react-slick';

export default function MovieCollectionPage(props) {
  const [collection, setCollection] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [deleteMovie, setDeleteMovie] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const {
    fetchMoviesByIdList,
    isLoading,
    error,
    clearError,
    sendUser,
  } = useHttp();

  const auth = useContext(AuthContext);

  const username = props.username;

  const fetchCollection = props.collection || auth.user.collection;

  useEffect(() => {
    const fetchMovies = async () => {
      let _collection = await fetchMoviesByIdList(fetchCollection);

      //assign property isDone to collection fetched from db
      _collection = _collection.map((movie) => ({
        ...movie,
        isDone: fetchCollection[movie.id].isDone,
      }));

      setCollection(_collection);
    };

    fetchMovies();
  }, [fetchCollection]);

  const settingsWhislist = {
    //fix bug when number of movies less than 4
    infinite: collection.filter((movie) => !movie.isDone).length > 4,
    // infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    className: 'movie-collection-list',
  };

  const settingsFinishlist = {
    //fix bug when number of movies less than 4
    infinite: collection.filter((movie) => movie.isDone).length > 4,
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
        {activeId === movie.id && !deleteMovie && (
          <CSSTransition
            in={true}
            timeout={800}
            appear
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

        {activeId === movie.id && deleteMovie && (
          <CSSTransition
            unmountOnExit
            in={true}
            timeout={800}
            appear
            onEntered={() => deleveMovieHandler(movie.id)}
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

  const onClickMovieHandler = async (movieId, action) => {
    //when movie go to collection

    // list of Ids
    // authCollection = [
    //  1771: {isDone: true}, => finish list
    // 527774: {isDone: false} => wishlist
    // ]

    // list of movie obj use to render
    //renderCollection = [
    //       {
    //         id: 399566
    // imdb_id: "tt5034838"
    // original_language: "en"
    // original_title: "Godzilla vs. Kong"
    // overview: "Khi
    //       }, ...
    //     ]

    let renderCollection = [...collection];

    const authCollection = auth.user.collection;

    if (action === 'addFavorited' || action === 'addDone') {
      authCollection[movieId] = {
        isDone: action === 'addDone' ? true : false,
      };

      const index = renderCollection.findIndex((movie) => movie.id === movieId);

      if (index === -1) return;

      renderCollection[index].isDone = !renderCollection[index].isDone;

      //add at the begin to see animation
      renderCollection.unshift(renderCollection[index]);
      renderCollection.splice(index + 1, 1);

      setCollection(renderCollection);
    }

    if (action === 'delete') {
      // delete authCollection[movieId];

      // renderCollection = renderCollection.filter(
      //   (movie) => movie.id !== movieId
      // );

      console.log('delete');

      //movie item enter exit phase
      //dont' setCollection here
      setDeleteMovie(true);
    }

    setActiveId(movieId);

    // const data = await sendUser(
    //   'user',
    //   'PATCH',
    //   JSON.stringify({ collection: authCollection }),
    //   {
    //     Authorization: 'Bearer ' + auth.token,
    //   }
    // );

    //if update collection success
    //use to render base on the collection in authContent
  };

  //when user delete a movie =>
  //1. animate movie item first
  //2. then delete from list
  //-> because if we delete movie Id first there is no movie Id to attach to CSSTransition
  const deleveMovieHandler = (movieId) => {
    let renderCollection = [...collection];

    console.log(movieId);

    renderCollection = renderCollection.filter((movie) => movie.id !== movieId);

    delete auth.user.collection[movieId];

    setActiveId(null);
    setDeleteMovie(false);
    setCollection(renderCollection);
  };

  const navTab = [
    {
      label: `Muốn xem (${collection.filter((movie) => !movie.isDone).length})`,
      component: (
        <Slider {...settingsWhislist}>
          {renderMovies(collection.filter((movie) => !movie.isDone))}
        </Slider>
      ),
    },
    {
      label: `Đã xem (${collection.filter((movie) => movie.isDone).length})`,
      component: (
        <Slider {...settingsFinishlist}>
          {renderMovies(collection.filter((movie) => movie.isDone))}
        </Slider>
      ),
    },
  ];

  return (
    <div className='movie-collection'>
      {error && <ErrorModal error={error} clearError={clearError} />}

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
        (navItem, index) => activeTabIndex === index && <>{navItem.component}</>
      )}
    </div>
  );
}
