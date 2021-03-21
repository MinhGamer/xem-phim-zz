import React from 'react';

import './MovieFilter.css';

import Select from '../../shared/components/FormElement/Select';

import { GENRES_LIST, NATION_LIST } from '../../shared/util/config';

//filterTerm

// filterTermArr: [{ filterTerm: '', filterType: 'genres' }];

export default function MovieFilter(props) {
  const { filterHandler } = props;

  return (
    <div className='movie-filter'>
      <Select
        onChange={filterHandler}
        label={'Thể loại: '}
        type='genres'
        options={GENRES_LIST}
        onSelect={() => {}}
      />
      <Select
        onChange={filterHandler}
        label={'Quốc gia: '}
        type='nation'
        options={NATION_LIST}
        onSelect={() => {}}
      />
    </div>
  );
}
