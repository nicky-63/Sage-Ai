
import React, { useState } from 'react';
import { JournalEntry } from '../types';

interface JournalProps {
  addJournalEntry: (content: string) => void;
  entries: JournalEntry[];
}

const Journal: React.FC<JournalProps> = ({ addJournalEntry, entries }) => {
  const [newEntry, setNewEntry] = useState('');

  const handleSave = () => {
    if (newEntry.trim()) {
      addJournalEntry(newEntry);
      setNewEntry('');
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-brand-light-green mb-4">My Journal</h2>
      <div className="bg-brand-secondary p-4 rounded-lg shadow-lg mb-6">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="What's on your mind today?"
          className="w-full h-32 bg-brand-dark border border-slate-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-green text-brand-text resize-none"
        />
        <button
          onClick={handleSave}
          className="mt-3 w-full bg-brand-green text-brand-dark font-bold py-2 px-4 rounded-lg hover:bg-emerald-400 transition-colors"
        >
          Save Entry
        </button>
      </div>

      <h3 className="text-xl font-semibold text-brand-light-green mb-3">Past Entries</h3>
      <div className="space-y-4">
        {entries.length > 0 ? (
          [...entries].reverse().map((entry, index) => (
            <div key={index} className="bg-brand-secondary p-4 rounded-lg shadow">
              <p className="text-sm text-brand-text-secondary mb-2">
                {new Date(entry.date).toLocaleString()}
              </p>
              <p className="text-brand-text whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))
        ) : (
          <p className="text-brand-text-secondary text-center py-4">You have no journal entries yet.</p>
        )}
      </div>
    </div>
  );
};

export default Journal;
