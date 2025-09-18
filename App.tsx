
import React, { useState, useCallback } from 'react';
import Chat from './components/Chat';
import Journal from './components/Journal';
import MoodTracker from './components/MoodTracker';
import Trends from './components/Trends';
import SOSGuide from './components/SOSGuide';
import BottomNav from './components/BottomNav';
import { JournalEntry, MoodEntry, View, Message } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Chat);
  const [moods, setMoods] = useLocalStorage<MoodEntry[]>('moods', []);
  const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>('journalEntries', []);
  const [chatMessages, setChatMessages] = useLocalStorage<Message[]>('chatMessages', [
    { id: 'initial', text: "Hello! I'm Aura, your mental wellness companion. How are you feeling today?", sender: 'ai' }
  ]);

  const addMood = useCallback((mood: string) => {
    setMoods(prevMoods => [...prevMoods, { mood, date: new Date().toISOString() }]);
  }, [setMoods]);

  const addJournalEntry = useCallback((content: string) => {
    setJournalEntries(prevEntries => [...prevEntries, { content, date: new Date().toISOString() }]);
  }, [setJournalEntries]);

  const renderView = () => {
    switch (activeView) {
      case View.Mood:
        return <MoodTracker addMood={addMood} />;
      case View.Journal:
        return <Journal addJournalEntry={addJournalEntry} entries={journalEntries} />;
      case View.Trends:
        return <Trends moodData={moods} />;
      case View.SOS:
        return <SOSGuide />;
      case View.Chat:
      default:
        return <Chat messages={chatMessages} setMessages={setChatMessages} />;
    }
  };

  return (
    <div className="bg-brand-dark text-brand-text min-h-screen font-sans flex flex-col">
      <header className="p-4 bg-brand-secondary/50 backdrop-blur-sm sticky top-0 z-10 text-center">
        <h1 className="text-2xl font-bold text-brand-green">Aura</h1>
        <p className="text-sm text-brand-text-secondary">Your Mental Wellness Companion</p>
      </header>
      <main className="flex-grow container mx-auto p-4 pb-24">
        {renderView()}
      </main>
      <BottomNav activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};

export default App;