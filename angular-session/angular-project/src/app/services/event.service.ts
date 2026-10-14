import { Injectable, signal, computed } from '@angular/core';
import { AppEvent, NewEventPayload } from '../models/event.model';

const SEED_EVENTS: AppEvent[] = [
  {
    id: 1,
    title: 'Angular 18 & Signals Masterclass',
    category: 'Workshop',
    date: 'Nov 20, 2026',
    time: '10:00 AM - 1:00 PM',
    location: 'Auditorium A & Live Stream',
    seats: 45,
    speaker: 'Sarah Connor',
    description: 'Learn modern Angular Standalone Components, Signal reactivity, and Vite tooling.',
  },
  {
    id: 2,
    title: 'Fullstack GenAI Hackathon 2026',
    category: 'Hackathon',
    date: 'Dec 02, 2026',
    time: '9:00 AM - 9:00 PM',
    location: 'Tech Innovation Park',
    seats: 4,
    speaker: 'AI Guild Mentors',
    description: 'Build and deploy fullstack AI applications using Angular and FastAPI.',
  },
  {
    id: 3,
    title: 'Modern Design Systems & Tokens',
    category: 'Design',
    date: 'Dec 14, 2026',
    time: '2:00 PM - 5:00 PM',
    location: 'Design Studio 4B',
    seats: 80,
    speaker: 'Elena Rostova',
    description: 'Practical design tokens, accessibility standards, and seamless component theming.',
  },
  {
    id: 4,
    title: 'Global Tech Founders Mixer',
    category: 'Networking',
    date: 'Jan 10, 2027',
    time: '6:30 PM - 9:30 PM',
    location: 'Skyline Terrace',
    seats: 0,
    speaker: 'Founder Panel',
    description: 'Connect with tech leads, venture founders, and open-source contributors.',
  }
];

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsSignal = signal<AppEvent[]>(SEED_EVENTS);
  private userRsvpsSignal = signal<Set<number>>(new Set([1]));

  readonly events = this.eventsSignal.asReadonly();
  readonly userRsvps = this.userRsvpsSignal.asReadonly();

  readonly totalSeats = computed(() =>
    this.eventsSignal().reduce((sum, e) => sum + e.seats, 0)
  );

  readonly myRsvpCount = computed(() =>
    this.userRsvpsSignal().size
  );

  addEvent(payload: NewEventPayload) {
    const newEvent: AppEvent = {
      ...payload,
      id: Date.now()
    };
    this.eventsSignal.update(list => [newEvent, ...list]);
  }

  deleteEvent(id: number) {
    this.eventsSignal.update(list => list.filter(e => e.id !== id));
    this.userRsvpsSignal.update(set => {
      const copy = new Set(set);
      copy.delete(id);
      return copy;
    });
  }

  rsvp(id: number) {
    const event = this.eventsSignal().find(e => e.id === id);
    if (!event || event.seats <= 0 || this.isRegistered(id)) return;
    this.eventsSignal.update(list =>
      list.map(e => e.id === id && e.seats > 0 ? { ...e, seats: e.seats - 1 } : e)
    );
    this.userRsvpsSignal.update(set => new Set(set).add(id));
  }

  cancelRsvp(id: number) {
    if (!this.isRegistered(id) || !this.eventsSignal().some(e => e.id === id)) return;
    this.eventsSignal.update(list =>
      list.map(e => e.id === id ? { ...e, seats: e.seats + 1 } : e)
    );
    this.userRsvpsSignal.update(set => {
      const copy = new Set(set);
      copy.delete(id);
      return copy;
    });
  }

  isRegistered(id: number): boolean {
    return this.userRsvpsSignal().has(id);
  }
}
