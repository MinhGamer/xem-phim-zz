import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

import LazyLoad from 'react-lazyload';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import { googleApiKey } from '../../shared/util/googleApiKey';
import { API_MOVIE_IMAGE, JOB_LIST } from '../../shared/util/config';

import './PersonPage.css';

import MoviePoster from '../../components/moviePoster/MoviePoster';

import useHttp from '../../shared/customHooks/useHttp';

export default function PersonPage() {
  const [actor, setActor] = useState(null);
  const { fetchPersonDetails } = useHttp();

  const history = useHistory();

  const { personId } = useParams();

  const renderJobs = (jobId) => {
    console.log(jobId);
    const jobInVn = JOB_LIST.find((job) => job.id === jobId);

    return jobInVn.name;
  };

  useEffect(() => {
    const fetchPerson = async () => {
      const data = await fetchPersonDetails(`person/${personId}`);

      //use google api to translate biography to vietnamese
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
    movies.splice(0, 20).map(
      (movie) =>
        movie.poster_path && (
          <LazyLoad
            offset={-120}
            height={340}
            key={movie.id}
            className='person-movies--item'
            placeholder={<LoadingSpinner />}>
            <MoviePoster
              onClick={() => history.push(`/movie/${movie.id}`)}
              poster_path={movie.poster_path}
              alt={movie.title}
            />

            <p>{movie.title}</p>
          </LazyLoad>
        )
    );

  const renderImages = (images) =>
    images.map((img) => (
      <LazyLoad
        offset={-120}
        height={340}
        key={img.id}
        className='person-images--item'
        placeholder={<LoadingSpinner />}>
        <img src={`${API_MOVIE_IMAGE}${img.file_path}`} alt={img.title} />
      </LazyLoad>
    ));

  const renderPersonInfo = () => (
    <>
      <img src={`${API_MOVIE_IMAGE}/${actor.profile_path}`} alt={actor.name} />
      <p className='person-info--header'>Thông tin cá nhân</p>

      <p className='person-info--title'>Nghề nghiệp</p>
      <p className='person-info--value'>
        {renderJobs(actor.known_for_department)}
      </p>

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
