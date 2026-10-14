import { Component, output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewEventPayload } from '../../models/event.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>Create New Event</h3>
          <button class="close-btn" (click)="close.emit()">✕</button>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Event Title</label>
            <input formControlName="title" placeholder="e.g. Angular Signals in Production" class="form-input" />
            @if (form.get('title')?.touched && form.get('title')?.invalid) {
              <span class="err-msg">Title must be at least 3 characters</span>
            }
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Category</label>
              <select formControlName="category" class="form-input">
                <option value="Tech">Tech</option>
                <option value="Workshop">Workshop</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Design">Design</option>
                <option value="Networking">Networking</option>
              </select>
            </div>

            <div class="form-group">
              <label>Total Seats</label>
              <input type="number" formControlName="seats" class="form-input" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Date</label>
              <input formControlName="date" class="form-input" />
            </div>

            <div class="form-group">
              <label>Speaker</label>
              <input formControlName="speaker" class="form-input" />
            </div>
          </div>

          <div class="form-group">
            <label>Location</label>
            <input formControlName="location" class="form-input" />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea formControlName="description" rows="2" class="form-input"></textarea>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="close.emit()">Cancel</button>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Publish Event</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(24, 36, 58, 0.58);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    .modal-card {
      background: #fff;
      border-radius: 14px;
      padding: 24px;
      width: 90%;
      max-width: 480px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .close-btn {
      background: transparent;
      border: none;
      font-size: 16px;
      cursor: pointer;
      color: #657189;
    }
    .form-group {
      margin-bottom: 12px;
    }
    .form-row {
      display: flex;
      gap: 12px;
    }
    .form-row .form-group {
      flex: 1;
    }
    label {
      display: block;
      font-size: 12.5px;
      font-weight: 600;
      color: #3d4b63;
      margin-bottom: 4px;
    }
    .form-input {
      width: 100%;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      font-size: 13.5px;
      box-sizing: border-box;
      outline: none;
    }
    .form-input:focus {
      border-color: #5548c8;
      box-shadow: 0 0 0 3px rgba(85, 72, 200, 0.12);
    }
    .err-msg {
      color: #ef4444;
      font-size: 11.5px;
      margin-top: 2px;
    }
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 18px;
    }
    .btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      border: none;
    }
    .btn-secondary {
      background: #f1f5f9;
      color: #334155;
    }
    .btn-primary {
      background: linear-gradient(135deg, #6255d5, #493bb5);
      color: #fff;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 8px 16px -10px rgba(73, 59, 181, 0.75);
    }
    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class EventFormComponent {
  private fb = inject(FormBuilder);

  close = output<void>();
  eventCreated = output<NewEventPayload>();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    category: ['Workshop' as const, Validators.required],
    seats: [50, [Validators.required, Validators.min(1)]],
    date: ['Dec 18, 2026', Validators.required],
    time: ['2:00 PM - 5:00 PM', Validators.required],
    location: ['Virtual & Live', Validators.required],
    speaker: ['Industry Mentor', Validators.required],
    description: ['Interactive developer session with practical walkthroughs.', Validators.required],
  });

  onSubmit() {
    if (this.form.valid) {
      this.eventCreated.emit(this.form.value as NewEventPayload);
    }
  }
}
