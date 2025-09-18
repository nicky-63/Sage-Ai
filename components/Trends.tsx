
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MoodEntry } from '../types';
import { MOODS } from '../constants';

interface TrendsProps {
  moodData: MoodEntry[];
}

const processData = (data: MoodEntry[]) => {
  const moodCounts: { [key: string]: { [key: string]: number } } = {};

  data.forEach(entry => {
    const date = new Date(entry.date).toLocaleDateString();
    if (!moodCounts[date]) {
      moodCounts[date] = {};
      MOODS.forEach(mood => moodCounts[date][mood.name] = 0);
    }
    moodCounts[date][entry.mood]++;
  });

  return Object.keys(moodCounts).map(date => ({
    date,
    ...moodCounts[date],
  })).slice(-7); // Show last 7 days
};


const Trends: React.FC<TrendsProps> = ({ moodData }) => {
  const chartData = processData(moodData);

  const moodColors: { [key: string]: string } = {
    'Happy': '#34D399',
    'Calm': '#38BDF8',
    'Okay': '#A7F3D0',
    'Anxious': '#FBBF24',
    'Sad': '#60A5FA',
    'Angry': '#F87171'
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-brand-light-green mb-4">Your Mood Trends</h2>
      <div className="bg-brand-secondary p-4 rounded-lg shadow-lg h-96">
        {moodData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }}
                labelStyle={{ color: '#E5E7EB' }}
              />
              <Legend wrapperStyle={{ color: '#E5E7EB' }} />
              {MOODS.map(mood => (
                 <Bar key={mood.name} dataKey={mood.name} stackId="a" fill={moodColors[mood.name]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-brand-text-secondary text-center">
              Log your mood to see your trends here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trends;
