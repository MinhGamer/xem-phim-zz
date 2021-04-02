import React from 'react';

import { API_MOVIE_IMAGE } from '../../shared/util/config';

import './ProductionCompany.css';

export default function ProductionCompany(props) {
  const { companies } = props;

  console.log(companies);

  return (
    <div className='production-company'>
      {companies.slice(0, 4).map(
        (company) =>
          company.logo_path && (
            <div className='production-company--item'>
              <img
                src={`${API_MOVIE_IMAGE}/${company.logo_path}`}
                alt={company.name}
              />
            </div>
          )
      )}
    </div>
  );
}
