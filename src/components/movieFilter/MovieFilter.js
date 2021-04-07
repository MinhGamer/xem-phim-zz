import React, { useMemo } from 'react';

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

  const memoGENRES_LIST_VN = useMemo(() => GENRES_LIST_VN, []);

  const memoLANGUAGE_LIST_VN = useMemo(() => LANGUAGE_LIST_VN, []);

  const memoRELEASE_YEAR = useMemo(() => RELEASE_YEAR, []);

  return (
    <div className='movie-filter'>
      <div className='movie-filter--item'>
        <Select
          onChange={filterHandler}
          label={'Thể loại: '}
          id='with_genres'
          options={memoGENRES_LIST_VN}
          optionId={filterTerm.with_genres}
          onSelect={() => {}}
        />
      </div>

      <div className='movie-filter--item'>
        <Select
          onChange={filterHandler}
          label={'Ngôn ngữ: '}
          id='with_original_language'
          options={memoLANGUAGE_LIST_VN}
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
          options={memoRELEASE_YEAR}
          onSelect={() => {}}
        />
      </div>

      <div className='movie-filter--item'>
        <Select
          onChange={filterHandler}
          label={'Thời lượng: '}
          id='length'
          options={LENGTH}
          optionId={{
            max: filterTerm['with_runtime.lte'],
            min: filterTerm['with_runtime.gte'],
          }}
          onSelect={() => {}}
        />
      </div>

      <div className='movie-filter--item'>
        <Select
          onChange={filterHandler}
          label={'Sắp xếp: '}
          id='sort_by'
          options={SORT}
          onSelect={() => {}}
          optionId={filterTerm.sort_by}
          className='select-lower-index'
        />
      </div>
    </div>
  );
}

export default React.memo(MovieFilter);
