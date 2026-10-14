import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from './services/event.service';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventFilterComponent } from './components/event-filter/event-filter.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { NewEventPayload } from './models/event.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, EventCardComponent, EventFilterComponent, EventFormComponent],
  template: `
    <div class="ems-app">
      <header class="app-header">
        <div class="header-container">
          <div class="brand">
            <span class="badge">NG</span>
            <h1>Event Management System</h1>
          </div>
          <button class="btn btn-primary" (click)="isModalOpen.set(true)">+ Publish Event</button>
        </div>
      </header>

      <main class="main-content">
        <!-- Stats summary -->
        <div class="stats-row">
          <div class="stat-card">
            <span class="stat-num">{{ eventService.events().length }}</span>
            <span class="stat-label">Active Events</span>
          </div>
          <div class="stat-card">
            <span class="stat-num">{{ eventService.totalSeats() }}</span>
            <span class="stat-label">Open Seats</span>
          </div>
          <div class="stat-card">
            <span class="stat-num">{{ eventService.myRsvpCount() }}</span>
            <span class="stat-label">My Registrations</span>
          </div>
        </div>

        <!-- Search bar -->
        <div class="search-bar">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="🔍 Search events by topic, title or description..."
            class="search-input"
          />
        </div>

        <!-- Category filter -->
        <app-event-filter
          [selected]="selectedCategory()"
          (selectCategory)="selectedCategory.set($event)"
        />

        <!-- Events List -->
        <div class="events-list">
          @for (event of filteredEvents(); track event.id) {
            <app-event-card
              [event]="event"
              [isRegistered]="eventService.isRegistered(event.id)"
              (rsvp)="eventService.rsvp($event)"
              (cancelRsvp)="eventService.cancelRsvp($event)"
              (delete)="eventService.deleteEvent($event)"
            />
          } @empty {
            <div class="empty-box">
              <p>No events found matching your criteria.</p>
            </div>
          }
        </div>
      </main>

      <!-- Event Modal -->
      @if (isModalOpen()) {
        <app-event-form
          (close)="isModalOpen.set(false)"
          (eventCreated)="handleCreateEvent($event)"
        />
      }
    </div>
  `,
  styles: [`
    .ems-app {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      background: radial-gradient(ellipse at 50% -24%, rgba(85, 72, 200, 0.1), transparent 52%), #f5f6fb;
      color: #18243a;
    }
    .app-header {
      background: #fff;
      border-bottom: 1px solid #e3e6f0;
      box-shadow: 0 8px 24px -22px rgba(24, 36, 58, 0.3);
      padding: 16px 24px;
    }
    .header-container {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .badge {
      background: linear-gradient(135deg, #6255d5, #493bb5);
      color: #fff;
      font-weight: 800;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 13px;
    }
    .brand h1 {
      font-size: 20px;
      font-weight: 700;
    }
    .main-content {
      max-width: 900px;
      margin: 24px auto;
      padding: 0 16px;
    }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-bottom: 20px;
    }
    .stat-card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 16px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .stat-num {
      display: block;
      font-size: 24px;
      font-weight: 800;
      color: #5548c8;
    }
    .stat-label {
      font-size: 12px;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 600;
    }
    .search-input {
      width: 100%;
      padding: 10px 16px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      font-size: 14px;
      box-sizing: border-box;
      outline: none;
    }
    .search-input:focus {
      border-color: #5548c8;
      box-shadow: 0 0 0 3px rgba(85, 72, 200, 0.12);
    }
    .empty-box {
      background: #fff;
      border: 1px dashed #cbd5e1;
      border-radius: 12px;
      padding: 36px;
      text-align: center;
      color: #64748b;
    }
    .btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13.5px;
      border: none;
      cursor: pointer;
    }
    .btn-primary {
      background: linear-gradient(135deg, #6255d5, #493bb5);
      color: #fff;
      transition: transform 0.16s ease, box-shadow 0.16s ease, filter 0.16s ease;
    }
    .btn-primary:hover {
      transform: translateY(-1px);
      filter: brightness(1.04);
      box-shadow: 0 8px 16px -10px rgba(73, 59, 181, 0.75);
    }
    @media (max-width: 560px) {
      .app-header { padding: 14px 16px; }
      .brand h1 { font-size: 16px; }
      .stats-row { gap: 8px; }
      .stat-card { padding: 12px 8px; }
      .stat-num { font-size: 21px; }
    }
  `]
})
export class AppComponent {
  eventService = inject(EventService);

  selectedCategory = signal<string>('All');
  searchQuery = signal<string>('');
  isModalOpen = signal<boolean>(false);

  filteredEvents = computed(() => {
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.eventService.events().filter(e => {
      const matchCat = cat === 'All' || e.category === cat;
      const matchQuery = !query ||
        e.title.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query) ||
        e.speaker.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
  });

  handleCreateEvent(payload: NewEventPayload) {
    this.eventService.addEvent(payload);
    this.isModalOpen.set(false);
  }
}
