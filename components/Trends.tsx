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
    const date = new Date(entry.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
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
    'Happy': '#32D583',   // brand-accent (Green)
    'Calm': '#56CCF2',    // Light Blue
    'Okay': '#9E77ED',    // brand-purple-accent
    'Anxious': '#F2C94C', // Yellow
    'Sad': '#5356FF',    // Indigo
    'Angry': '#F04438',   // brand-danger (Red)
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-brand-text mb-4">Your Mood Trends</h2>
      <div className="bg-brand-secondary p-4 rounded-lg shadow-lg h-96">
        {moodData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(152, 162, 179, 0.2)" />
              <XAxis dataKey="date" stroke="#98A2B3" fontSize={12} />
              <YAxis stroke="#98A2B3" allowDecimals={false} fontSize={12} />
              <Tooltip
                cursor={{ fill: 'rgba(152, 162, 179, 0.1)' }}
                contentStyle={{ backgroundColor: '#101820', border: '1px solid rgba(152, 162, 179, 0.2)', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#F2F4F7' }}
              />
              <Legend wrapperStyle={{ color: '#F2F4F7' }} />
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