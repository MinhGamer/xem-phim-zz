import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';

import { googleApiKey } from '../../shared/util/googleApiKey';
import { API_MOVIE_IMAGE } from '../../shared/util/config';

import './Person.css';

import useHttp from '../../shared/customHooks/useHttp';

export default function PersonPage() {
  const [actor, setActor] = useState(null);
  const { fetchPersonDetails } = useHttp();

  const { personId } = useParams();

  useEffect(() => {
    const fetchPerson = async () => {
      const data = await fetchPersonDetails(`person/${personId}`);

      //translate biography to vietnamese
      const translation = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: data.biography,
            target: 'vi',
            key: googleApiKey,
          },
        }
      );

      const translatedBiography =
        translation.data.data.translations[0].translatedText;

      setActor({ ...data, biography: translatedBiography });
    };

    fetchPerson();
  }, []);

  const renderMovies = (movies) =>
    movies.splice(0, 10).map((movie) => (
      <NavLink
        key={movie.id}
        to={`/movie/${movie.id}`}
        className='person-movies--item'>
        <img src={`${API_MOVIE_IMAGE}${movie.poster_path}`} alt={movie.title} />
        <p>{movie.title}</p>
      </NavLink>
    ));

  const renderImages = (images) =>
    images.map((img) => (
      <div key={img.title} className='person-images--item'>
        <img src={`${API_MOVIE_IMAGE}${img.file_path}`} alt={img.title} />
      </div>
    ));

  const renderPersonInfo = () => (
    <>
      <img src={`${API_MOVIE_IMAGE}/${actor.profile_path}`} alt={actor.name} />
      <p className='person-info--header'>Thông tin cá nhân</p>

      <p className='person-info--title'>Nghề nghiệp</p>
      <p className='person-info--value'>{actor.known_for_department}</p>

      <p className='person-info--title'>Giới tính</p>
      <p className='person-info--value'>{actor.gender === 2 ? 'NAM' : 'NỮ'}</p>

      <p className='person-info--title'>Ngày sinh</p>
      <p className='person-info--value'>{actor.birthday}</p>

      <p className='person-info--title'> Nơi sinh</p>
      <p className='person-info--value'>{actor.place_of_birth}</p>
    </>
  );

  return (
    actor && (
      <div className='person-container'>
        <div className='person-info'>{renderPersonInfo()}</div>
        <div className='person-wrapper'>
          <div className='person-biography'>
            <p className='person-biography--name'>{actor.name}</p>
            <p className='person-biography--title'>Tiểu sử</p>
            <p className='person-biography--content'>{actor.biography}</p>
          </div>

          <h2>Các phim đã tham gia</h2>
          <div className='person-movies'>
            {renderMovies(actor.credits.cast)}
          </div>

          <h2>Hình ảnh</h2>
          <div className='person-images'>
            {renderImages(actor.images.profiles)}
          </div>
        </div>
      </div>
    )
  );
}
