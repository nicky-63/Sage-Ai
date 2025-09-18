
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
}> = ({ view, label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${
      isActive ? 'text-brand-green' : 'text-brand-text-secondary hover:text-brand-light-green'
    }`}
    aria-label={`Go to ${label}`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
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
    <nav className="fixed bottom-0 left-0 right-0 bg-brand-secondary border-t border-slate-700 shadow-lg z-20">
      <div className="flex justify-around max-w-2xl mx-auto h-16">
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
