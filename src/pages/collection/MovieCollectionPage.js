import React, { useEffect, useContext, useState } from 'react';

import './MovieCollectionPage.css';

import MovieItem from '../../components/movieItem/MovieItem';

import { AuthContext } from '../../shared/context/AuthContext';

import ErrorModal from '../../shared/components/UI/ErrorModal';

import useHttp from '../../shared/customHooks/useHttp';

export default function MovieCollectionPage() {
  // const [likedMovies, setLikedMovies] = useState([]);
  const [collection, setCollection] = useState([]);

  const auth = useContext(AuthContext);

  const authCollection = auth.user.collection;

  const {
    fetchMoviesByIdList,
    isLoading,
    error,
    clearError,
    sendUser,
  } = useHttp();

  useEffect(() => {
    const fetchMovies = async () => {
      let _collection = await fetchMoviesByIdList(authCollection);

      //assign property isDone to collection fetched from db
      _collection = _collection.map((movie) => ({
        ...movie,
        isDone: authCollection[movie.id].isDone,
      }));

      setCollection(_collection);
    };

    fetchMovies();
  }, [auth.user, fetchMoviesByIdList]);

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
    }

    if (action === 'delete') {
      delete authCollection[movieId];
    }

    const data = await sendUser(
      'user',
      'PATCH',
      JSON.stringify({ collection: authCollection }),
      {
        Authorization: 'Bearer ' + auth.token,
      }
    );

    //if update collection success
    //use to render base on the collection in authContent
    renderCollection = renderCollection.filter((movie) => movie.id !== movieId);
    setCollection(renderCollection);
    console.log(data);
  };

  const renderMovies = (collection) => {
    if (!collection || collection.length === 0) {
      return (
        !isLoading && (
          <h1 className=''>
            Bạn chưa có phim nào. Hãy thêm phim vào danh sách để thưởng thức
          </h1>
        )
      );
    }

    return collection.map((movie) => (
      <>
        <MovieItem
          isEdit
          clickMovieHandler={onClickMovieHandler}
          isAlreadyWatchced={movie.isDone}
          type='movie'
          key={movie.id}
          movie={movie}
        />
      </>
    ));
  };

  return (
    <div className='movie-collection'>
      {error && <ErrorModal error={error} clearError={clearError} />}

      <h1 className='text-center'>Bộ sưu tập phim của bạn</h1>

      <h1 className=''>Các phim bạn muốn xem:</h1>
      <div className='movie-collection-list'>
        {renderMovies(collection.filter((movie) => !movie.isDone))}
      </div>

      <h1 className=''>Các phim bạn đã xem:</h1>
      <div className='movie-collection-list'>
        {renderMovies(collection.filter((movie) => movie.isDone))}
      </div>
    </div>
  );
}
