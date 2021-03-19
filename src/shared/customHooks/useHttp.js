import { useState, useCallback } from 'react';

import { API_URL } from '../util/config';

export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (uri, method = 'GET', body = null) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/${uri}`, {
        method,
        body,
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
  }, []);

  const clearError = () => {
    setError(null);
  };

  return { sendRequest, isLoading, error, clearError };
}
