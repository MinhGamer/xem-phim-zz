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

        //vietnamese
        const resDataDetails = await resDetails.json();

        const resDataVideosAndCast = await resVideosAndCast.json();

        if (!resDetails.ok) {
          throw resDetails;
        }

        // console.log(resDataVideosAndCast);

        const { crew } = resDataVideosAndCast.credits;

        // console.log(crew);

        let directors = [];
        for (let i = 0; i < crew.length; i++) {
          if (
            crew[i].department === 'Directing' &&
            crew[i].job === 'Director'
          ) {
            directors.push(crew[i].name);
          }
        }

        const resData = {
          backdrop_path: resDataVideosAndCast.backdrop_path,
          credits: resDataVideosAndCast.credits,
          genres: resDataDetails.genres,
          vote_average: resDataVideosAndCast.vote_average,
          original_title: resDataDetails.original_title,
          overview: resDataDetails.overview,
          poster_path: resDataVideosAndCast.poster_path,
          release_date: resDataVideosAndCast.release_date,
          runtime: resDataVideosAndCast.runtime,
          title: resDataDetails.title,
          videos: resDataVideosAndCast.videos,
          production_countries: resDataDetails.production_countries[0].name,
          directors,
        };

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

  const fetchPersonDetails = useCallback(async (uri, method = 'GET') => {
    // 1 page = 20 movies

    setIsLoading(true);
    try {
      //get info for an person
      const resPerson = await fetch(
        `${API_MOVIE}/${uri}?api_key=${API_KEY}&append_to_response=credits,images`
      );

      //vietnamese
      const resPersonData = await resPerson.json();

      setIsLoading(false);

      return { ...resPersonData };
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

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

  const searchMovie = useCallback(async (query) => {
    setIsLoading(true);
    try {
      const resPerson = await fetch(
        `${API_MOVIE}/search/multi?api_key=${API_KEY}&query=${query}`
      );

      //vietnamese
      const resPersonData = await resPerson.json();

      setIsLoading(false);

      return { ...resPersonData };
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

  const filterMovies = useCallback(async (filter) => {
    console.log(filter);

    const genres = filter.genres && `&with_genres=${filter.genres}`;

    const language =
      filter.language && `&with_original_language=${filter.language}`;

    const year = filter.year && `&primary_release_year=${filter.year}`;

    //length greater than
    const lengthMin =
      filter.length.min && `&with_runtime.gte=${filter.length.min}`;

    //length less than
    const lengthMax =
      filter.length.max && `&with_runtime.lte=${filter.length.max}`;

    //sort descending
    const sort = filter.sort && `&sort_by=${filter.sort}.desc`;

    const filterCombied = [
      genres,
      language,
      year,
      lengthMin,
      lengthMax,
      sort,
    ].join('');

    setIsLoading(true);
    try {
      const url = `${API_MOVIE}/discover/movie?api_key=${API_KEY}${filterCombied}&language=vi`;

      console.log(url);

      const res = await fetch(url);

      const resData = await res.json();

      setIsLoading(false);

      console.log(resData.results);

      return resData.results;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  return {
    fetchMovies,
    fetchMovieDetails,
    sendRequest,
    filterMovies,
    fetchPersonDetails,
    searchMovie,
    isLoading,
    error,
    clearError,
  };
}
