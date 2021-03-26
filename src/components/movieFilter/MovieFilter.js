import React from 'react';

import './MovieFilter.css';

import Select from '../../shared/components/FormElement/Select';

import { GENRES_LIST_VN } from '../../shared/util/config';

export default function MovieFilter(props) {
  const { filterHandler } = props;

  return (
    <div className='movie-filter'>
      <Select
        onChange={filterHandler}
        label={'Thể loại: '}
        id='genres'
        options={GENRES_LIST_VN}
        onSelect={() => {}}
      />
      {/* <Select
        onChange={filterHandler}
        label={'Quốc gia: '}
        type='nation'
        options={GENRES_LIST_VN}
        onSelect={() => {}}
      /> */}
    </div>
  );
}
