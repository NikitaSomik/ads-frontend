import api from '@/axiosConfig';
import { Ad, DailyStatistic } from '../types';

const URL = '/ads';

function getAds() {
  return api.get<Ad[]>(`${URL}`);
}

function getAdsStatistics() {
  return api.get<DailyStatistic[]>(`${URL}/statistics`);
}

export const DashboardApi = {
  getAds,
  getAdsStatistics,
};
