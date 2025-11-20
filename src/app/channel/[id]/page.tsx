'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation'; // Correct hook for App Router client components
import { Header } from '@/components/Header';
import { Channel, Platform } from '@/lib/mockData';
import { ArrowLeft, Users, Eye, Heart, TrendingUp, Calendar } from 'lucide-react';

export default function ChannelDetail() {
    const params = useParams();
    const id = params?.id as string;
    const [channel, setChannel] = useState<Channel | null>(null);

    useEffect(() => {
        if (id) {
            // Simulate fetch
            const platform = id.split('-')[0] as Platform;
            const numericId = parseInt(id.split('-')[1]);

            // Re-generate similar data
            // In a real app, this would be an API call
            const mockChannel: Channel = {
                id: id,
                rank: numericId,
                grade: 'A',
                name: 'Mock Channel ' + numericId,
                handle: '@mockchannel' + numericId,
                icon: `https://api.dicebear.com/7.x/avataaars/svg?seed=Mock Channel ${numericId}`,
                platform: platform,
                subscribers: 8500,
                subscribersGrowth: 120,
                views: 500000,
                viewsGrowth: 5000,
                likes: 25000,
                likesGrowth: 250,
                uploads: 150,
                category: 'Entertainment'
            };
            setChannel(mockChannel);
        }
    }, [id]);

    if (!channel) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
            <Header />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
                    {/* Banner / Header */}
                    <div className="h-32 bg-gradient-to-r from-blue-900 to-slate-900 relative">
                        <div className="absolute -bottom-12 left-8">
                            <div className="w-24 h-24 rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden">
                                <Image
                                    src={channel.icon}
                                    alt={channel.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-white">{channel.name}</h1>
                                <p className="text-slate-400">{channel.handle}</p>
                                <div className="flex items-center mt-2 space-x-4">
                                    <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 uppercase tracking-wider">
                                        {channel.platform}
                                    </span>
                                    <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 uppercase tracking-wider">
                                        {channel.category}
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-400">{channel.grade}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Total Grade</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
                            <StatCard
                                icon={<Users className="w-5 h-5 text-blue-400" />}
                                label="Subscribers"
                                value={channel.subscribers}
                                growth={channel.subscribersGrowth}
                            />
                            <StatCard
                                icon={<Eye className="w-5 h-5 text-purple-400" />}
                                label="Total Views"
                                value={channel.views}
                                growth={channel.viewsGrowth}
                            />
                            <StatCard
                                icon={<Heart className="w-5 h-5 text-pink-400" />}
                                label="Total Likes"
                                value={channel.likes}
                                growth={channel.likesGrowth}
                            />
                            <StatCard
                                icon={<TrendingUp className="w-5 h-5 text-green-400" />}
                                label="Uploads"
                                value={channel.uploads}
                                growth={0} // No growth data for uploads in mock
                                noGrowth
                            />
                        </div>

                        <div className="mt-12">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-slate-400" />
                                Recent Performance
                            </h3>
                            <div className="h-64 bg-slate-800/50 rounded-xl flex items-center justify-center border border-slate-800 border-dashed">
                                <p className="text-slate-500">Chart visualization would go here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ icon, label, value, growth, noGrowth }: { icon: React.ReactNode, label: string, value: number, growth: number, noGrowth?: boolean }) {
    return (
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-slate-800 rounded-lg">
                    {icon}
                </div>
                {!noGrowth && (
                    <div className="flex items-center text-xs font-medium text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {growth}
                    </div>
                )}
            </div>
            <div className="text-2xl font-bold text-white">
                {new Intl.NumberFormat('ja-JP', { notation: "compact", maximumFractionDigits: 1 }).format(value)}
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">{label}</div>
        </div>
    );
}
