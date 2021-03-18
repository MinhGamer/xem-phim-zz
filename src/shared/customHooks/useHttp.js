import React, { useState, useCallback } from 'react';

import { API_URL } from '../util/config';

export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (uri, method = 'GET', body = null) => {
    try {
      const res = await fetch(`${API_URL}/${uri}`, {
        method,
        body,
      });

      const resData = await res.json();

      return resData;
    } catch (err) {
      throw err;
    }
  }, []);

  return { sendRequest, isLoading, error };
}
