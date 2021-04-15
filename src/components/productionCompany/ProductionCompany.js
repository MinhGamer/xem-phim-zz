import React from 'react';

import {
  API_MOVIE_IMAGE,
  API_MOVIE_IMAGE_CUSTOM,
} from '../../shared/util/config';

import { useHistory } from 'react-router-dom';

import './ProductionCompany.css';

export default function ProductionCompany(props) {
  const history = useHistory();
  const { companies } = props;

  const gotoHomepageToFilter = (companyId) => {
    history.push(`/?with_companies=${companyId}`);
  };

  return (
    <div className='production-company'>
      {companies.slice(0, 4).map(
        (company) =>
          company.logo_path && (
            <div
              onClick={() => gotoHomepageToFilter(company.id)}
              className='production-company--item'>
              <img
                src={`${API_MOVIE_IMAGE_CUSTOM}/w92/${company.logo_path}`}
                alt={company.name}
              />
            </div>
          )
      )}
    </div>
  );
}
