import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Slider.css';

const DUMMY_CAST = [
  {
    name: 'Ben Afflect',
    cast: 'Batman',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/ben-affleck.jpg?alt=media&token=b26f4d67-3c0d-4534-b635-14380347acf4',
  },
  {
    name: 'Henry Calvin',
    cast: 'Superman',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/henry-cavill.jpg?alt=media&token=76ce0ff9-26e8-48d5-a1db-e1561ec48f08',
  },
  {
    name: 'Gal Gadot',
    cast: 'Wonder Woman',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/gal-gadot.jpg?alt=media&token=ec6bba45-e4bc-4c22-8a32-1e83c763493a',
  },
  {
    name: 'Jason Momoa',
    cast: 'Aquaman',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/jason-momoa.jpg?alt=media&token=1f59cdfc-f77e-4e72-8ffa-6880f11b0405',
  },
  {
    name: 'Ezra Miler',
    cast: 'The Flash',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/ezra-miller.jpg?alt=media&token=16bdfa19-ea64-4276-8355-430ea44f3eca',
  },
  {
    name: 'Ray Fisher',
    cast: 'Cybord',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/ray-fisher.jpg?alt=media&token=28ac7dfd-83b4-43dc-88e8-b0d1b62eaa33',
  },
  {
    name: 'Amy Adams',
    cast: 'Lois Lane',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/amy-adams.jpg?alt=media&token=e6ff72af-7a9e-484e-a3b8-7041be3c2589',
  },
  {
    name: 'Jeremy Iron',
    cast: 'Alfred',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/jeremy-irons.jpg?alt=media&token=32170a10-44de-49ed-9547-bd2b2f65e294',
  },
  {
    name: 'Connie Nelson',
    cast: 'Queen Hippoleta',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/connie-neilson.jpg?alt=media&token=723000b6-9f73-4447-9628-afee54f433c8',
  },
  {
    name: 'Diana Lanne',
    cast: 'Martha Kent',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/diana-lanne.jpg?alt=media&token=2f32ed75-7aff-42d9-acbe-010bf1c3c999',
  },
  {
    name: 'J.K.Simmon',
    cast: 'James Gordon',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/xem-phim-zz.appspot.com/o/j.k.simmons.jpg?alt=media&token=d197a932-43a7-41af-b50c-f1c64f67db7e',
  },
];

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    className: 'slider-item',
  };
  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {DUMMY_CAST.map((actor) => (
          <div className='slider-item'>
            <img src={actor.imageUrl} alt='title' />
            <div className='actor-name'>{actor.name}</div>
            <div className='actor-cast'>{actor.cast}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
