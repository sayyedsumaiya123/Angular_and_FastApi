# Angular Workshop — Facilitator Guide

This repository targets **Angular 18** and builds an Event Management System (EMS). The companion page is organized as two teachable sessions with short concept previews and progressive project stages. Use the code tabs as a live-coding prompt: ask learners to predict the result, implement the change, then compare with the solution.

## Learning outcomes

By the end, learners can:

- Build standalone Angular components and explain how templates bind to TypeScript.
- Render event data with `@if` and `@for`, using stable tracking keys.
- Model UI state with `signal()` and derived values with `computed()`.
- Pass data and actions between parent and child components.
- Build and validate an event form, and move shared state into an injected service.
- Use Angular Router to map URLs to screens and navigate between an event list and event details.

## Before the session

- Install Node.js and npm. In `angular-session`, run `npm install` and `npm run dev`.
- For the complete Angular app, use `angular-project`: run `npm install`, then `npm start`.
- Have learners know basic HTML, CSS, JavaScript, and TypeScript syntax.
- Explain that this project pins Angular 18. Standalone components became the default in Angular 19; here they are explicitly marked `standalone: true`.

## Suggested delivery: two 90-minute sessions

### Session A — Build the event feed

| Time | Teach and demonstrate | Learner checkpoint |
|---|---|---|
| 0–8 min | Show the finished EMS and agree on its event data: id, title, category, date, seats. | Name the UI pieces and data each one needs. |
| 8–20 min | Components, templates, interpolation, standalone imports. | Change a static card into an `EventCardComponent` that displays event data. |
| 20–32 min | Property and event binding. | Disable RSVP for a sold-out event; make a click update a visible state. |
| 32–45 min | `@if`, `@else`, `@for`, `@empty`, and `track`. | Add a sold-out message and a useful empty list state. |
| 45–62 min | Signals: reads, writes, `update`, and `computed`. | Derive open seats and prevent the count from going below zero. |
| 62–75 min | Child inputs and outputs. | Emit an event id from a card; let the parent handle RSVP. |
| 75–90 min | Build EMS stages 0–4 and review the data flow. | Learner explains how a click reaches the state owner and updates the card. |

### Session B — Create events and navigate the app

| Time | Teach and demonstrate | Learner checkpoint |
|---|---|---|
| 0–10 min | Retrieval warm-up: explain one binding and one signal from Session A. | Add a category filter to the feed. |
| 10–25 min | Template-driven `ngModel` as a small search-input example; explain why the EMS create form uses Reactive Forms. | Bind search text and show it updating as the learner types. |
| 25–42 min | `FormGroup`, validators, touched/invalid state, and submit guards. | Require a 3-character title and positive capacity. |
| 42–57 min | Services, `providedIn: 'root'`, `inject()`, and a single state owner. | Move event mutations out of the page component. |
| 57–75 min | EMS stages 5–6: create, RSVP, cancel, search, delete, summary metrics. | Demonstrate a sold-out guard and an empty search result. |
| 75–87 min | Angular Router: route definitions, `RouterOutlet`, `RouterLink`, and route parameters. | Navigate from the event list to a detail screen and read its event id from the URL. |
| 87–90 min | Exit ticket and next steps. | Explain which UI state belongs in a signal and which navigation state belongs in the URL. |

## Concept sequence

The left navigation follows this sequence. Keep each explanation short, then let learners change the interactive preview.

1. **Components & Templates** — A component owns a view; interpolation reads values. Avoid putting state-changing work in the template.
2. **Property & Event Binding** — `[disabled]` sends state into the DOM; `(click)` sends user intent back to the component.
3. **Built-in Control Flow** — `@if` handles conditional content; `@for` renders collections; `track event.id` lets Angular match rows across updates; `@empty` handles zero results.
4. **Signals & Derived State** — Read a signal by calling it. Use `computed()` for values derived from other signals; do not duplicate values that can be derived.
5. **Inputs & Outputs** — Data flows down to an event card; intent flows up as an event id. Keep the parent or service responsible for changing shared data.
6. **Two-Way Binding** — `[(ngModel)]` is concise for simple fields. Import `FormsModule`; use a unique `name` for each control inside a form.
7. **Services & Dependency Injection** — Services own reusable logic and shared state. `providedIn: 'root'` creates an app-wide service instance.
8. **Reactive Forms** — Use an explicit form model and validators for event creation. Show errors after interaction, and guard submission even when the button is disabled.
9. **Routing & Event Details** — Define typed route paths, render the selected page with `RouterOutlet`, navigate with `RouterLink`, and read `eventId` from route parameters. Keep navigation state in the URL when a screen should be shareable or reloadable.

## EMS capstone progression

Build in small increments; save a working point after each stage.

0. Static event card: title, category, date, available seats.
1. Split the screen into focused components (event card and summary).
2. Render the event array with `@for` and stable ids.
3. Add category filtering with a selected-category signal and `computed()`.
4. RSVP and cancellation update seats without going below zero; one attendee cannot register twice for the same event.
5. Create an event with Reactive Forms and validation.
6. Add text search, delete, and summary values; label this stage as in-memory client state.
7. Add a detail route such as `/events/:eventId`; show a not-found state for an unknown id and a clear way back to the list.

## Good discussion questions

- Why should `filteredEvents` be computed rather than stored as a second writable list?
- Which component should own the RSVP mutation, and why?
- Which state belongs in the URL, and which state should remain local to the page?
- Why does an in-memory signal reset on refresh?

## Common mistakes to catch

- Reading a signal as `events` instead of `events()` in TypeScript/template expressions.
- Mutating an array or object in place rather than replacing it through a signal update.
- Omitting `track` in `@for`, or tracking by array index when records have stable ids.
- Treating the preview widgets as the Angular runtime: previews demonstrate behavior; the snippets are the Angular code learners should build.
- Using an in-memory service as if it were persistent storage.

## Instructor reference

This project uses standalone components explicitly, built-in control flow, Signals, Reactive Forms, and Angular Router. Angular's current documentation also covers Signal Forms; keep this Angular 18 workshop on Reactive Forms so its examples match the pinned project version.

Official references: [Components](https://angular.dev/guide/components), [Templates](https://angular.dev/guide/templates), [Signals](https://angular.dev/guide/signals), [Reactive Forms](https://angular.dev/guide/forms/reactive-forms), [Routing](https://angular.dev/guide/routing).
