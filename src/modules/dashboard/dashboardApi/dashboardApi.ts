import api from '@/axiosConfig';
import { Ad, AdStatistics } from '../types';

const URL = '/ads';

function getAds() {
  return api.get<{ data: Ad[] }>(`${URL}`);
}

function getAdsStatistics() {
  return api.get<{ data: AdStatistics }>(`${URL}/statistics`);
}

export const DashboardApi = {
  getAds,
  getAdsStatistics,
};
