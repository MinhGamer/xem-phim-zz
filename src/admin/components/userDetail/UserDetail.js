import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import MovieItem from '../../../components/movieItem/MovieItem';

import useHttp from '../../../shared/customHooks/useHttp';

import './UserDetail.css';

import Slider from 'react-slick';

function UserDetail(props) {
  const { userDetail } = props;
  const [collection, setCollection] = useState();
  const { fetchMoviesByIdList } = useHttp();

  useEffect(() => {
    const fetchMovies = async () => {
      let _collection = await fetchMoviesByIdList(userDetail.collection);

      //assign property isDone to collection fetched from db
      _collection = _collection.map((movie) => ({
        ...movie,
        isDone: userDetail.collection[movie.id].isDone,
      }));

      setCollection(_collection);
    };

    userDetail && fetchMovies();
  }, [userDetail]);

  const settings = {
    infinite: false,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    className: 'user-detail-list',
    draggable: true,
  };

  const renderMovies = (_collection) => {
    return _collection.map((movie) => (
      <div>
        <MovieItem type='movie' key={movie.id} movie={movie} />
      </div>
    ));
  };

  return (
    userDetail && (
      <div className='user-detail-container'>
        <div className='user-detail-whislist'>
          <h1 className='user-detail-whislist__title'>
            Phim đã xem (
            {collection && collection.filter((movie) => movie.isDone).length})
          </h1>
          <Slider {...settings}>
            {collection &&
              renderMovies(collection.filter((movie) => movie.isDone))}
          </Slider>
        </div>
        <div className='user-detail-finishlist'>
          <h1 className='user-detail-finishlist__title'>
            Phim muốn xem (
            {collection && collection.filter((movie) => !movie.isDone).length})
          </h1>
          <Slider {...settings}>
            {collection &&
              renderMovies(collection.filter((movie) => !movie.isDone))}
          </Slider>
        </div>
      </div>
    )
  );
}

const mapStateToProps = (state) => {
  return {
    userDetail: state.userReducer.userDetail,
  };
};

export default connect(mapStateToProps, null)(UserDetail);
