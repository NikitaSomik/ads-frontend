import { useState, useEffect } from 'react';
import api from '@/axiosConfig';

const useAdsStatistics = () => {
  const [chartData, setChartData] = useState([]);
  const [totalImpressions, setTotalImpressions] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdsStatistics = async () => {
      try {
        const response = await api.get('/ads/statistics');
        const { daily_statistics, total_impressions, total_clicks } =
          response.data.data;
        setChartData(daily_statistics);
        setTotalImpressions(total_impressions);
        setTotalClicks(total_clicks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAdsStatistics();
  }, []);

  return { chartData, totalImpressions, totalClicks, loading, error };
};

export default useAdsStatistics;
