import React from 'react';
import { Platform } from '@/lib/mockData';
import { Youtube, Instagram, Video } from 'lucide-react'; // Video for Tiktok as generic or custom

interface PlatformSelectorProps {
    currentPlatform: Platform;
    onPlatformChange: (platform: Platform) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ currentPlatform, onPlatformChange }) => {
    return (
        <div className="relative inline-block text-left">
            <div className="flex items-center space-x-2">
                <label htmlFor="platform-select" className="text-sm font-medium text-gray-400">Platform:</label>
                <div className="relative">
                    <select
                        id="platform-select"
                        value={currentPlatform}
                        onChange={(e) => onPlatformChange(e.target.value as Platform)}
                        className="appearance-none bg-slate-800 border border-slate-700 text-white py-2 pl-10 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-200 cursor-pointer hover:bg-slate-750"
                    >
                        <option value="youtube">YouTube</option>
                        <option value="tiktok">TikTok</option>
                        <option value="instagram">Instagram</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {currentPlatform === 'youtube' && <Youtube className="w-4 h-4 text-red-500" />}
                        {currentPlatform === 'tiktok' && <Video className="w-4 h-4 text-pink-500" />}
                        {currentPlatform === 'instagram' && <Instagram className="w-4 h-4 text-purple-500" />}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
