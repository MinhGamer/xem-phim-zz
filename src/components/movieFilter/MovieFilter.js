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

function MovieFilter(props) {
  const { filterHandler, filterTerm } = props;

  console.log('Filter render');

  return (
    <div className='movie-filter'>
      <div className='movie-filter--item'>
        <Select
          onChange={filterHandler}
          label={'Thể loại: '}
          id='with_genres'
          options={GENRES_LIST_VN}
          optionId={filterTerm.with_genres}
          onSelect={() => {}}
        />
      </div>

      <div className='movie-filter--item'>
        <Select
          onChange={filterHandler}
          label={'Ngôn ngữ: '}
          id='with_original_language'
          options={LANGUAGE_LIST_VN}
          optionId={filterTerm.with_original_language}
          onSelect={() => {}}
        />
      </div>

      <div className='movie-filter--item'>
        <Select
          onChange={filterHandler}
          label={'Năm: '}
          id='primary_release_year'
          optionId={filterTerm.primary_release_year}
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
          // optionId={filterTerm.primary_release_year}
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

export default React.memo(MovieFilter);
