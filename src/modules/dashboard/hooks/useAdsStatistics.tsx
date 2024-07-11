import { useState, useEffect } from 'react';
import {DashboardApi} from '@/modules/dashboard/dashboardApi/dashboardApi';
import { DailyStatistic } from '../types';

const useAdsStatistics = () => {
  const [chartData, setChartData] = useState<DailyStatistic[]>([]);
  const [totalImpressions, setTotalImpressions] = useState<number>(0);
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DashboardApi.getAdsStatistics();
        const { daily_statistics, total_impressions, total_clicks } = response.data.data;
        setChartData(daily_statistics);
        setTotalImpressions(total_impressions);
        setTotalClicks(total_clicks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { chartData, totalImpressions, totalClicks, loading, error };
};

export default useAdsStatistics;
