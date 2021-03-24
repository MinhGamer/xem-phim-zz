import { useState, useCallback } from 'react';

import { API_MOVIE, API_KEY } from '../util/config';

export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (uri, method = 'GET', body = null, headers) => {
      // 1 page = 20 movies

      setIsLoading(true);
      try {
        const resDetails = await fetch(
          `${API_MOVIE}/${uri}?api_key=${API_KEY}&language=vi&append_to_response=credits,videos`,
          {
            method,
            body,
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
          }
        );

        const resVideosAndCast = await fetch(
          `${API_MOVIE}/${uri}?api_key=${API_KEY}&append_to_response=credits,videos`,
          {
            method,
            body,
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
          }
        );

        const resDataDetails = await resDetails.json();

        const resDataVideosAndCast = await resVideosAndCast.json();

        if (!resDetails.ok) {
          throw resDetails;
        }

        setIsLoading(false);
        return { ...resDataDetails, ...resDataVideosAndCast };
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );

  const fetchMovieDetails = useCallback(
    async (uri, method = 'GET', body = null, headers) => {
      // 1 page = 20 movies

      setIsLoading(true);
      try {
        //get details in vietnamese
        const resDetails = await fetch(
          `${API_MOVIE}/${uri}?api_key=${API_KEY}&language=vi`,
          {
            method,
            body,
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
          }
        );

        const resVideosAndCast = await fetch(
          `${API_MOVIE}/${uri}?api_key=${API_KEY}&append_to_response=credits,videos`,
          {
            method,
            body,
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
          }
        );

        const resDataDetails = await resDetails.json();

        const resDataVideosAndCast = await resVideosAndCast.json();

        if (!resDetails.ok) {
          throw resDetails;
        }

        setIsLoading(false);
        return { ...resDataVideosAndCast, ...resDataDetails };
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );

  const fetchMovies = useCallback(
    async (uri, method = 'GET', numberOfPages = 1) => {
      // 1 page = 20 movies

      setIsLoading(true);

      try {
        let responseList = [];

        for (let i = 1; i <= numberOfPages; i++) {
          //append params to url
          var url = new URL(`${API_MOVIE}/${uri}`),
            params = { api_key: API_KEY, language: 'vi', page: i };

          Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
          );

          //make request to api
          const res = await fetch(url, {
            method,
          });

          const data = await res.json();

          // console.log(data.results);

          responseList.push(...data.results);
        }

        setIsLoading(false);
        return responseList;
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

  return {
    fetchMovies,
    fetchMovieDetails,
    sendRequest,
    isLoading,
    error,
    clearError,
  };
}
