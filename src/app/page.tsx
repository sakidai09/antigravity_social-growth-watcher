'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { PlatformSelector } from '@/components/PlatformSelector';
import { FilterBar } from '@/components/FilterBar';
import { ChannelTable } from '@/components/ChannelTable';
import { Platform, Period, Metric, Channel, getMockData } from '@/lib/mockData';

export default function Home() {
  const [platform, setPlatform] = useState<Platform>('youtube');
  const [period, setPeriod] = useState<Period>('1month');
  const [metric, setMetric] = useState<Metric>('subscribers');
  const [data, setData] = useState<Channel[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchData = () => {
    setIsUpdating(true);
    // Simulate network delay
    setTimeout(() => {
      const newData = getMockData(platform, period);
      // Sort based on metric
      const sortedData = [...newData].sort((a, b) => {
        if (metric === 'subscribers') return b.subscribersGrowth - a.subscribersGrowth;
        if (metric === 'views') return b.viewsGrowth - a.viewsGrowth;
        if (metric === 'likes') return b.likesGrowth - a.likesGrowth;
        return 0;
      });

      // Re-rank after sort
      const rankedData = sortedData.map((item, idx) => ({ ...item, rank: idx + 1 }));

      setData(rankedData);
      setIsUpdating(false);
    }, 800);
  };

  useEffect(() => {
    fetchData();
  }, [platform, period]); // Fetch when platform or period changes

  useEffect(() => {
    // When metric changes, just re-sort existing data if possible, or re-fetch.
    // For simplicity, let's re-sort the current data without "fetching" delay if we want, 
    // but to be consistent with "Update" button logic, we can just re-sort the state.
    if (data.length > 0) {
      const sortedData = [...data].sort((a, b) => {
        if (metric === 'subscribers') return b.subscribersGrowth - a.subscribersGrowth;
        if (metric === 'views') return b.viewsGrowth - a.viewsGrowth;
        if (metric === 'likes') return b.likesGrowth - a.likesGrowth;
        return 0;
      });
      const rankedData = sortedData.map((item, idx) => ({ ...item, rank: idx + 1 }));
      setData(rankedData);
    }
  }, [metric]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Hero / Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Top Growing Channels
            </h1>
            <p className="text-slate-400">
              Discover the fastest growing creators on {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </p>
          </div>
          <PlatformSelector
            currentPlatform={platform}
            onPlatformChange={setPlatform}
          />
        </div>

        {/* Controls */}
        <FilterBar
          period={period}
          setPeriod={setPeriod}
          metric={metric}
          setMetric={setMetric}
          onUpdate={fetchData}
          isUpdating={isUpdating}
        />

        {/* Data Table */}
        <ChannelTable
          data={data}
          activeMetric={metric}
        />

      </main>
    </div>
  );
}
