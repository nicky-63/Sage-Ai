import React from 'react';
import { View } from '../types';
import { ChatIcon, JournalIcon, MoodIcon, SOSTherapyIcon, TrendsIcon } from './icons/NavIcons';

interface BottomNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  view: View;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full transition-all duration-300 ease-in-out transform ${
      isActive ? 'text-brand-accent -translate-y-2' : 'text-brand-text-secondary hover:text-brand-light-accent'
    }`}
    aria-label={`Go to ${label}`}
  >
    <div className={`p-3 rounded-full transition-colors duration-300 ${isActive ? 'bg-brand-accent/20' : ''}`}>
      {icon}
    </div>
    <span className="text-xs mt-1 font-semibold">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { view: View.Chat, label: 'Chat', icon: <ChatIcon /> },
    { view: View.Mood, label: 'Mood', icon: <MoodIcon /> },
    { view: View.Journal, label: 'Journal', icon: <JournalIcon /> },
    { view: View.Trends, label: 'Trends', icon: <TrendsIcon /> },
    { view: View.SOS, label: 'SOS', icon: <SOSTherapyIcon /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-brand-secondary/90 backdrop-blur-lg border-t border-white/10 shadow-lg z-20 rounded-t-2xl">
      <div className="flex justify-around items-end max-w-2xl mx-auto h-20 pb-2">
        {navItems.map((item) => (
          <NavItem
            key={item.view}
            view={item.view}
            label={item.label}
            icon={item.icon}
            isActive={activeView === item.view}
            onClick={() => setActiveView(item.view)}
          />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;