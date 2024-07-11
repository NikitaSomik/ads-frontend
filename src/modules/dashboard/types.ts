export interface Ad {
  id: number;
  title: string;
  description: string;
  impressions: number;
  clicks: number;
  createdAt: string;
}

export interface DailyStatistic {
  date: string;
  total_impressions: number;
  total_clicks: number;
}

export interface AdStatistics {
  daily_statistics: DailyStatistic[];
  total_impressions: number;
  total_clicks: number;
}
