
export enum View {
  Chat = 'chat',
  Mood = 'mood',
  Journal = 'journal',
  Trends = 'trends',
  SOS = 'sos',
}

export interface MoodEntry {
  mood: string;
  date: string;
}

export interface JournalEntry {
  content: string;
  date: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}
