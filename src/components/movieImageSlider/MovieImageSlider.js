import React, { useState, useRef } from 'react';

import Slider from 'react-slick';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

import { CSSTransition } from 'react-transition-group';

import Backdrop from '../../shared/components/UI/Backdrop';

import './MovieImageSlider.css';

export default function MovieImageSlider(props) {
  const { images, onBackdropClick, type } = props;

  //limit the images to 15 only
  let limitImages = images.slice(0, 15);
  const sliderRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showActive, setShowActive] = useState(false);

  const settings = {
    infinite: limitImages.length > 3,
    speed: 500,
    slidesToShow: type === 'slick-type-1' ? 4 : 3,
    slidesToScroll: 1,
    arrows: false,
  };

  const nextSlideHandler = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === limitImages.length - 1 ? 0 : activeIndex + 1
    );
    sliderRef.current.slickNext();
    setShowActive(true);
  };

  const prevSlideHandler = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? limitImages.length - 1 : activeIndex - 1
    );
    sliderRef.current.slickPrev();
    setShowActive(true);
  };

  const gotoSlide = (index) => {
    setActiveIndex(index);
    sliderRef.current.slickGoTo(index);
    setShowActive(true);
  };

  return (
    <>
      <Backdrop onClick={onBackdropClick} />
      <div className='movie-images-container'>
        {type === 'slick-type-1' && (
          <div className='movie-images-wrapper slick-type-1 '>
            <div className='movie-images--active slick-type-1'>
              <CSSTransition
                in={showActive}
                onEntered={() => setShowActive(false)}
                timeout={500}
                classNames='fade-scale'>
                <div>
                  {limitImages.map(
                    (image, index) =>
                      activeIndex === index && (
                        <img
                          src={`${API_MOVIE_IMAGE}/${image.file_path}`}
                          alt='slider'
                        />
                      )
                  )}
                </div>
              </CSSTransition>
            </div>
            <div className='movie-images-slider slick-type-1 left-align-slick'>
              <i
                onClick={prevSlideHandler}
                className='fa fa-less-than arrow-icon arrow-left'></i>
              <Slider ref={sliderRef} {...settings}>
                {limitImages.map((image, index) => (
                  <div
                    onClick={() => gotoSlide(index)}
                    className={`movie-images-slider--item slick-type-1 ${
                      activeIndex === index
                        ? 'image-slider-active slick-type-1'
                        : ''
                    }`}>
                    <img
                      src={`${API_MOVIE_IMAGE}/${image.file_path}`}
                      alt='slider'
                    />
                  </div>
                ))}
              </Slider>
              <i
                onClick={nextSlideHandler}
                className='fa fa-greater-than arrow-icon arrow-right'></i>
            </div>
          </div>
        )}

        {type === 'slick-type-2' && (
          <div className='movie-images-wrapper slick-type-2 '>
            <div className='movie-images-slider slick-type-2 left-align-slick'>
              <i
                onClick={prevSlideHandler}
                className='fa fa-less-than arrow-icon arrow-left'></i>
              <Slider ref={sliderRef} {...settings}>
                {images.map((image, index) => (
                  <div
                    onClick={() => gotoSlide(index - 1)}
                    className={`movie-images-slider--item slick-type-2 ${
                      activeIndex === index - 1
                        ? 'image-slider-active slick-type-2'
                        : ''
                    }`}>
                    <img
                      src={`${API_MOVIE_IMAGE}/${image.file_path}`}
                      alt='slider'
                    />
                  </div>
                ))}
              </Slider>
              <i
                onClick={nextSlideHandler}
                className='fa fa-greater-than arrow-icon arrow-right'></i>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
