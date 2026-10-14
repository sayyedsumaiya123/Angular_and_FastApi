export interface AppEvent {
  id: number;
  title: string;
  category: 'Tech' | 'Workshop' | 'Hackathon' | 'Design' | 'Networking';
  date: string;
  time: string;
  location: string;
  seats: number;
  speaker: string;
  description: string;
}

export type NewEventPayload = Omit<AppEvent, 'id'>;
