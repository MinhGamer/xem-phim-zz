import { useState, useCallback } from 'react';

import { API_MOVIE, API_KEY } from '../util/config';

export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (uri, method = 'GET', body = null, headers) => {
      //append params to url
      var url = new URL(`${API_MOVIE}/${uri}`),
        params = { api_key: API_KEY, language: 'vi', page: 5 };

      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      setIsLoading(true);
      try {
        const res = await fetch(url, {
          method,
          body,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        });

        const resData = await res.json();

        if (!res.ok) {
          throw resData;
        }

        setIsLoading(false);
        return resData;
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { sendRequest, isLoading, error, clearError };
}
