import { useCallback, useState } from 'react';
import api from '../services/api';

function useApi() {
  const [loading, setLoading] = useState(true);

  const fetchAllData = useCallback(async (url: string) => {
    setLoading(true);
    try {
      const response = await api.index(url);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      console.log('Error', error);
      throw error;
    }
  }, []);

  return { loading, fetchAllData };
}

export default useApi;
