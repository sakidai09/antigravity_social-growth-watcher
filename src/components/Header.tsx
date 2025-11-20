import React from 'react';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export const Header = () => {
    return (
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 p-2 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                        <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        SocialGrowth
                    </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Top Lists</Link>
                    <Link href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Platforms</Link>
                    <Link href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Analysis</Link>
                    <Link href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">About</Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Login</button>
                    <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors">
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
};
