import { useState, useEffect } from 'react';
import api from '@/axiosConfig';

const useAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await api.get('/ads');
        setAds(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ads:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return { ads, loading, error };
};

export default useAds;
