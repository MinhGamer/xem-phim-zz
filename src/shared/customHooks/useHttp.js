import { useState, useCallback } from 'react';

import { API_MOVIE, API_KEY, API_USER } from '../util/config';

export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //save data of user`
  const sendUser = useCallback(
    async (uri, method = 'GET', body = null, headers) => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_USER}/${uri}`, {
          method,
          body,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        });

        const resData = await res.json();

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
    // type: tv or movie
    async (uri, method = 'GET', body = null, headers) => {
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
          `${API_MOVIE}/${uri}?api_key=${API_KEY}&language=en&append_to_response=credits,videos,images`,
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

        const { crew } = resDataVideosAndCast.credits;

        let directors = [];
        for (let i = 0; i < crew.length; i++) {
          if (
            crew[i].department === 'Directing' &&
            crew[i].job === 'Director'
          ) {
            directors.push(crew[i]);
          }
        }

        console.log(resDataDetails);

        console.log(resDataVideosAndCast);

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
          directors,
          name: resDataDetails.name,
          seasons: resDataDetails.seasons,
          original_language: resDataVideosAndCast.original_language,
          images: resDataVideosAndCast.images.posters,
          belongs_to_collection: resDataVideosAndCast.belongs_to_collection,
          production_companies: resDataVideosAndCast.production_companies,
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

  const fetchSimilarMovies = useCallback(async (movieId, method = 'GET') => {
    setIsLoading(true);
    try {
      const url = `${API_MOVIE}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=vi`;

      //make request to api
      const res = await fetch(url, {
        method,
      });

      const data = await res.json();

      console.log(data);

      // //fix issue with db
      // //some movieId must be search with &language=en-US
      // if (data.results.length === 0) {
      //   const anotherUrl = `${API_MOVIE}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US`;
      //   //make request to api
      //   const res = await fetch(anotherUrl, {
      //     method,
      //   });

      //   const anotheData = await res.json();
      //   console.log(anotheData);
      //   return anotheData.results;
      // }
      // console.log('Herh');

      setIsLoading(false);

      return data.results;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

  const fetchTvDetails = useCallback(
    // type: tv or movie
    async (tvId, season) => {
      // 1 page = 20 movies

      //fecth tv will have 2 options:
      //1. tv main series
      //2. tv series season

      //Ex: The Flash is a Tv series and have 7 seasons

      //because api for details season is not enough info
      //-> get tv main series info + season info to render movie details

      //flag to check fetch tv or tv season
      // const isSeason = uri.includes('season');

      setIsLoading(true);
      try {
        //get details in vietnamese
        const resDetails = await fetch(
          `${API_MOVIE}/tv/${tvId}?api_key=${API_KEY}&language=vi`
        );

        const resVideosAndCast = await fetch(
          `${API_MOVIE}/tv/${tvId}?api_key=${API_KEY}&append_to_response=credits,videos`
        );

        //vietnamese
        const resDataDetails = await resDetails.json();

        const resDataVideosAndCast = await resVideosAndCast.json();

        if (!resDetails.ok) {
          throw resDetails;
        }

        let resData;

        const { created_by } = resDataVideosAndCast;

        let directors = [];
        created_by.forEach((creater) => {
          directors.push(creater);
        });

        console.log(created_by);

        // console.log(resDataDetails);

        console.log(resDataVideosAndCast);

        resData = {
          backdrop_path: resDataVideosAndCast.backdrop_path,
          credits: resDataVideosAndCast.credits,
          genres: resDataDetails.genres,
          vote_average: resDataVideosAndCast.vote_average,
          overview: resDataDetails.overview || resDataVideosAndCast.overview,
          poster_path: resDataVideosAndCast.poster_path,
          release_date: resDataVideosAndCast.first_air_date,
          videos: resDataVideosAndCast.videos,
          directors,
          name: resDataDetails.name,
          original_name: resDataDetails.original_name,
          seasons: resDataDetails.seasons,
          episode_run_time: resDataDetails.episode_run_time[0],
          origin_country: resDataVideosAndCast.origin_country,
          first_air_date: resDataVideosAndCast.first_air_date,
          number_of_episodes: resDataVideosAndCast.number_of_episodes,
          number_of_seasons: resDataVideosAndCast.number_of_seasons,
          production_companies: resDataVideosAndCast.production_companies,
        };

        //if fetch tv season details:
        if (season) {
          const resSeason = await fetch(
            `${API_MOVIE}/tv/${tvId}/season/${season}?api_key=${API_KEY}&append_to_response=credits,videos`
          );

          const resSeasonData = await resSeason.json();

          console.log(resSeasonData);

          resData = {
            ...resData,
            ...resSeasonData,
            release_date: resSeasonData.air_date,
          };
        }

        console.log(resData);

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

  const fetchProductionCompany = useCallback(async (companyId) => {
    setIsLoading(true);
    try {
      //get info for an person
      const res = await fetch(
        `${API_MOVIE}/company/${companyId}?api_key=${API_KEY}`
      );

      //vietnamese
      const resData = await res.json();

      setIsLoading(false);

      return { ...resData };
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

  const fetchMovies = useCallback(
    async (uri, method = 'GET', numberOfPages = 1) => {
      setIsLoading(true);

      try {
        let responseList = [];

        for (let i = 0; i < numberOfPages; i++) {
          //append params to url

          const url = `${API_MOVIE}/${uri}/popular?api_key=${API_KEY}&language=vi&page=${
            i + 1
          }`;

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

  const fetchTvSerires = useCallback(
    async (uri, method = 'GET', numberOfPages = 1) => {
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

  const filterMovies = useCallback(async (type, filter, numberOfPages = 1) => {
    filter = filter.replace('?', '&');

    //type: movie or tv

    setIsLoading(true);
    let movieUrls = [];
    try {
      for (let i = 0; i < numberOfPages; i++) {
        const url = `${API_MOVIE}/discover/${type}?api_key=${API_KEY}${filter}&language=vi&page=${
          i + 1
        }`;

        movieUrls.push(fetch(url));
      }

      const allRes = await Promise.all(movieUrls);

      const allResults = await Promise.all(allRes.map((res) => res.json()));

      let data = [];
      allResults.forEach((result) => {
        data = data.concat(result.results);
      });

      setIsLoading(false);

      // console.log(data);

      return data;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchMoviesByIdList = useCallback(async (idList) => {
    setIsLoading(true);

    // idList = {
    //   527774: { isDone: true },
    //   587807: { isDone: false },
    //   791373: { isDone: true },
    // };

    const transFormedIdList = Object.keys(idList);
    // transFormedIdList =["527774", "587807", "791373"]

    try {
      const urlList = [];

      for (let i = 0; i < transFormedIdList.length; i++) {
        const url = `${API_MOVIE}/movie/${transFormedIdList[i]}?api_key=${API_KEY}&language=vi`;

        urlList.push(fetch(url));
      }

      const resList = await Promise.all(urlList);

      const resData = await Promise.all(resList.map((res) => res.json()));

      setIsLoading(false);

      console.log(resData);

      return resData;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

  const fetchSeries = useCallback(async (seriesList) => {
    setIsLoading(true);

    try {
      let requestList = [];

      for (let i = 0; i < seriesList.length; i++) {
        const url = `${API_MOVIE}/collection/${seriesList[i].id}?api_key=${API_KEY}&language=vi`;

        requestList.push(fetch(url));
      }

      //fetch single series ->  fecth images with it
      if (seriesList.length === 1) {
        requestList.push(
          fetch(
            `${API_MOVIE}/collection/${seriesList[0].id}/images?api_key=${API_KEY}`
          )
        );
      }

      const responseList = await Promise.all(requestList);

      let data = await Promise.all(responseList.map((res) => res.json()));

      //fetch single series
      if (seriesList.length === 1) {
        data = [{ ...data[0], ...data[1] }];
      }

      setIsLoading(false);

      return data;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

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
    sendUser,
    fetchMoviesByIdList,
    fetchTvSerires,
    fetchTvDetails,
    fetchSeries,
    fetchSimilarMovies,
    fetchProductionCompany,
  };
}
