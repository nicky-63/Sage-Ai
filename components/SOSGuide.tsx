import React from 'react';
import { SOS_GUIDE_STEPS, CRISIS_HELPLINES } from '../constants';

const SOSGuide: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-brand-purple-accent mb-2">SOS Panic Guide</h2>
        <p className="text-brand-text-secondary">If you're feeling overwhelmed, follow these steps.</p>
      </div>

      <div className="space-y-4 mb-10">
        {SOS_GUIDE_STEPS.map((step, index) => (
          <div key={index} className="bg-brand-secondary p-4 rounded-lg shadow-lg flex items-center gap-4">
            <div className="text-3xl">{step.icon}</div>
            <div>
              <h3 className="font-bold text-brand-text">{step.title}</h3>
              <p className="text-brand-text-secondary text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-danger/10 border border-brand-danger/50 p-4 rounded-lg">
        <h3 className="text-2xl font-bold text-brand-danger mb-4 text-center">Crisis Helplines</h3>
        <p className="text-center text-brand-danger/80 mb-4">If you are in immediate danger or need to speak with a professional right away, please contact one of the resources below.</p>
        <ul className="space-y-3">
          {CRISIS_HELPLINES.map((helpline) => (
            <li key={helpline.name} className="bg-brand-secondary p-3 rounded-md flex justify-between items-center">
              <div>
                <p className="font-semibold text-brand-text">{helpline.name}</p>
                <p className="text-brand-accent font-mono">{helpline.number}</p>
              </div>
              <a href={helpline.website} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-text-secondary hover:text-brand-accent transition-colors">
                Visit Site &rarr;
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SOSGuide;