import { useCallback, useState } from 'react';
import api from '../services/api';

function useApi() {
  const [loading, setLoading] = useState(false);

  const fetchAllData = useCallback(async (url: string) => {
    try {
      setLoading(true);
      const response = await api.index(url);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      console.log('Error', error);
      throw error;
    }
  }, []);

  const fetchDataShow = useCallback(async (url: string, id: string) => {
    try {
      setLoading(true);
      const response = await api.show(url, id);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      console.log('Error', error);
      throw error;
    }
  }, []);

  const sendDataPost = useCallback(async (url: string, data: any) => {
    try {
      setLoading(true);
      const response = await api.store(url, data);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      console.log('Error', error);
      throw error;
    }
  }, []);

  const deleteData = useCallback(async (url: string, id: string) => {
    try {
      setLoading(true);
      const response = await api.delete(url, id);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      console.log('Error', error);
      throw error;
    }
  }, []);

  const sendDataUpdate = useCallback(async (url: string, id: string, data: any) => {
    try {
      setLoading(true);
      const response = await api.update(url, id, data);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      console.log('Error', error);
      throw error;
    }
  }, []);

  return { loading, fetchAllData, fetchDataShow, sendDataPost, deleteData, sendDataUpdate };
}

export default useApi;
