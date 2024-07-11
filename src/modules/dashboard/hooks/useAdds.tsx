import { useState, useEffect } from 'react';
import { DashboardApi } from '@/modules/dashboard/dashboardApi/dashboardApi';

interface Ad {
  id: number;
  title: string;
  description: string;
  impressions: number;
  clicks: number;
  createdAt: string;
}

const useAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DashboardApi.getAds();
        const data = response.data.data;
        setAds(data);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching ads:', error);
        setError(error.message || 'Error fetching ads');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ads, loading, error };
};

export default useAds;
