// import React, { useState } from 'react';

// // import './Slider.css';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// import { SLIDE_TO_SHOW, SLIDE_TO_SLIDE } from '../../util/config';

// export default function Slider() {
//   // const [slide, setSlide] = useState(0);

//   // const renderSliderItem = () => {
//   //   return DUMMY_IMAGE.map((imageUrl, index) => {
//   //     if (index < SLIDE_TO_SHOW) {
//   //       return (
//   //         <div className='slider-item'>
//   //           <img src={imageUrl} alt='title' />
//   //         </div>
//   //       );
//   //     }
//   //   });
//   // };

//   // const nestSlide = () => {
//   //   setSlide((prevSlide) => prevSlide + SLIDE_TO_SLIDE);
//   // };

//   return (
//     // <div className='slider'>
//     //   <i onClick={nestSlide} class='fa fa-less-than'></i>
//     //   <i class='fa fa-greater-than'></i>
//     //   <div className='slider-content'>{renderSliderItem()}</div>
//     // </div>
//     <div></div>
//   );
// }

import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Slider.css';

const DUMMY_IMAGE = [
  'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/shaolin.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/la-vie-en-rose.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/contact.jpg?alt=media',
  "https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/zack-snyder's-justice-league.jpg?alt=media",
  'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/norwegian-wood.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/raya-and-the-last-dragon.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/paper-lives.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/the-falcon-and-the-winter-soldier.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/the-lost-pirate-kingdom.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/yes-day.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/space-sweepers.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/white-night.jpg?alt=media',
];

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
  };
  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {DUMMY_IMAGE.map((imageUrl) => (
          <div className='slider-item'>
            <img src={imageUrl} alt='title' />
          </div>
        ))}
      </Slider>
    </div>
  );
}
