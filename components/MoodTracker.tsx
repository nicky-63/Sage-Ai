
import React, { useState } from 'react';
import { MOODS } from '../constants';

interface MoodTrackerProps {
  addMood: (mood: string) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ addMood }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (moodName: string) => {
    addMood(moodName);
    setSelectedMood(moodName);
    setTimeout(() => setSelectedMood(null), 1500); // Reset after a short delay
  };

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-2xl font-bold text-brand-light-green mb-2">How are you feeling right now?</h2>
      <p className="text-brand-text-secondary mb-8">Select a mood to log it.</p>
      
      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
        {MOODS.map(({ name, emoji }) => (
          <button
            key={name}
            onClick={() => handleMoodSelect(name)}
            className="bg-brand-secondary p-4 rounded-lg shadow-lg hover:scale-105 hover:bg-slate-700 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green"
          >
            <div className="text-5xl">{emoji}</div>
            <div className="mt-2 text-brand-text">{name}</div>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mt-8 bg-brand-green/20 border border-brand-green text-brand-light-green px-4 py-3 rounded-lg relative animate-fade-in" role="alert">
          <strong className="font-bold">Logged!</strong>
          <span className="block sm:inline ml-2">Feeling {selectedMood.toLowerCase()} has been recorded.</span>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
