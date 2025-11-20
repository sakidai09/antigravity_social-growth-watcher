import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

export type Platform = 'youtube' | 'tiktok' | 'instagram';
export type Period = '1month' | '2weeks' | '1week';
export type Metric = 'subscribers' | 'views' | 'likes';

export interface Channel {
  id: string;
  rank: number;
  grade: string;
  name: string;
  handle: string;
  icon: string;
  platform: Platform;
  subscribers: number;
  subscribersGrowth: number;
  views: number;
  viewsGrowth: number;
  likes: number;
  likesGrowth: number;
  uploads: number;
  category: string;
}

const NAMES = [
  'Cosmic Explorer', 'Pixel Perfect', 'Urban Legend', 'Neon Nights', 'Retro Gamer',
  'Foodie Heaven', 'Travel Bug', 'Fitness Freak', 'Tech Talk', 'Music Mania',
  'Daily Dose', 'Laugh Factory', 'Mystery Box', 'Art Attack', 'Science Squad',
  'History Buff', 'Nature Lover', 'Pet Paradise', 'DIY Master', 'Life Hacks',
  'Gamer Zone', 'Movie Magic', 'Book Worm', 'Fashionista', 'Beauty Guru'
];

const CATEGORIES = ['Entertainment', 'Gaming', 'Music', 'Vlog', 'Tech', 'Education', 'Comedy'];

const GRADES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateChannel(id: number, platform: Platform): Channel {
  const name = `${NAMES[randomInt(0, NAMES.length - 1)]} ${randomInt(1, 99)}`;
  const subscribers = randomInt(100, 9999); // Under 10k constraint
  
  // Growth is usually a fraction of total, but let's make it interesting
  const subscribersGrowth = randomInt(10, 500); 
  
  const views = subscribers * randomInt(10, 100);
  const viewsGrowth = Math.floor(views * 0.1);
  
  const likes = Math.floor(views * 0.05);
  const likesGrowth = Math.floor(likes * 0.1);

  return {
    id: `${platform}-${id}`,
    rank: id,
    grade: GRADES[randomInt(0, GRADES.length - 1)],
    name: name,
    handle: `@${name.replace(/\s+/g, '').toLowerCase()}`,
    icon: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    platform,
    subscribers,
    subscribersGrowth,
    views,
    viewsGrowth,
    likes,
    likesGrowth,
    uploads: randomInt(10, 500),
    category: CATEGORIES[randomInt(0, CATEGORIES.length - 1)],
  };
}

export function getMockData(platform: Platform, period: Period): Channel[] {
  // In a real app, period would fetch different data. 
  // Here we'll just randomize slightly based on seed or just return static for now but re-generated on call.
  // To simulate "Update", we can just generate new random data.
  
  const count = 50;
  const data: Channel[] = [];
  for (let i = 1; i <= count; i++) {
    data.push(generateChannel(i, platform));
  }
  
  // Sort by subscriber growth desc by default as per requirements
  return data.sort((a, b) => b.subscribersGrowth - a.subscribersGrowth).map((item, index) => ({
    ...item,
    rank: index + 1
  }));
}
