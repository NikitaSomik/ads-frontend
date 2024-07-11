'use client';

import React, { useEffect, useState, useMemo } from 'react';
import api from '@/axiosConfig';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart';

const chartConfig = {
    impressions: {
        label: 'Impressions',
        color: 'hsl(var(--chart-1))'
    },
    clicks: {
        label: 'Clicks',
        color: 'hsl(var(--chart-2))'
    }
} satisfies ChartConfig;

export function AdsChart() {
    const [chartData, setChartData] = useState([]);
    const [activeChart, setActiveChart] = useState('impressions');
    const [totalImpressions, setTotalImpressions] = useState(0);
    const [totalClicks, setTotalClicks] = useState(0);

    useEffect(() => {
        api.get('/ads/statistics')
            .then(response => {
                const { daily_statistics, total_impressions, total_clicks } = response.data.data;
                setChartData(daily_statistics);
                setTotalImpressions(total_impressions);
                setTotalClicks(total_clicks);
            })
            .catch(error => {
                console.error('Error fetching chart data:', error);
            });
    }, []);

    const total = useMemo(() => ({
        impressions: chartData.reduce((acc, curr) => acc + curr.total_impressions, 0),
        clicks: chartData.reduce((acc, curr) => acc + curr.total_clicks, 0)
    }), [chartData]);

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Bar Chart - Interactive</CardTitle>
                    <CardDescription>
                        Showing total impressions and clicks for the last 10 days
                    </CardDescription>
                </div>
                <div className="flex">
                    {['impressions', 'clicks'].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                {key === 'impressions' ? totalImpressions.toLocaleString() : totalClicks.toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[280px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        });
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={activeChart === 'impressions' ? 'total_impressions' : 'total_clicks'} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
