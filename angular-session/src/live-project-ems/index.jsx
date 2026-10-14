import { useState } from 'react'

// Initial EMS event data
const INITIAL_EMS_EVENTS = [
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
    title: 'Community GenAI Hackathon 2026',
    category: 'Hackathon',
    date: 'Dec 02, 2026',
    time: '9:00 AM - 9:00 PM',
    location: 'Tech Innovation Park',
    seats: 4,
    speaker: 'AI Guild Mentors',
    description: 'Build and demo helpful AI applications with mentors and a community judging panel.',
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
]

// --- Stage 0: Static UI ---
function Stage0() {
  return (
    <div className="ems-container">
      <div className="event-card">
        <div className="event-header">
          <h3 className="event-title">Angular 18 & Signals Masterclass</h3>
          <span className="tag-badge">Workshop</span>
        </div>
        <p className="event-desc">
          Learn modern Angular Standalone Components, Signal reactivity, and Vite tooling.
        </p>
        <div className="event-meta-row">
          <span>📅 Nov 20, 2026 · Auditorium A</span>
          <span className="seats-badge seats-open">45 seats remaining</span>
        </div>
        <div className="card-actions">
          <button className="btn" disabled>Static preview · RSVP starts in Stage 4</button>
        </div>
      </div>
    </div>
  )
}

const Stage0Code = `@Component({
  selector: 'app-event-card',
  standalone: true,
  template: \`
    <div class="event-card">
      <div class="event-header">
        <h3 class="event-title">Angular 18 & Signals Masterclass</h3>
        <span class="tag-badge">Workshop</span>
      </div>
      <p class="event-desc">
        Learn modern Angular Standalone Components, Signal reactivity, and Vite tooling.
      </p>
      <div class="event-meta-row">
        <span>📅 Nov 20, 2026 · Auditorium A</span>
        <span class="seats-badge seats-open">45 seats remaining</span>
      </div>
      <div class="card-actions">
        <button class="btn">RSVP Now</button>
      </div>
    </div>
  \`
})
export class EventCardComponent {}`

// --- Stage 1: Components Breakdown ---
function Stage1() {
  return (
    <div className="ems-container">
      <div className="ems-stat-box" style={{ textAlign: 'left', marginBottom: '8px' }}>
        <h4 style={{ fontSize: '15px', color: 'var(--text)' }}>Event Management Portal</h4>
        <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Components: Header · StatsBar · EventCard</p>
      </div>
      <div className="ems-stats-grid">
        <div className="ems-stat-box">
          <div className="ems-stat-num">4</div>
          <div className="ems-stat-label">Events</div>
        </div>
        <div className="ems-stat-box">
          <div className="ems-stat-num">129</div>
          <div className="ems-stat-label">Total Seats</div>
        </div>
        <div className="ems-stat-box">
          <div className="ems-stat-num">1</div>
          <div className="ems-stat-label">Sold Out</div>
        </div>
      </div>
      <Stage0 />
    </div>
  )
}

const Stage1Code = `@Component({
  selector: 'app-event-stats',
  standalone: true,
  template: \`
    <div class="ems-stats-grid">
      <div class="ems-stat-box">
        <div class="ems-stat-num">{{ totalEvents }}</div>
        <div class="ems-stat-label">Events</div>
      </div>
      <div class="ems-stat-box">
        <div class="ems-stat-num">{{ totalSeats }}</div>
        <div class="ems-stat-label">Total Seats</div>
      </div>
      <div class="ems-stat-box">
        <div class="ems-stat-num">{{ soldOut }}</div>
        <div class="ems-stat-label">Sold Out</div>
      </div>
    </div>
  \`
})
export class EventStatsComponent {
  totalEvents = 4;
  totalSeats = 129;
  soldOut = 1;
}`

// --- Stage 2: Dynamic List Rendering ---
function Stage2() {
  return (
    <div className="ems-container">
      {INITIAL_EMS_EVENTS.map(ev => (
        <div key={ev.id} className="event-card">
          <div className="event-header">
            <h3 className="event-title">{ev.title}</h3>
            <span className="tag-badge">{ev.category}</span>
          </div>
          <p className="event-desc">{ev.description}</p>
          <div className="event-meta-row">
            <span>📅 {ev.date} · {ev.location}</span>
            <span className={ev.seats > 0 ? "seats-badge seats-open" : "seats-badge seats-sold"}>
              {ev.seats > 0 ? `${ev.seats} seats available` : 'SOLD OUT'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

const Stage2Code = `@Component({
  selector: 'app-event-list',
  standalone: true,
  template: \`
    <div class="ems-container">
      @for (ev of events; track ev.id) {
        <div class="event-card">
          <div class="event-header">
            <h3 class="event-title">{{ ev.title }}</h3>
            <span class="tag-badge">{{ ev.category }}</span>
          </div>
          <p class="event-desc">{{ ev.description }}</p>
          <div class="event-meta-row">
            <span>📅 {{ ev.date }} · {{ ev.location }}</span>
            <span [class.seats-open]="ev.seats > 0" [class.seats-sold]="ev.seats === 0">
              {{ ev.seats > 0 ? ev.seats + ' seats available' : 'SOLD OUT' }}
            </span>
          </div>
        </div>
      } @empty {
        <p class="empty-state">No events available right now.</p>
      }
    </div>
  \`
})
export class EventListComponent {
  events = [...INITIAL_EVENTS];
}`

// --- Stage 3: Category Filtering ---
function Stage3() {
  const [selectedCat, setSelectedCat] = useState('All')
  const categories = ['All', 'Workshop', 'Hackathon', 'Design', 'Networking']

  const filtered = selectedCat === 'All'
    ? INITIAL_EMS_EVENTS
    : INITIAL_EMS_EVENTS.filter(e => e.category === selectedCat)

  return (
    <div className="ems-container">
      <div className="category-pills">
        {categories.map(cat => (
          <button
            key={cat}
            className={`pill-btn ${selectedCat === cat ? 'active' : ''}`}
            onClick={() => setSelectedCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {filtered.map(ev => (
        <div key={ev.id} className="event-card">
          <div className="event-header">
            <h3 className="event-title">{ev.title}</h3>
            <span className="tag-badge">{ev.category}</span>
          </div>
          <p className="event-desc">{ev.description}</p>
          <div className="event-meta-row">
            <span>📅 {ev.date}</span>
            <span className={ev.seats > 0 ? "seats-badge seats-open" : "seats-badge seats-sold"}>
              {ev.seats > 0 ? `${ev.seats} seats` : 'SOLD OUT'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

const Stage3Code = `@Component({
  selector: 'app-filtered-events',
  standalone: true,
  template: \`
    <div class="category-pills">
      @for (cat of categories; track cat) {
        <button
          class="pill-btn"
          [class.active]="selectedCategory() === cat"
          (click)="selectCategory(cat)">
          {{ cat }}
        </button>
      }
    </div>

    @for (ev of filteredEvents(); track ev.id) {
      <app-event-card [event]="ev" />
    }
  \`
})
export class FilteredEventsComponent {
  categories = ['All', 'Workshop', 'Hackathon', 'Design', 'Networking'];
  selectedCategory = signal('All');
  events = signal(INITIAL_EVENTS);

  filteredEvents = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.events();
    return this.events().filter(e => e.category === cat);
  });

  selectCategory(cat: string) {
    this.selectedCategory.set(cat);
  }
}`

// --- Stage 4: Interactive RSVP & Capacity ---
function Stage4() {
  const [events, setEvents] = useState(INITIAL_EMS_EVENTS.map(e => ({ ...e })))
  const [userRsvps, setUserRsvps] = useState(new Set([2])) // user pre-registered for event 2

  function toggleRsvp(id) {
    if (!events.some(e => e.id === id && (e.seats > 0 || userRsvps.has(id)))) return
    setEvents(list => list.map(ev => {
      if (ev.id !== id) return ev
      const isRegistered = userRsvps.has(id)
      if (isRegistered) {
        // cancel RSVP
        return { ...ev, seats: ev.seats + 1 }
      } else {
        // register RSVP
        if (ev.seats <= 0) return ev
        return { ...ev, seats: ev.seats - 1 }
      }
    }))

    setUserRsvps(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="ems-container">
      {events.map(ev => {
        const isRegistered = userRsvps.has(ev.id)
        const isSoldOut = ev.seats <= 0 && !isRegistered

        return (
          <div key={ev.id} className="event-card">
            <div className="event-header">
              <h3 className="event-title">{ev.title}</h3>
              <span className="tag-badge">{ev.category}</span>
            </div>
            <p className="event-desc">{ev.description}</p>
            <div className="event-meta-row">
              <span>📅 {ev.date} · {ev.location}</span>
              <span className={ev.seats > 0 ? "seats-badge seats-open" : "seats-badge seats-sold"}>
                {ev.seats > 0 ? `${ev.seats} seats available` : 'SOLD OUT'}
              </span>
            </div>
            <div className="card-actions">
              {isRegistered ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="status-badge-registered">✓ Registered</span>
                  <button className="btn btn-auto btn-outline" onClick={() => toggleRsvp(ev.id)}>
                    Cancel RSVP
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-auto"
                  disabled={isSoldOut}
                  onClick={() => toggleRsvp(ev.id)}
                >
                  {isSoldOut ? 'Sold Out' : 'Register / RSVP'}
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const Stage4Code = `@Component({
  selector: 'app-rsvp-card',
  standalone: true,
  template: \`
    <div class="event-card">
      <h3>{{ event().title }}</h3>
      <p>{{ event().seats }} seats left</p>

      @if (isRegistered()) {
        <span class="status-badge-registered">✓ Confirmed</span>
        <button (click)="cancelRsvp()">Cancel RSVP</button>
      } @else {
        <button [disabled]="event().seats <= 0" (click)="bookRsvp()">
          {{ event().seats > 0 ? 'Register Now' : 'Sold Out' }}
        </button>
      }
    </div>
  \`
})
export class RsvpCardComponent {
  event = input.required<AppEvent>();
  isRegistered = signal(false);

  bookRsvp() {
    if (this.event().seats > 0) {
      this.isRegistered.set(true);
      // Notify service / backend
    }
  }

  cancelRsvp() {
    this.isRegistered.set(false);
  }
}`

// --- Stage 5: Add Event Form Modal ---
function Stage5() {
  const [events, setEvents] = useState(INITIAL_EMS_EVENTS.map(e => ({ ...e })))
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Workshop')
  const [seats, setSeats] = useState(50)

  function handleCreate(e) {
    e.preventDefault()
    if (title.trim().length < 3 || !Number.isInteger(Number(seats)) || Number(seats) <= 0) return
    const newEv = {
      id: Date.now(),
      title,
      category,
      seats: Number(seats),
      date: 'Jan 28, 2027',
      location: 'Main Convention Hall',
      speaker: 'New Speaker',
      description: 'Newly created event via Angular Reactive Forms.'
    }
    setEvents([newEv, ...events])
    setTitle('')
    setShowModal(false)
  }

  return (
    <div className="ems-container">
      <div className="card-actions" style={{ marginBottom: '12px' }}>
        <h4 style={{ fontSize: '15px' }}>Event Feed ({events.length} events)</h4>
        <button className="btn btn-auto" onClick={() => setShowModal(true)}>
          + Add New Event
        </button>
      </div>

      {events.map(ev => (
        <div key={ev.id} className="event-card">
          <div className="event-header">
            <h3 className="event-title">{ev.title}</h3>
            <span className="tag-badge">{ev.category}</span>
          </div>
          <div className="event-meta-row">
            <span>📅 {ev.date}</span>
            <span className="seats-badge seats-open">{ev.seats} seats</span>
          </div>
        </div>
      ))}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create New Event</h3>
              <button className="btn btn-auto btn-outline" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Event Title</label>
                <input
                  className="input-field"
                  required
                  minLength={3}
                  placeholder="e.g. Angular Architecture 2027"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select className="input-field" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Design">Design</option>
                  <option value="Networking">Networking</option>
                  <option value="Tech">Tech</option>
                </select>
              </div>
              <div className="form-group">
                <label>Total Seats</label>
                <input
                  type="number"
                  className="input-field"
                  min="1"
                  value={seats}
                  onChange={e => setSeats(e.target.value)}
                />
              </div>
              <div className="card-actions" style={{ marginTop: '16px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn">
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const Stage5Code = `@Component({
  selector: 'app-add-event-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <div class="modal-overlay">
      <div class="modal-content">
        <h3>Create New Event</h3>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="form-group">
            <label>Title</label>
            <input formControlName="title" class="input-field" />
          </div>
          <div class="form-group">
            <label>Category</label>
            <select formControlName="category" class="input-field">
              <option value="Workshop">Workshop</option>
              <option value="Tech">Tech</option>
            </select>
          </div>
          <div class="form-group">
            <label>Seats</label>
            <input type="number" formControlName="seats" class="input-field" />
          </div>
          <button type="submit" [disabled]="form.invalid" class="btn">
            Publish Event
          </button>
        </form>
      </div>
    </div>
  \`
})
export class AddEventDialogComponent {
  private fb = inject(FormBuilder);
  eventCreated = output<NewEvent>();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    category: ['Workshop', Validators.required],
    seats: [50, [Validators.required, Validators.min(1)]]
  });

  submit() {
    if (this.form.valid) {
      this.eventCreated.emit(this.form.value as NewEvent);
    }
  }
}`

// --- Stage 6: Complete Connected Dashboard ---
function Stage6() {
  const [events, setEvents] = useState(INITIAL_EMS_EVENTS.map(e => ({ ...e })))
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [registeredIds, setRegisteredIds] = useState(new Set([1]))
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCat, setNewCat] = useState('Tech')
  const [newSeats, setNewSeats] = useState(60)

  // Filtering
  const filtered = events.filter(e => {
    const matchCat = category === 'All' || e.category === category
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
                        e.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  // Stats
  const totalSeats = events.reduce((sum, e) => sum + e.seats, 0)
  const myRsvps = registeredIds.size

  function handleRsvpToggle(id) {
    if (!events.some(e => e.id === id && (e.seats > 0 || registeredIds.has(id)))) return
    setEvents(list => list.map(ev => {
      if (ev.id !== id) return ev
      const isReg = registeredIds.has(id)
      if (isReg) {
        return { ...ev, seats: ev.seats + 1 }
      } else {
        if (ev.seats <= 0) return ev
        return { ...ev, seats: ev.seats - 1 }
      }
    }))

    setRegisteredIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleDelete(id) {
    setEvents(list => list.filter(e => e.id !== id))
    setRegisteredIds(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function handleCreateSubmit(e) {
    e.preventDefault()
    if (newTitle.trim().length < 3 || !Number.isInteger(Number(newSeats)) || Number(newSeats) <= 0) return
    const newEntry = {
      id: Date.now(),
      title: newTitle,
      category: newCat,
      date: 'Feb 15, 2027',
      time: '11:00 AM - 3:00 PM',
      location: 'Tech Innovation Hall & Remote',
      seats: Number(newSeats),
      speaker: 'Guest Lead',
      description: 'Newly announced community session created from dashboard.'
    }
    setEvents([newEntry, ...events])
    setCategory('All')
    setSearch('')
    setNewTitle('')
    setShowAddModal(false)
  }

  return (
    <div className="ems-container">
      {/* Stats Bar */}
      <div className="ems-stats-grid">
        <div className="ems-stat-box">
          <div className="ems-stat-num">{events.length}</div>
          <div className="ems-stat-label">Active Events</div>
        </div>
        <div className="ems-stat-box">
          <div className="ems-stat-num">{totalSeats}</div>
          <div className="ems-stat-label">Total Open Seats</div>
        </div>
        <div className="ems-stat-box">
          <div className="ems-stat-num">{myRsvps}</div>
          <div className="ems-stat-label">My Registrations</div>
        </div>
      </div>

      {/* Search and Action Bar */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          className="input-field"
          placeholder="🔍 Search events by keyword or topic..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn btn-auto" onClick={() => setShowAddModal(true)}>
          + Create
        </button>
      </div>

      {/* Category Pills */}
      <div className="category-pills">
        {['All', 'Workshop', 'Hackathon', 'Design', 'Networking', 'Tech'].map(cat => (
          <button
            key={cat}
            className={`pill-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events List */}
      {filtered.map(ev => {
        const isRegistered = registeredIds.has(ev.id)
        const isSoldOut = ev.seats <= 0 && !isRegistered

        return (
          <div key={ev.id} className="event-card">
            <div className="event-header">
              <div>
                <h3 className="event-title">{ev.title}</h3>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Speaker: {ev.speaker}</span>
              </div>
              <span className="tag-badge">{ev.category}</span>
            </div>
            <p className="event-desc">{ev.description}</p>
            <div className="event-meta-row">
              <span>📅 {ev.date} · {ev.time}</span>
              <span className={ev.seats > 0 ? "seats-badge seats-open" : "seats-badge seats-sold"}>
                {ev.seats > 0 ? `${ev.seats} seats available` : 'SOLD OUT'}
              </span>
            </div>
            <div className="card-actions">
              {isRegistered ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="status-badge-registered">✓ Registered</span>
                  <button className="btn btn-auto btn-outline" onClick={() => handleRsvpToggle(ev.id)}>
                    Cancel RSVP
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-auto"
                  disabled={isSoldOut}
                  onClick={() => handleRsvpToggle(ev.id)}
                >
                  {isSoldOut ? 'Sold Out' : 'Register / RSVP'}
                </button>
              )}
              <button
                className="btn btn-auto btn-outline"
                style={{ color: '#ef4444', borderColor: '#fee2e2' }}
                onClick={() => handleDelete(ev.id)}
              >
                Delete
              </button>
            </div>
          </div>
        )
      })}

      {filtered.length === 0 && (
        <div className="ex-panel" style={{ textAlign: 'center', padding: '32px' }}>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No events match your search or filter.</p>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Publish New Event</h3>
              <button className="btn btn-auto btn-outline" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateSubmit}>
              <div className="form-group">
                <label>Event Title</label>
                <input
                  className="input-field"
                  required
                  minLength={3}
                  placeholder="e.g. Accessible Product Design Workshop"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select className="input-field" value={newCat} onChange={e => setNewCat(e.target.value)}>
                  <option value="Tech">Tech</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Design">Design</option>
                  <option value="Networking">Networking</option>
                </select>
              </div>
              <div className="form-group">
                <label>Capacity (Seats)</label>
                <input
                  type="number"
                  className="input-field"
                  min="1"
                  value={newSeats}
                  onChange={e => setNewSeats(e.target.value)}
                />
              </div>
              <div className="card-actions" style={{ marginTop: '16px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn">
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const Stage6Code = `// Standalone Event Management Dashboard in Angular 18
@Component({
  selector: 'app-event-management-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: \`
    <div class="ems-container">
      <!-- Stats Summary Bar -->
      <div class="ems-stats-grid">
        <div class="ems-stat-box">
          <div class="ems-stat-num">{{ events().length }}</div>
          <div class="ems-stat-label">Active Events</div>
        </div>
        <div class="ems-stat-box">
          <div class="ems-stat-num">{{ totalSeats() }}</div>
          <div class="ems-stat-label">Total Open Seats</div>
        </div>
        <div class="ems-stat-box">
          <div class="ems-stat-num">{{ registeredIds().size }}</div>
          <div class="ems-stat-label">My RSVPs</div>
        </div>
      </div>

      <!-- Search & Controls -->
      <div class="row">
        <input [ngModel]="searchQuery()" (ngModelChange)="searchQuery.set($event)" placeholder="🔍 Search events..." class="input-field" />
        <button (click)="openAddModal()" class="btn btn-auto">+ Create</button>
      </div>

      <!-- Category Filter Pills -->
      <div class="category-pills">
        @for (cat of categories; track cat) {
          <button
            class="pill-btn"
            [class.active]="selectedCategory() === cat"
            (click)="selectedCategory.set(cat)">
            {{ cat }}
          </button>
        }
      </div>

      <!-- Dynamic Event Cards -->
      @for (ev of filteredEvents(); track ev.id) {
        <div class="event-card">
          <div class="event-header">
            <h3>{{ ev.title }}</h3>
            <span class="tag-badge">{{ ev.category }}</span>
          </div>
          <p>{{ ev.description }}</p>
          <div class="event-meta-row">
            <span>📅 {{ ev.date }} · {{ ev.location }}</span>
            <span [class.seats-open]="ev.seats > 0" [class.seats-sold]="ev.seats <= 0">
              {{ ev.seats > 0 ? ev.seats + ' seats' : 'SOLD OUT' }}
            </span>
          </div>
          <div class="card-actions">
            @if (isRegistered(ev.id)) {
              <span class="status-badge-registered">✓ Registered</span>
              <button (click)="cancelRsvp(ev.id)" class="btn btn-auto btn-outline">Cancel</button>
            } @else {
              <button [disabled]="ev.seats <= 0" (click)="registerRsvp(ev.id)" class="btn btn-auto">
                {{ ev.seats > 0 ? 'Register / RSVP' : 'Sold Out' }}
              </button>
            }
          </div>
        </div>
      } @empty {
        <p class="empty-state">No matching events found.</p>
      }
    </div>
  \`
})
export class EventManagementDashboardComponent {
  events = signal<AppEvent[]>(INITIAL_EVENTS);
  selectedCategory = signal<string>('All');
  searchQuery = signal<string>('');
  registeredIds = signal<Set<number>>(new Set([1]));

  totalSeats = computed(() => this.events().reduce((sum, e) => sum + e.seats, 0));

  filteredEvents = computed(() => {
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase();
    return this.events().filter(e => {
      const matchCat = cat === 'All' || e.category === cat;
      const matchQuery = e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
  });

  registerRsvp(id: number) {
    this.events.update(list => list.map(e => e.id === id && e.seats > 0 ? { ...e, seats: e.seats - 1 } : e));
    this.registeredIds.update(set => new Set(set).add(id));
  }

  cancelRsvp(id: number) {
    this.events.update(list => list.map(e => e.id === id ? { ...e, seats: e.seats + 1 } : e));
    this.registeredIds.update(set => {
      const copy = new Set(set);
      copy.delete(id);
      return copy;
    });
  }

  isRegistered(id: number): boolean {
    return this.registeredIds().has(id);
  }
}`

export const emsStages = [
  {
    id: 'ems-0',
    name: 'Stage 0 — Static Event Card',
    topic: 'Components & Templates',
    intro: 'HTML and CSS card representation of an event with title, badge, date, capacity, and RSVP button.',
    steps: [
      'Create the standalone component: EventCardComponent with standalone: true',
      'Define template with card structure: header, title, category badge, and meta row',
      'Style the card with border-radius, subtle shadow, and color tokens',
      'Notice: The card renders cleanly, but all data is hardcoded and button has no listener yet.'
    ],
    code: Stage0Code,
    Component: Stage0,
  },
  {
    id: 'ems-1',
    name: 'Stage 1 — Component Architecture',
    topic: 'Component Decomposition',
    intro: 'Decomposing the screen into modular reusable pieces: StatsBar and EventCard.',
    steps: [
      'Extract the StatsBar component to display aggregate metrics (Total Events, Total Seats, Sold Out)',
      'Keep each component focused on a single responsibility',
      'Notice: The layout looks structured and ready for dynamic data.'
    ],
    code: Stage1Code,
    Component: Stage1,
  },
  {
    id: 'ems-2',
    name: 'Stage 2 — Dynamic List Rendering',
    topic: 'Modern Control Flow (@for & @empty)',
    intro: 'Rendering dynamic event arrays with @for (ev of events; track ev.id) and @empty fallback.',
    steps: [
      'Replace hardcoded cards with @for block looping over an events array',
      'Set track ev.id for optimal DOM reconciliation',
      'Add @empty block for zero-event fallback',
      'Notice: Multiple diverse events now render from data automatically.'
    ],
    code: Stage2Code,
    Component: Stage2,
  },
  {
    id: 'ems-3',
    name: 'Stage 3 — Category Filtering',
    topic: 'Computed Signals & Filtering',
    intro: 'Filter events by category (Workshop, Hackathon, Design, Networking) using computed signals.',
    steps: [
      'Create a selectedCategory signal with default "All"',
      'Compute filteredEvents reactively whenever selectedCategory changes',
      'Add category pill buttons with active class binding [class.active]',
      'Click each category pill to observe immediate filtering.'
    ],
    code: Stage3Code,
    Component: Stage3,
  },
  {
    id: 'ems-4',
    name: 'Stage 4 — Interactive RSVP & Capacity',
    topic: 'Signals State & Updates',
    intro: 'Manage real-time registration with seat decrements, sold out guards, and RSVP cancellation.',
    steps: [
      'Handle RSVP action: decrement available seats by 1 and mark attendee registered',
      'Disable the register button if seats <= 0 with [disabled]="ev.seats <= 0"',
      'Provide a Cancel RSVP button that restores the seat count',
      'Try clicking "Register / RSVP" and watch remaining seats update live!'
    ],
    code: Stage4Code,
    Component: Stage4,
  },
  {
    id: 'ems-5',
    name: 'Stage 5 — Add Event Form Modal',
    topic: 'Forms & Event Creation',
    intro: 'Modal dialog with form validation to publish custom events to the feed dynamically.',
    steps: [
      'Create a modal with input fields for title, category, and total seats',
      'Validate inputs to prevent blank submissions',
      'Prepend newly created events to the active events signal',
      'Click "+ Add New Event", fill the form and publish to test.'
    ],
    code: Stage5Code,
    Component: Stage5,
  },
  {
    id: 'ems-6',
    name: 'Stage 6 — Complete Connected EMS Dashboard',
    topic: 'Full Event Management System',
    intro: 'Full real-time dashboard integrating search, category filtering, RSVP management, deletion, and stats.',
    steps: [
      'Aggregate dashboard metrics: Active Events, Open Seats, and Personal RSVPs',
      'Live keyword search filtering across titles and descriptions',
      'Full CRUD actions: Add, Register RSVP, Cancel RSVP, and Delete event',
      'This completes the modern Angular Event Management System project!'
    ],
    code: Stage6Code,
    Component: Stage6,
  }
]
