import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { googleApiKey } from '../../util/googleApiKey';

import './Translate.css';

const projectId = 'places-app-307109';

export default function Translate(props) {
  const [results, setResults] = useState('');

  useEffect(() => {
    const translate = async () => {
      const translation = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: props.text,
            target: 'vi',
            key: googleApiKey,
          },
        }
      );

      setResults(translation.data.data.translations[0].translatedText);
    };

    translate();
  }, []);

  return (
    <div className='translate'>
      <p>{results}</p>
    </div>
  );
}
