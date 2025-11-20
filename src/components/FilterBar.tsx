import React from 'react';
import { Period, Metric } from '@/lib/mockData';
import { RefreshCw, Calendar, BarChart2 } from 'lucide-react';

interface FilterBarProps {
    period: Period;
    setPeriod: (p: Period) => void;
    metric: Metric;
    setMetric: (m: Metric) => void;
    onUpdate: () => void;
    isUpdating: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    period,
    setPeriod,
    metric,
    setMetric,
    onUpdate,
    isUpdating,
}) => {
    return (
        <div className="flex flex-wrap items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
            {/* Period Selector */}
            <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value as Period)}
                    className="bg-slate-800 border-none text-sm text-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 py-1.5 pl-2 pr-8 cursor-pointer hover:bg-slate-700 transition-colors"
                >
                    <option value="1month">直近1ヶ月</option>
                    <option value="2weeks">直近2週間</option>
                    <option value="1week">直近1週間</option>
                </select>
            </div>

            {/* Metric Selector */}
            <div className="flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-slate-400" />
                <select
                    value={metric}
                    onChange={(e) => setMetric(e.target.value as Metric)}
                    className="bg-slate-800 border-none text-sm text-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 py-1.5 pl-2 pr-8 cursor-pointer hover:bg-slate-700 transition-colors"
                >
                    <option value="subscribers">登録者数</option>
                    <option value="views">再生数</option>
                    <option value="likes">いいね数</option>
                </select>
            </div>

            <div className="flex-grow" />

            {/* Update Button */}
            <button
                onClick={onUpdate}
                disabled={isUpdating}
                className={`
          flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${isUpdating
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:transform active:scale-95'}
        `}
            >
                <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
                <span>{isUpdating ? '更新中...' : 'データを更新'}</span>
            </button>
        </div>
    );
};
