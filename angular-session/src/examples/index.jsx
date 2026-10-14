import { useState } from 'react'

// --- 01 Components Preview ---
function ComponentsStarter() {
  return (
    <div className="event-card">
      <div className="event-title">Angular Connect 2026</div>
      <p className="event-desc">Annual conference for modern frontend development.</p>
      <div className="event-meta-row">
        <span>Static Date: Nov 15</span>
        <span className="seats-badge seats-open">Static Seats: 40</span>
      </div>
    </div>
  )
}

function ComponentsSolution() {
  const [title, setTitle] = useState('Angular Connect 2026')
  const event = {
    title,
    edition: 5,
    date: 'Nov 15, 2026',
    speaker: 'Sarah Connor',
    seats: 40
  }
  return (
    <div className="event-card"><label>Event title<input className="input-field" value={title} onChange={e => setTitle(e.target.value)} aria-label="Demo event title" /></label>
      <div className="event-header">
        <div className="event-title">{event.title} #{event.edition}</div>
        <span className="tag-badge">Speaker: {event.speaker.toUpperCase()}</span>
      </div>
      <p className="event-desc">Calculated Seats: {event.seats * 2} (Double Session Capacity)</p>
      <div className="event-meta-row">
        <span>Date: {event.date}</span>
        <span className="seats-badge seats-open">Open Seats: {event.seats}</span>
      </div>
    </div>
  )
}

// --- 02 Property & Event Binding Preview ---
function BindingStarter() {
  return (
    <div className="event-card">
      <div className="event-title">Vue to Angular Migration Workshop</div>
      <p className="event-desc">Buttons without binding do not react to clicks.</p>
      <button className="btn" disabled={false}>Register (No Action)</button>
    </div>
  )
}

function BindingSolution() {
  const [registered, setRegistered] = useState(false)
  const [clicks, setClicks] = useState(0)

  return (
    <div className="event-card">
      <div className="event-title">Vue to Angular Migration Workshop</div>
      <p className="event-desc">
        {registered ? 'You are registered for this workshop!' : 'Click the button below to bind click event.'}
      </p>
      <div className="card-actions">
        <button
          className={registered ? 'btn btn-secondary' : 'btn'}
          onClick={() => {
            setRegistered(!registered)
            setClicks(c => c + 1)
          }}
        >
          {registered ? 'Cancel Registration' : 'Register Now'}
        </button>
        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Clicks: {clicks}</span>
      </div>
    </div>
  )
}

// --- 03 Control Flow (@if & @for) Preview ---
function ControlFlowStarter() {
  const events = ['Keynote', 'Signals Workshop']
  return (
    <div className="event-card">
      <h4>Today's Agenda (Hardcoded)</h4>
      <p>• {events[0]}</p>
      <p>• {events[1]}</p>
    </div>
  )
}

function ControlFlowSolution() {
  const [items, setItems] = useState([
    { id: 1, title: 'Keynote Address', time: '10:00 AM', isLive: true },
    { id: 2, title: 'Signals Deep Dive', time: '11:30 AM', isLive: false },
    { id: 3, title: 'Lunch & Networking', time: '1:00 PM', isLive: false },
  ])
  const [filterLive, setFilterLive] = useState(false)

  const displayed = filterLive ? items.filter(i => i.isLive) : items

  return (
    <div className="event-card">
      <div className="card-actions" style={{ marginBottom: '12px' }}>
        <h4>Live Agenda (@for loop)</h4>
        <button className="btn btn-auto btn-outline" onClick={() => setFilterLive(!filterLive)}>
          {filterLive ? 'Show All' : 'Show Live Only (@if)'}
        </button>
      </div>
      {displayed.map(item => (
        <div key={item.id} className="event-meta-row" style={{ padding: '6px 0' }}>
          <span>{item.title} ({item.time})</span>
          {item.isLive ? (
            <span className="tag-badge" style={{ background: '#fee2e2', color: '#ef4444' }}>🔴 LIVE NOW</span>
          ) : (
            <span style={{ color: 'var(--muted)', fontSize: '12px' }}>Upcoming</span>
          )}
        </div>
      ))}
      {displayed.length === 0 && <p className="event-desc">@empty: No sessions match filter.</p>}
    </div>
  )
}

// --- 04 Signals & State Preview ---
function SignalsStarter() {
  return (
    <div className="event-card">
      <div className="event-title">Signal State Counter (Plain Variable)</div>
      <p className="event-desc">Plain fields can update during Angular change detection. Signals explicitly track reads and notify dependent computations.</p>
      <div className="event-meta-row">
        <span>Value: 0</span>
      </div>
    </div>
  )
}

function SignalsSolution() {
  const [count, setCount] = useState(15)
  const maxCapacity = 20
  const isFull = count >= maxCapacity

  return (
    <div className="event-card">
      <div className="event-title">Signals Reactive State</div>
      <p className="event-desc">
        Signal: <code>bookedSeats() = {count}</code> | Computed: <code>remaining() = {maxCapacity - count}</code>
      </p>
      <div className="card-actions">
        <button
          className="btn btn-auto"
          disabled={isFull}
          onClick={() => setCount(c => c + 1)}
        >
          {isFull ? 'Sold Out' : '+ Reserve Seat'}
        </button>
        <button
          className="btn btn-auto btn-outline"
          disabled={count <= 0}
          onClick={() => setCount(c => Math.max(0, c - 1))}
        >
          - Free Seat
        </button>
        <span className={isFull ? 'seats-badge seats-sold' : 'seats-badge seats-open'}>
          {isFull ? 'SOLD OUT' : `${maxCapacity - count} Seats Left`}
        </span>
      </div>
    </div>
  )
}

// --- 05 Inputs & Outputs Preview ---
function InputsOutputsStarter() {
  return (
    <div className="event-card">
      <p className="event-desc">Single static card without input parameters or output emitters.</p>
    </div>
  )
}

function InputsOutputsSolution() {
  const [rsvps, setRsvps] = useState([])
  const event = { id: 101, title: 'Micro-frontends in Practice', speaker: 'Dan' }

  return (
    <div className="event-card">
      <div className="event-title">{event.title}</div>
      <p className="event-desc">Passed via <code>input()</code> from Parent</p>
      <div className="card-actions">
        <button
          className="btn btn-auto"
          onClick={() => setRsvps(prev => [...prev, `Attendee #${prev.length + 1}`])}
        >
          Emit output() RSVP
        </button>
        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
          Parent received: {rsvps.length} RSVP events
        </span>
      </div>
    </div>
  )
}

// --- 06 Two-Way Binding [(ngModel)] Preview ---
function TwoWayStarter() {
  return (
    <div className="event-card">
      <label style={{ fontSize: '12px', fontWeight: 600 }}>Attendee Name:</label>
      <input className="input-field" defaultValue="Default Text" readOnly style={{ marginTop: '6px' }} />
      <p className="event-desc" style={{ marginTop: '8px' }}>Not synchronized.</p>
    </div>
  )
}

function TwoWaySolution() {
  const [name, setName] = useState('Alex Rivera')
  const [category, setCategory] = useState('Workshop')

  return (
    <div className="event-card">
      <div className="form-group">
        <label>Attendee Name [(ngModel)]:</label>
        <input
          className="input-field"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type your name..."
        />
      </div>
      <div className="form-group">
        <label>Preferred Track [(ngModel)]:</label>
        <select
          className="input-field"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="Tech">Tech Summit</option>
          <option value="Workshop">Hands-on Workshop</option>
          <option value="Hackathon">Hackathon</option>
        </select>
      </div>
      <div className="ex-panel" style={{ marginTop: '10px', background: '#f8fafc' }}>
        <p style={{ fontSize: '13px' }}>
          Live Badge Preview: <b>{name || '(Anonymous)'}</b> attending <b>{category}</b>
        </p>
      </div>
    </div>
  )
}

// --- 07 Services & Dependency Injection Preview ---
function ServicesStarter() {
  return (
    <div className="event-card">
      <p className="event-desc">Each component maintains isolated state; no shared service.</p>
    </div>
  )
}

function ServicesSolution() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Angular Global Conf', likes: 12 },
    { id: 2, title: 'State of Signals 2026', likes: 28 },
  ])

  function upvote(id) {
    setEvents(list => list.map(e => e.id === id ? { ...e, likes: e.likes + 1 } : e))
  }

  return (
    <div className="event-card">
      <h4>Singleton EventService (Injected State)</h4>
      {events.map(e => (
        <div key={e.id} className="event-meta-row" style={{ padding: '8px 0' }}>
          <span>{e.title}</span>
          <button className="btn btn-auto btn-outline" onClick={() => upvote(e.id)}>
            👍 {e.likes}
          </button>
        </div>
      ))}
    </div>
  )
}

// --- 08 Reactive Forms Preview ---
function FormsStarter() {
  return (
    <div className="event-card">
      <p className="event-desc">Unvalidated HTML inputs without FormGroup tracking.</p>
      <input className="input-field" placeholder="Event Name" style={{ marginBottom: '8px' }} />
      <button className="btn" disabled>Submit (Disabled)</button>
    </div>
  )
}

function FormsSolution() {
  const [title, setTitle] = useState('')
  const [seats, setSeats] = useState(50)
  const [submitted, setSubmitted] = useState(false)

  const isValid = title.trim().length >= 3 && Number.isInteger(seats) && seats > 0

  function handleSubmit(e) {
    e.preventDefault()
    if (!isValid) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2500)
  }

  return (
    <div className="event-card">
      <h4>Angular ReactiveForm (FormGroup)</h4>
      <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <div className="form-group">
          <label>Event Title (min 3 chars):</label>
          <input
            className="input-field"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. NextGen Web Dev"
          />
          {title.length > 0 && title.length < 3 && (
            <span style={{ color: '#ef4444', fontSize: '11px' }}>Title too short</span>
          )}
        </div>
        <div className="form-group">
          <label>Total Seats:</label>
          <input
            type="number"
            className="input-field"
            value={seats}
            onChange={e => setSeats(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="btn" disabled={!isValid}>
          Publish Event
        </button>
      </form>
      {submitted && (
        <div style={{ marginTop: '10px', color: 'var(--green)', fontWeight: 600, fontSize: '13px' }}>
          ✓ Event published via ReactiveForms!
        </div>
      )}
    </div>
  )
}

// --- 09 Angular Router Preview ---
function RoutingStarter() {
  return (
    <div className="event-card">
      <div className="event-title">One screen, no routes</div>
      <p className="event-desc">The event list has no shareable detail URL. A full reload loses the page context.</p>
      <button className="btn" disabled>View event details</button>
    </div>
  )
}

function RoutingSolution() {
  const [selected, setSelected] = useState(null)
  const events = [
    { id: 12, title: 'Signals & State Workshop', category: 'Workshop' },
    { id: 24, title: 'Community Demo Night', category: 'Networking' },
  ]

  return (
    <div className="event-card">
      <div className="event-title">Event routes</div>
      {selected ? (
        <>
          <div className="tag-badge">/events/{selected.id}</div>
          <h4 style={{ marginTop: '12px' }}>{selected.title}</h4>
          <p className="event-desc">Category: {selected.category}</p>
          <button className="btn btn-auto btn-outline" onClick={() => setSelected(null)}>Back to events</button>
        </>
      ) : events.map(event => (
        <div key={event.id} className="event-meta-row">
          <span>{event.title}</span>
          <button className="btn btn-auto btn-outline" onClick={() => setSelected(event)}>View details</button>
        </div>
      ))}
    </div>
  )
}

const originalExamples = [
  {
    id: 'components',
    num: '01',
    title: 'Components & Templates',
    teach: 'The foundational building block of modern Angular with Standalone decorators and {{ interpolation }}.',
    blurb: {
      starter: 'A static hardcoded event card with plain text and no dynamic data bindings.',
      solution: 'A dynamic Angular component using {{ title }}, computed expressions, and uppercase filters.',
    },
    theory: [
      { h: 'Standalone Components' },
      { p: 'In modern Angular, components declare standalone: true. They package their own template, styles, and imports without requiring NgModule wrappers.' },
      { h: 'Interpolation Syntax' },
      { p: 'Anything inside {{ curly braces }} is evaluated in the component TypeScript class scope.' },
      { code: `@Component({
  selector: 'app-event-card',
  standalone: true,
  template: \`
    <div class="card">
      <h2>{{ event.title }}</h2>
      <p>Speaker: {{ event.speaker.toUpperCase() }}</p>
      <span>Double Capacity: {{ event.seats * 2 }}</span>
    </div>
  \`
})
export class EventCardComponent {
  event = { title: 'Angular 18 Summit', speaker: 'Sarah', seats: 40 };
}` },
      { h: 'Rules & Gotchas' },
      { ul: [
        'Expressions in {{ }} cannot perform variable assignments or mutate state.',
        'Standalone components directly import their dependencies via the imports: [...] array.',
        'Styles specified in styles: [...] are scoped to this component by default.'
      ]}
    ],
    starterCode: `@Component({
  selector: 'app-event-card',
  standalone: true,
  template: \`
    <div class="event-card">
      <div class="event-title">Angular Connect 2026</div>
      <p class="event-desc">Annual conference for modern frontend development.</p>
      <div class="event-meta-row">
        <span>Static Date: Nov 15</span>
        <span class="seats-badge seats-open">Static Seats: 40</span>
      </div>
    </div>
  \`
})
export class EventCardComponent {}`,
    solutionCode: `@Component({
  selector: 'app-event-card',
  standalone: true,
  template: \`
    <div class="event-card">
      <div class="event-header">
        <div class="event-title">{{ event.title }} #{{ event.edition }}</div>
        <span class="tag-badge">Speaker: {{ event.speaker.toUpperCase() }}</span>
      </div>
      <p class="event-desc">Double Capacity: {{ event.seats * 2 }}</p>
      <div class="event-meta-row">
        <span>Date: {{ event.date }}</span>
        <span class="seats-badge seats-open">Open Seats: {{ event.seats }}</span>
      </div>
    </div>
  \`
})
export class EventCardComponent {
  event = {
    title: 'Angular Connect 2026',
    edition: 5,
    date: 'Nov 15, 2026',
    speaker: 'Sarah Connor',
    seats: 40
  };
}`,
    Starter: ComponentsStarter,
    Solution: ComponentsSolution,
  },
  {
    id: 'binding',
    num: '02',
    title: 'Property & Event Binding',
    teach: 'Passing data into elements with [property] and capturing user interactions with (event).',
    blurb: {
      starter: 'A disabled registration button with fixed DOM properties and no click listener.',
      solution: 'Property binding [disabled] linked to state, and (click) handler toggling RSVP status.',
    },
    theory: [
      { h: 'Property Binding: [target]="expression"' },
      { p: 'Sets element attributes or component inputs dynamically from TypeScript variables.' },
      { h: 'Event Binding: (event)="handler()"' },
      { p: 'Binds browser DOM events (click, input, submit) or EventEmitter triggers to component methods.' },
      { code: `<button
  [disabled]="isFull"
  [class.sold-out]="isFull"
  (click)="registerAttendee()">
  Register
</button>` }
    ],
    starterCode: `@Component({
  selector: 'app-binding-demo',
  standalone: true,
  template: \`
    <div class="event-card">
      <button class="btn" [disabled]="false">Register (No Action)</button>
    </div>
  \`
})
export class BindingDemoComponent {}`,
    solutionCode: `@Component({
  selector: 'app-binding-demo',
  standalone: true,
  template: \`
    <div class="event-card">
      <div class="event-title">Vue to Angular Migration Workshop</div>
      <p class="event-desc">
        {{ isRegistered ? 'You are registered!' : 'Click below to register.' }}
      </p>
      <button
        [class.btn-secondary]="isRegistered"
        [class.btn]="!isRegistered"
        (click)="toggleRegistration()">
        {{ isRegistered ? 'Cancel Registration' : 'Register Now' }}
      </button>
    </div>
  \`
})
export class BindingDemoComponent {
  isRegistered = false;

  toggleRegistration() {
    this.isRegistered = !this.isRegistered;
  }
}`,
    Starter: BindingStarter,
    Solution: BindingSolution,
  },
  {
    id: 'control-flow',
    num: '03',
    title: 'Control Flow (@if & @for)',
    teach: 'Modern Angular block template syntax replacing legacy *ngIf and *ngFor directives.',
    blurb: {
      starter: 'Hardcoded list items rendered manually one by one.',
      solution: '@for (item of items; track item.id) with @empty fallback and @if condition status.',
    },
    theory: [
      { h: 'The @if Block' },
      { p: 'Conditionally inserts or tears down DOM subtrees based on truthy conditions.' },
      { h: 'The @for Block & Mandatory track' },
      { p: 'Loops over arrays. The track parameter is required to provide high-performance DOM reconciliation.' },
      { code: `@if (isLive) {
  <span class="badge red">LIVE</span>
} @else {
  <span>Upcoming</span>
}

@for (session of sessions; track session.id) {
  <div class="row">{{ session.title }}</div>
} @empty {
  <p>No sessions scheduled.</p>
}` }
    ],
    starterCode: `@Component({
  selector: 'app-agenda',
  standalone: true,
  template: \`
    <div class="event-card">
      <p>• Keynote</p>
      <p>• Workshop</p>
    </div>
  \`
})
export class AgendaComponent {}`,
    solutionCode: `@Component({
  selector: 'app-agenda',
  standalone: true,
  template: \`
    <div class="event-card">
      @for (item of sessions; track item.id) {
        <div class="event-meta-row">
          <span>{{ item.title }} ({{ item.time }})</span>
          @if (item.isLive) {
            <span class="tag-badge red">🔴 LIVE NOW</span>
          } @else {
            <span>Upcoming</span>
          }
        </div>
      } @empty {
        <p class="empty">No sessions found.</p>
      }
    </div>
  \`
})
export class AgendaComponent {
  sessions = [
    { id: 1, title: 'Keynote Address', time: '10:00 AM', isLive: true },
    { id: 2, title: 'Signals Deep Dive', time: '11:30 AM', isLive: false },
  ];
}`,
    Starter: ControlFlowStarter,
    Solution: ControlFlowSolution,
  },
  {
    id: 'signals',
    num: '04',
    title: 'Signals & Reactive State',
    teach: 'Fine-grained reactivity with signal(), computed(), and automatic UI synchronization.',
    blurb: {
      starter: 'Ordinary JavaScript instance variables that lack reactive dependency notification.',
      solution: 'signal(15) and computed(() => max - booked()) updating reactively on change.',
    },
    theory: [
      { h: 'What is an Angular Signal?' },
      { p: 'A Signal is a wrapper around a value that can notify interested consumers when that value changes.' },
      { h: 'Reading Signals' },
      { p: 'Always call signals like a function to read their current value: count().' },
      { code: `booked = signal(10);
available = computed(() => 50 - this.booked());

// Update value:
this.booked.update(val => val + 1);` }
    ],
    starterCode: `@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`<p>Seats: {{ seats }}</p>\`
})
export class CounterComponent {
  seats = 10;
}`,
    solutionCode: `@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <div class="event-card">
      <p>Booked: {{ booked() }}</p>
      <p>Available: {{ available() }}</p>
      <button (click)="book()">Book Seat</button>
    </div>
  \`
})
export class CounterComponent {
  max = 20;
  booked = signal(15);
  available = computed(() => this.max - this.booked());

  book() {
    this.booked.update(b => b + 1);
  }
}`,
    Starter: SignalsStarter,
    Solution: SignalsSolution,
  },
  {
    id: 'inputs-outputs',
    num: '05',
    title: 'Inputs & Outputs',
    teach: 'Component communication via input() signals and output() event emitters.',
    blurb: {
      starter: 'A standalone card with no data flow from parent.',
      solution: 'Re-usable child component receiving event data via input() and emitting RSVP actions up.',
    },
    theory: [
      { h: 'Signal Inputs: input.required<T>()' },
      { p: 'Modern Angular 17.1+ allows components to declare reactive inputs using the input() function.' },
      { h: 'Signal Outputs: output<T>()' },
      { p: 'Dispatches custom events to the parent component cleanly.' }
    ],
    starterCode: `@Component({
  selector: 'app-card',
  standalone: true,
  template: \`<div class="card">Static Card</div>\`
})
export class CardComponent {}`,
    solutionCode: `@Component({
  selector: 'app-event-item',
  standalone: true,
  template: \`
    <div class="event-card">
      <h3>{{ event().title }}</h3>
      <button (click)="rsvp.emit(event().id)">RSVP</button>
    </div>
  \`
})
export class EventItemComponent {
  event = input.required<{ id: number; title: string }>();
  rsvp = output<number>();
}`,
    Starter: InputsOutputsStarter,
    Solution: InputsOutputsSolution,
  },
  {
    id: 'two-way',
    num: '06',
    title: 'Two-Way Binding [(ngModel)]',
    teach: 'Synchronizing form input elements and component properties simultaneously with Banana-in-a-Box syntax.',
    blurb: {
      starter: 'An uncontrolled input requiring manual change listeners.',
      solution: '[(ngModel)] linking the input directly to attendee state in real time.',
    },
    theory: [
      { h: 'The "Banana in a Box" Syntax [()]' },
      { p: 'Square brackets [ ] represent property binding (in), and parentheses ( ) represent event binding (out). Combined [()], it creates two-way binding.' }
    ],
    starterCode: `<input [value]="username" />`,
    solutionCode: `@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <input [(ngModel)]="name" />
    <p>Live: {{ name }}</p>
  \`
})
export class ProfileComponent {
  name = 'Alex Rivera';
}`,
    Starter: TwoWayStarter,
    Solution: TwoWaySolution,
  },
  {
    id: 'services',
    num: '07',
    title: 'Services & Dependency Injection',
    teach: 'Sharing reusable business logic and singleton state across multiple components.',
    blurb: {
      starter: 'Components duplicating event lists and mutation methods locally.',
      solution: 'Singleton @Injectable({ providedIn: "root" }) EventService injected via inject(EventService).',
    },
    theory: [
      { h: 'Dependency Injection (DI)' },
      { p: 'Angular injects singleton service instances wherever requested in the component tree.' }
    ],
    starterCode: `export class MyComponent {
  // Local duplicate list
  events = [{ id: 1, title: 'Conf' }];
}`,
    solutionCode: `@Injectable({ providedIn: 'root' })
export class EventService {
  private events = signal([{ id: 1, title: 'Conf', likes: 10 }]);
  readonly allEvents = this.events.asReadonly();

  like(id: number) {
    this.events.update(l => l.map(e => e.id === id ? { ...e, likes: e.likes + 1 } : e));
  }
}

@Component({
  selector: 'app-feed',
  standalone: true,
  template: \`
    @for (e of service.allEvents(); track e.id) {
      <div>{{ e.title }} ({{ e.likes }})</div>
    }
  \`
})
export class FeedComponent {
  service = inject(EventService);
}`,
    Starter: ServicesStarter,
    Solution: ServicesSolution,
  },
  {
    id: 'forms',
    num: '08',
    title: 'Reactive Forms',
    teach: 'Managing complex inputs, async validation, and immutable form states with FormBuilder and FormGroup.',
    blurb: {
      starter: 'Plain HTML form without validation state or error message tracking.',
      solution: 'ReactiveForm with FormBuilder, Validators.required, and disabled submit button when invalid.',
    },
    theory: [
      { h: 'FormGroup & FormBuilder' },
      { p: 'Reactive forms give programmatic control over form validation, value changes, and submission.' }
    ],
    starterCode: `<form>
  <input name="title" />
  <button type="submit">Submit</button>
</form>`,
    solutionCode: `@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="title" />
      @if (form.get('title')?.invalid) {
        <span>Min 3 chars required</span>
      }
      <button [disabled]="form.invalid">Submit</button>
    </form>
  \`
})
export class EventFormComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]]
  });

  submit() {
    if (this.form.valid) console.log(this.form.value);
  }
}`,
    Starter: FormsStarter,
    Solution: FormsSolution,
  },
  {
    id: 'routing',
    num: '09',
    title: 'Routing & Event Details',
    teach: 'Give event list and detail screens shareable URLs with Angular Router.',
    blurb: {
      starter: 'A single view has no URL for a selected event and uses no navigation state.',
      solution: 'RouterLink navigates to an event-specific route while RouterOutlet renders the matching screen.',
    },
    theory: [
      { h: 'Routes map URL patterns to screens' },
      { p: 'Register routes with provideRouter(). A parameter such as :eventId is part of the URL; RouterOutlet is the place where the matching component appears.' },
      { h: 'Navigate without a full page reload' },
      { p: 'Use RouterLink for template navigation. Read route parameters with ActivatedRoute, and show a not-found state when the id does not match an event.' },
      { code: `const routes: Routes = [
  { path: 'events', component: EventListPage },
  { path: 'events/:eventId', component: EventDetailPage },
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: '**', component: NotFoundPage },
];

// In a standalone component:
imports: [RouterLink, RouterOutlet]

<a [routerLink]="['/events', event.id]">View details</a>
<router-outlet />` },
      { ul: [
        'RouterLink keeps navigation inside the Angular app; plain href can reload the document.',
        'Use a route parameter for a resource identity, not for temporary UI toggles.',
        'The preview illustrates navigation state; use Angular Router in the actual app.'
      ]}
    ],
    starterCode: `@Component({
  selector: 'app-events',
  standalone: true,
  template: '<p>Event list only; no detail URL.</p>'
})
export class EventsPage {}`,
    solutionCode: `// app.routes.ts
export const routes: Routes = [
  { path: 'events', component: EventListPage },
  { path: 'events/:eventId', component: EventDetailPage },
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: '**', component: NotFoundPage },
];

// Event list component imports RouterLink.
// App shell imports RouterOutlet.
<a [routerLink]="['/events', event.id]">View details</a>
<router-outlet />

// In EventDetailPage, read the identity from the URL.
private readonly route = inject(ActivatedRoute);
readonly eventId = this.route.snapshot.paramMap.get('eventId');`,
    Starter: RoutingStarter,
    Solution: RoutingSolution,
  }
]

const beginnerContent = {"components": ["Your first component", "A component is one piece of a page. Its HTML shows the content; its TypeScript holds the data.", "Start with a fixed event title.", "Read the title from a variable using {{ }}.", "Type a new title in the preview and watch the card change. In your editor, try changing the title variable too.", "Ask: which part is the HTML, and which part is the data?"], "binding": ["Make a button work", "Binding connects your page to your data. (click) runs a function; [disabled] controls whether a button can be used.", "A button is drawn, but has no click action.", "Register and cancel using a click handler.", "Click Register Now, then Cancel Registration. Watch the message and click count.", "Challenge: explain how to disable registration when no seats remain."], "control-flow": ["Show lists and conditions", "@for repeats a card for each event. @if shows something only when a condition is true.", "The agenda is written out by hand.", "Show the agenda from a list and filter live sessions.", "Click Show Live Only, then Show All. Count the visible sessions.", "Ask: why does each event need its own id? Angular uses it to identify a row."], "signals": ["Update a seat counter", "A signal is a value Angular watches. Change the value and the page can update. computed calculates a value from other signals.", "A fixed counter has no buttons to change it.", "Reserve a seat and calculate how many are left.", "Reserve all five remaining seats. Show Sold Out, then free one seat.", "Keep this simple: signal = stored value; computed = calculated value. Skip effects and advanced change detection."], "two-way": ["Read what someone types", "ngModel keeps an input and a variable in sync. Typing updates the variable; changing the variable updates the input.", "The input is not connected to the preview.", "The name badge changes while you type.", "Replace Alex with a participant name and change the preferred track.", "Ask a participant to predict the badge before changing the track."], "forms": ["Validate an event form", "A form collects values. Validation checks that the event has a title and a positive seat count before submission.", "The form does not check its fields.", "Publish becomes available when the values are valid.", "Try a two-letter title, then a proper title. Try zero seats, then 30. Publish.", "FormGroup means a group of fields. Validators are rules. No async validation is needed in this session."], "inputs-outputs": ["Optional: pass data between cards", "An input gives data to a child component. An output lets the child tell the parent that something happened.", "One fixed card.", "The parent receives an RSVP action from its child.", "Click RSVP and watch the parent counter increase.", "Think: parent sends the event down; child sends the click back up."], "services": ["Optional: share data with a service", "A service is a class for data or functions used in more than one place. inject asks Angular for that service.", "Each component keeps its own data.", "Related components use one shared source of data.", "Click a like button and watch only that event count change.", "Dependency injection simply means Angular supplies the object your component needs."], "routing": ["Optional: open another page", "A route connects a URL, such as /events/12, to a screen. A route parameter is the changing part of that URL.", "Only the list screen exists.", "Open event details and return to the list.", "Open each event and then click Back to events. This preview demonstrates navigation locally.", "Skip guards, lazy loading and nested routes in the two-hour session."]}
export const conceptExamples = originalExamples.map(example => {
 const lesson = beginnerContent[example.id]
 if (!lesson) return example
 return { ...example, num: String(["components", "binding", "control-flow", "signals", "two-way", "forms"].indexOf(example.id) + 1).padStart(2, "0"), title: lesson[0], teach: lesson[1], blurb: {starter: lesson[2], solution: lesson[3]}, demo: lesson[4], theory: [{h: "In simple words"}, {p: lesson[1]}, {h: "Live demo — do this together"}, {p: lesson[4]}, {h: "Remember"}, {p: lesson[5]}] }
})
