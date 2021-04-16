import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../shared/components/UI/Button';

import { actAddCommentToMovie } from '../../redux/actionCreator/movieActions';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import './Comments.css';

function Comments(props) {
  const [message, setMessage] = useState('');
  const [activeStars, setActiveStars] = useState(0);
  const [starCount, setStarCount] = useState(0);
  const [showAlert, setShowAlert] = useState(null);
  const { addCommentToMovie, movie, isLoading, movieDetail } = props;

  const comments =
    !movieDetail || !movieDetail.comments
      ? []
      : Object.values(movieDetail.comments);

  const submitHandler = (e) => {
    e.preventDefault();

    if (starCount === 0) {
      setShowAlert(true);
    } else {
      //clear everything
      addCommentToMovie(movie, { starCount, message });
      setStarCount(0);
      setActiveStars(0);
      setMessage('');
      setShowAlert(null);
    }
  };

  const renderStars = (totalStars) => {
    const stars = [];
    for (let star = 1; star <= totalStars; star++) {
      stars.push(<i class='fa fa-star icon-star'></i>);
    }

    return stars;
  };

  const renderRatingStars = (totalStars) => {
    const stars = [];
    for (let star = 1; star <= totalStars; star++) {
      stars.push(
        <i
          onClick={() => setStarCount(star)}
          onMouseEnter={() => setActiveStars(star)}
          className={`fa fa-star icon-star ${
            star <= activeStars || star <= starCount ? 'active' : ''
          }`}></i>
      );
    }

    return stars;
  };

  const renderComment = (comment) => {
    // console.log(comment.date.toTimeString());

    const date = new Date(comment.date);

    console.log(date.toLocaleTimeString());
    console.log(date.toLocaleDateString());

    return (
      <div key={comment.date} className='comment-item'>
        <div className='comment-date'>{date.toLocaleDateString()}</div>
        <div className='comment-date'>{date.toLocaleTimeString()}</div>
        {renderStars(comment.starCount)}
        <div className='comment-name'>{comment.name}</div>
        <div className='comment-message'>{comment.message}</div>
      </div>
    );
  };

  return (
    <div className='comments-container'>
      {isLoading && <LoadingSpinner />}

      {!isLoading && (
        <>
          <div className='comments-header'>Nhận xét</div>
          <div className='comments-list'>
            {comments && comments.map((comment) => renderComment(comment))}
          </div>
          <div className='comment-input'>
            <form onSubmit={submitHandler}>
              <div className='input-header'>Nhận xét của bạn </div>
              <div className='input-rating'>
                <span>Rate phim:</span>
                <div
                  onMouseLeave={() => setActiveStars(0)}
                  className='input-icon-stars'>
                  {renderRatingStars(5)}
                </div>
                {starCount === 0 && showAlert && (
                  <div className='input-alert'>
                    Xin hãy rating phim trước khi đăng bình luận
                  </div>
                )}
              </div>
              <textarea
                placeholder='Nội dung...'
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button isPrimary>Đăng</Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.userReducer.isLoading,
    movieDetail: state.movieReducer.movieDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCommentToMovie: (movie, comment) =>
      dispatch(actAddCommentToMovie(movie, comment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
