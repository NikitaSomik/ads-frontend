import { useState, useEffect } from 'react';
import { DashboardApi } from '@/modules/dashboard/dashboardApi/dashboardApi';
import { Ad } from '../types';

const useAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DashboardApi.getAds();
        const data = response.data.data;
        setAds(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ads:', error);
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ads, loading, error };
};

export default useAds;
