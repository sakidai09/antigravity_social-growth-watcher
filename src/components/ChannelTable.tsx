import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Channel, Metric } from '@/lib/mockData';
import { ArrowUp, Minus } from 'lucide-react';

interface ChannelTableProps {
    data: Channel[];
    activeMetric: Metric;
}

export const ChannelTable: React.FC<ChannelTableProps> = ({ data, activeMetric }) => {
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('ja-JP', { notation: "compact", maximumFractionDigits: 1 }).format(num);
    };

    const GrowthIndicator = ({ value }: { value: number }) => (
        <div className="flex items-center text-xs font-medium text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded ml-2">
            <ArrowUp className="w-3 h-3 mr-0.5" />
            {formatNumber(value)}
        </div>
    );

    return (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-xs uppercase text-slate-400 border-b border-slate-800">
                        <th className="p-4 font-medium w-16 text-center">Rank</th>
                        <th className="p-4 font-medium w-16 text-center">Grade</th>
                        <th className="p-4 font-medium">Channel</th>
                        <th className={`p-4 font-medium text-right ${activeMetric === 'subscribers' ? 'text-blue-400' : ''}`}>Subscribers</th>
                        <th className={`p-4 font-medium text-right ${activeMetric === 'views' ? 'text-blue-400' : ''}`}>Views</th>
                        <th className={`p-4 font-medium text-right ${activeMetric === 'likes' ? 'text-blue-400' : ''}`}>Likes</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {data.map((channel) => (
                        <tr key={channel.id} className="group hover:bg-slate-800/50 transition-colors duration-150">
                            <td className="p-4 text-center font-bold text-slate-500 group-hover:text-white">
                                {channel.rank}
                            </td>
                            <td className="p-4 text-center">
                                <span className={`
                  inline-block px-2 py-1 rounded text-xs font-bold
                  ${channel.grade.startsWith('A') ? 'text-green-400 bg-green-400/10' : ''}
                  ${channel.grade.startsWith('B') ? 'text-yellow-400 bg-yellow-400/10' : ''}
                  ${channel.grade.startsWith('C') ? 'text-orange-400 bg-orange-400/10' : ''}
                `}>
                                    {channel.grade}
                                </span>
                            </td>
                            <td className="p-4">
                                <Link href={`/channel/${channel.id}`} className="flex items-center space-x-3 group/link">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-700 group-hover/link:border-blue-500 transition-colors">
                                        <Image
                                            src={channel.icon}
                                            alt={channel.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-medium text-slate-200 group-hover/link:text-blue-400 transition-colors">
                                            {channel.name}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {channel.category}
                                        </div>
                                    </div>
                                </Link>
                            </td>

                            {/* Subscribers */}
                            <td className="p-4 text-right">
                                <div className="flex flex-col items-end">
                                    <span className={`font-medium ${activeMetric === 'subscribers' ? 'text-white' : 'text-slate-300'}`}>
                                        {formatNumber(channel.subscribers)}
                                    </span>
                                    <GrowthIndicator value={channel.subscribersGrowth} />
                                </div>
                            </td>

                            {/* Views */}
                            <td className="p-4 text-right">
                                <div className="flex flex-col items-end">
                                    <span className={`font-medium ${activeMetric === 'views' ? 'text-white' : 'text-slate-300'}`}>
                                        {formatNumber(channel.views)}
                                    </span>
                                    <GrowthIndicator value={channel.viewsGrowth} />
                                </div>
                            </td>

                            {/* Likes */}
                            <td className="p-4 text-right">
                                <div className="flex flex-col items-end">
                                    <span className={`font-medium ${activeMetric === 'likes' ? 'text-white' : 'text-slate-300'}`}>
                                        {formatNumber(channel.likes)}
                                    </span>
                                    <GrowthIndicator value={channel.likesGrowth} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                    No channels found matching criteria.
                </div>
            )}
        </div>
    );
};
