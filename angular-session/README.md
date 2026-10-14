# Angular Workshop — Session Companion & Event Management System

A complete, self-contained workshop package for learning modern Angular (Angular 18+ Standalone Components, Signals, Modern Control Flow, Forms & Services), featuring an interactive **Event Management System** live project.

---

## 📂 Repository Structure

- **`SESSION-SOURCE.md`**: Complete, in-depth reference guide covering modern Angular concepts from ground up to production patterns.
- **Interactive Workshop Companion (`src/`)**: Instructor-led Angular concepts (01 to 09), starter/solution code, interactive previews, and progressive EMS stages, including Angular routing to event details.
- **`angular-project/`**: Standalone, fully structured Angular 18 project with TypeScript models, services with signals, standalone components (`EventCard`, `EventFilter`, `EventForm`), and reactive state.

---

## 🚀 Quick Start

### Option 1: Run the Interactive Workshop Companion (Recommended)

```bash
# 1. Navigate to angular-session
cd angular-session

# 2. Install dependencies (first time only)
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5174` in your browser.

- **Session A**: Core Angular & Signals (Components, Templates, Binding, Control Flow `@if/@for`, Signals)
- **Session B**: Forms, Services & Routing (two-way binding, Reactive Forms, dependency injection, and event detail routes)
- **Live Project**: Event Management System stages 0 through 6!

---

### Option 2: Run the Standalone Angular Project

```bash
cd angular-session/angular-project
npm install
npm start
```

Runs the pure Angular standalone application on `http://localhost:4200`.

---

## 🎯 Curriculum Breakdown

1. **01 · Components & Templates**: Standalone components, template expressions, and `{{ interpolation }}`
2. **02 · Property & Event Binding**: `[disabled]` property binding and `(click)` event listeners
3. **03 · Modern Control Flow**: `@if`, `@else`, `@for (item of items; track item.id)`, and `@empty`
4. **04 · Signals & Reactive State**: `signal()`, `computed()`, and automatic template updates
5. **05 · Inputs & Outputs**: Child-parent communication with `input()` and `output()`
6. **06 · Two-Way Binding**: `[(ngModel)]` for form inputs
7. **07 · Services & Dependency Injection**: `@Injectable({ providedIn: 'root' })` singleton state
8. **08 · Reactive Forms**: `FormBuilder`, `FormGroup`, and validator states

---

## 🎟️ Live Project — Event Management System (EMS)

Progressive stages:
- **Stage 0**: Static Event Card & Layout
- **Stage 1**: Component Breakdown (Header, Stats, Card)
- **Stage 2**: Dynamic List Rendering with `@for` & `@empty`
- **Stage 3**: Category Filtering (Workshop, Hackathon, Design, Networking, Tech)
- **Stage 4**: Interactive RSVP & Seat Capacity Management
- **Stage 5**: Add Event Modal & Reactive Form
- **Stage 6**: Complete Connected Real-time Event Management Dashboard
