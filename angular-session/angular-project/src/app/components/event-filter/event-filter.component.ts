import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="category-pills">
      @for (cat of categories; track cat) {
        <button
          class="pill-btn"
          [class.active]="selected() === cat"
          (click)="selectCategory.emit(cat)">
          {{ cat }}
        </button>
      }
    </div>
  `,
  styles: [`
    .category-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 14px 0;
    }
    .pill-btn {
      border: 1px solid #e3e6f0;
      background: #fff;
      color: #657189;
      font-size: 12.5px;
      font-weight: 600;
      padding: 5px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .pill-btn.active {
      background: linear-gradient(135deg, #6255d5, #493bb5);
      color: #fff;
      border-color: #5548c8;
    }
  `]
})
export class EventFilterComponent {
  categories = ['All', 'Workshop', 'Hackathon', 'Design', 'Networking', 'Tech'];
  selected = input<string>('All');
  selectCategory = output<string>();
}
