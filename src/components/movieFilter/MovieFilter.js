import React from 'react';

import './MovieFilter.css';

import Select from '../../shared/components/FormElement/Select';

import {
  GENRES_LIST_VN,
  LANGUAGE_LIST_VN,
  RELEASE_YEAR,
  LENGTH,
  SORT,
} from '../../shared/util/config';

export default function MovieFilter(props) {
  const { filterHandler } = props;

  return (
    <div className='movie-filter'>
      <div className='movie-filter--item'>
        <Select
          onChange={filterHandler}
          label={'Thể loại: '}
          id='genres'
          options={GENRES_LIST_VN}
          onSelect={() => {}}
        />
      </div>

      <div className='movie-filter--item'>
        <Select
          onChange={filterHandler}
          label={'Ngôn ngữ: '}
          id='language'
          options={LANGUAGE_LIST_VN}
          onSelect={() => {}}
        />
      </div>

      <div className='movie-filter--item'>
        <Select
          onChange={filterHandler}
          label={'Năm: '}
          id='year'
          options={RELEASE_YEAR}
          onSelect={() => {}}
        />
      </div>

      <div className='movie-filter--item'>
        <Select
          onChange={filterHandler}
          label={'Thời lượng: '}
          id='length'
          options={LENGTH}
          onSelect={() => {}}
        />
      </div>

      <div className='movie-filter--item'>
        <Select
          onChange={filterHandler}
          label={'Sắp xếp: '}
          id='sort'
          options={SORT}
          onSelect={() => {}}
        />
      </div>
    </div>
  );
}
