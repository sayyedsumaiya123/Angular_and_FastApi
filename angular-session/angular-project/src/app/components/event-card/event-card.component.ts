import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEvent } from '../../models/event.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="event-card">
      <div class="event-header">
        <div>
          <h3 class="event-title">{{ event().title }}</h3>
          <span class="speaker-text">Speaker: {{ event().speaker }}</span>
        </div>
        <span class="tag-badge">{{ event().category }}</span>
      </div>

      <p class="event-desc">{{ event().description }}</p>

      <div class="event-meta-row">
        <span>📅 {{ event().date }} · {{ event().time }}</span>
        <span [class.seats-open]="event().seats > 0" [class.seats-sold]="event().seats <= 0">
          {{ event().seats > 0 ? event().seats + ' seats available' : 'SOLD OUT' }}
        </span>
      </div>

      <div class="card-actions">
        @if (isRegistered()) {
          <div class="registered-actions">
            <span class="status-badge-registered">✓ Registered</span>
            <button class="btn btn-auto btn-outline" (click)="cancelRsvp.emit(event().id)">
              Cancel RSVP
            </button>
          </div>
        } @else {
          <button
            class="btn btn-auto"
            [disabled]="event().seats <= 0"
            (click)="rsvp.emit(event().id)"
          >
            {{ event().seats > 0 ? 'Register / RSVP' : 'Sold Out' }}
          </button>
        }

        <button class="btn btn-auto btn-danger-outline" (click)="delete.emit(event().id)">
          Delete
        </button>
      </div>
    </div>
  `,
  styles: [`
    .event-card {
      background: #fff;
      border: 1px solid #e3e6f0;
      border-radius: 12px;
      padding: 18px;
      margin-bottom: 14px;
      box-shadow: 0 2px 5px rgba(24, 36, 58, 0.04), 0 12px 28px -24px rgba(24, 36, 58, 0.24);
      transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
    }
    .event-card:hover {
      transform: translateY(-2px);
      border-color: #d4d0f2;
      box-shadow: 0 16px 28px -22px rgba(50, 46, 125, 0.38);
    }
    .event-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }
    .event-title {
      font-size: 16px;
      font-weight: 700;
      color: #18243a;
    }
    .speaker-text {
      font-size: 12px;
      color: #657189;
    }
    .tag-badge {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(85, 72, 200, 0.09);
      color: #5548c8;
    }
    .event-desc {
      color: #4e5b72;
      font-size: 13.5px;
      margin-bottom: 12px;
      line-height: 1.4;
    }
    .event-meta-row {
      display: flex;
      justify-content: space-between;
      font-size: 12.5px;
      color: #657189;
      padding-bottom: 10px;
      margin-bottom: 12px;
      border-bottom: 1px dashed #e3e6f0;
    }
    .seats-open {
      color: #16856f;
      font-weight: 700;
    }
    .seats-sold {
      color: #c94e60;
      font-weight: 700;
    }
    .card-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .registered-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .status-badge-registered {
      color: #16856f;
      font-weight: 700;
      font-size: 12.5px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      background: linear-gradient(135deg, #6255d5, #493bb5);
      color: #fff;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 8px 16px -10px rgba(73, 59, 181, 0.75);
    }
    .btn:focus-visible {
      outline: 3px solid rgba(85, 72, 200, 0.24);
      outline-offset: 2px;
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn-auto {
      width: auto;
    }
    .btn-outline {
      background: transparent;
      border: 1px solid #cbd5e1;
      color: #334155;
    }
    .btn-danger-outline {
      background: transparent;
      border: 1px solid #fee2e2;
      color: #ef4444;
    }
  `]
})
export class EventCardComponent {
  event = input.required<AppEvent>();
  isRegistered = input<boolean>(false);

  rsvp = output<number>();
  cancelRsvp = output<number>();
  delete = output<number>();
}
