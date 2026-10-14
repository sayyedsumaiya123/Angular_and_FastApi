# React Workshop — Session Reference

The complete, self-contained reference for a one-session React workshop.
Every section here is informational: it explains what each concept is, why it
exists, how to write it, and the rules that trip people up. Nothing in this
document is an instruction for a host or a learner — it is plain subject
matter, the way it would appear on a teaching website.

---

## How the web works

A web page is three layers.

1. **HTML** creates the structure — headings, paragraphs, buttons, images.
2. **CSS** decides how it looks — colors, spacing, fonts, layout.
3. **JavaScript** makes it behave — it responds to clicks, holds data, changes
   the page after it has loaded.

For a long time, pages were mostly documents: the server sent finished HTML
and that was it. Interactivity came from JavaScript reaching into the page and
rewriting pieces of it by hand (directly manipulating the "DOM" — the browser's
internal representation of the page). That approach works, but it has problems.

### The problem with touching the DOM by hand

- Every time data changes, the developer has to figure out which element on the
  page must change and update it, piece by piece, in the right order.
- The same markup (a list item, a card, a form row) has to be copied and pasted
  over and over, because there was no way to define a reusable piece of UI.
- Keeping the on-screen content in sync with the data, and then with what the
  user just did, becomes error-prone as an app grows.

None of these are "wrong"; they are just shared pain across every interactive
website.

---

## What is React?

**React is a JavaScript library for building user interfaces from small,
reusable pieces called components.**

Instead of manipulating the page by hand, the developer describes what the
screen should look like at any moment, and React figures out how to make the
browser match that description.

Components make UI easy to reuse: a card, a header, a scoreboard are each
written once as a component and then placed anywhere on the page. When the
data behind a component changes, React recalculates just the affected pieces of
the screen automatically.

### Why React

- **Component-based** — a screen is assembled from small named building blocks
  instead of one giant markup document.
- **Declarative** — the code says *what* should be shown; React handles *how* it
  gets updated. There is no "find this element and write this text into it".
- **State-driven** — components remember data ("state"); when that data changes,
  the component re-renders itself. The UI always reflects the latest data
  without manual sync.
- **One tool, everything in it** — JSX, components, state, events, and effects
  cover most of what a modern app needs, and the same skills transfer to
  frameworks built on top of React.
- **Industry standard** — React runs some of the largest products on the web,
  and a large share of front-end job listings ask for it.

---

## 01 · JSX — Layout with JavaScript

JSX is the syntax React components are written in. It looks like HTML, but it
lives inside a JavaScript file.

The point of JSX is that markup and logic share one place. A component does not
have to fetch text from a separate template file and then stitch it into a
template engine; the JSX *is* the markup, and it can read variables directly.

### Expressions in curly braces

Anything between `{` and `}` inside JSX is a JavaScript expression, and its
result is displayed:

```jsx
const name = 'Zaid'
const age = 22

<h1>{name}</h1>           {/* shows: Zaid */}
<h2>{age + 2}</h2>        {/* shows: 24 */}
<p>{name.toUpperCase()}</p> {/* shows: ZAID */}
```

`{name}` prints a variable, `{age + 2}` runs an actual calculation,
`{name.toUpperCase()}` calls a function. Any JavaScript that evaluates to a
value is allowed. What is *not* allowed inside the braces is a statement — an
`if`, a `for` loop, a declaration. For decisions inside JSX, use expressions
such as ternaries instead.

### Rules

Behavior in JSX is closer to React than to HTML:

- **One element per component.** A component must return one thing, so multiple
  siblings get wrapped in a `<div>` or in a fragment `<> … </>`. Fragments add
  no extra element to the page.
- **`className`, not `class`.** `class` is a reserved word in JavaScript;
  using it in JSX would collide, so CSS classes are written `className`.
- **Event props use camelCase and functions** — `onClick`, not `onclick`.
- **Void elements are self-closing** — `<img />`, `<input />` (legacy HTML lets
  you skip this; JSX does not).
- JSX compiles into JavaScript function calls — it is not a string, and can not
  be built by concatenating text.

---

## 02 · Components — Build the page from small pieces

A component is a plain JavaScript function that returns JSX.

```jsx
function Scoreboard() {
  return <div className="scoreboard">You 0 · CPU 0</div>
}
```

That is the entire idea of a component: at its simplest it is a function, and
its return value is the markup the component represents.

The power comes from **composition**. A component's JSX can use other
components in place of plain elements:

```jsx
function Game() {
  return (
    <div>
      <Scoreboard />
      <FaceOff />
      <Moves />
    </div>
  )
}
```

`Game` does not have to be one huge block of markup — it is three small named
pieces, each of which could be written and understood on its own. Complex
screens are built by stacking small, reusable components, the way a block code
library stacks blocks.

A component can be placed more than once:

```jsx
<MemberCard />
<MemberCard />
<MemberCard />
```

so the same markup is written once and rendered as many times as needed. This is
the core benefit: **reuse without duplication**.

### Rules

- A component's name must start with a **capital letter**. Lowercase names are
  treated as built-in HTML tags (`<div>`, `<span>`), so `card` would not work
  but `Card` would.
- `App` is just another component — the root one that composes the whole page.
- A component can only return one top-level element (a single element or a
  fragment).

---

## 03 · Props — Components accept data

A component that takes inputs is kept generic by its **props** — the argument
object the component receives from whoever uses it.

```jsx
function PricingCard({ plan, price, features, featured }) {
  return (
    <div className={'price-card' + (featured ? ' featured' : '')}>
      <h3>{plan}</h3>
      <p>₹{price}</p>
      <ul>{features.map((f) => <li key={f}>{f}</li>)}</ul>
    </div>
  )
}
```

Using the component with different prop values produces different results:

```jsx
<PricingCard plan="Basic" price={0} features={['2 examples', 'Community support']} />
<PricingCard plan="Pro" price={99} features={['Everything in Basic', 'All stages unlocked']} featured />
```

One component, many layouts. The `price-card` gets the extra `featured` class
only for the Pro card — that is ordinary JavaScript (`featured` is a boolean
truthy value), not special syntax.

### Rules

- Props are **read-only**. A component must never assign to a prop — it is a
  parameter, not a local variable to mutate. Interaction travels in the
  opposite direction (see Events).
- Changing a prop from the parent re-renders the component automatically. Data
  flows **down** from parent to child, never up on its own.
- Props are passed in the call as attributes, defined in the function signature
  (usually destructured) — the prop name on the left is the parameter name, the
  value on the right is supplied by the parent.
- A component without props is still fine — props are just "inputs, if any".

---

## 04 · useState — Give the page memory

A plain variable resets to its initial value every time a component re-renders.
Anything that must *survive* a re-render — a like count, a score, text being
typed — needs **state**.

```jsx
const [likes, setLikes] = useState(0)
```

`useState` returns a pair in a fixed order:

- the **current value** (`likes`), and
- a **setter function** (`setLikes`) that changes it and triggers a re-render.

The only argument is the initial value (`0`).

```jsx
<button onClick={() => setLikes(likes + 1)}>
  ❤️ {likes}
</button>
```

Clicking calls the setter; React notices the state changed, re-renders the
component, and `likes` now has the new value. The screen is a function of the
state at all times.

### Rules and gotchas

- State is **not updated in place** — mutate nothing. `likes = likes + 1` and
  `likes++` do nothing useful; always go through the setter.
- The setter replaces the value. When the next value depends on the previous
  one, pass an **updater function** so the calculation always runs on the
  freshest value:

  ```jsx
  setLikes(prev => prev + 1)
  ```

  Math using the old state variable is usually fine on its own, but the updater
  form is the one that is safe when updates can queue in the same render.
- Putting something in state does not *add* it to the page by itself — the JSX
  has to read the state value to display it.
- `useState` is called at the top level of a component, never after an `if` or
  inside a loop.

---

## 05 · Events — React to clicks and keystrokes

Components listen to user interaction by wiring **event props**: `onClick` on
buttons, `onChange` on inputs and selects, `onSubmit` on forms.

```jsx
function LikeButton() {
  const [likes, setLikes] = useState(0)
  function handleLike() {
    setLikes(prev => prev + 1)
  }
  return <button onClick={handleLike}>❤️ {likes}</button>
}
```

### The one rule that explains most bugs

Pass the **function**, not the **call**:

```jsx
onClick={handleLike}      // correct — called when clicked
onClick={handleLike()}    // wrong — called immediately, during render
```

`onClick={handleLike}` hands React a reference; React invokes it on click.
`onClick={handleLike()}` executes the function while building the JSX — the
result is what gets passed, and the call already happened. When a handler needs
an argument, wrap it in an arrow function: `onClick={() => handleLike('rock')}`.

### Controlled inputs

An input whose `value` comes from state and whose `onChange` writes back into
state is a **controlled input** — state is the single source of truth, and the
field always reflects it:

```jsx
<input value={text} onChange={(e) => setText(e.target.value)} />
```

Every keystroke goes through the setter, so the rest of the UI can react to the
text immediately.

### Rules

- `onChange` reads the new value with `e.target.value` (events are passed to
  the handler as an argument).
- On forms, call `e.preventDefault()` in `onSubmit` — otherwise the browser
  reloads the page on submit and wipes all state.
- Use `onClick` (single click); there is no need for inline `onclick=""`
  strings as in old HTML.

---

## 06 · Conditional rendering — Show different UI depending on state

The same component can show completely different markup depending on the state
or props, using ordinary JavaScript conditional expressions inside JSX.

**Ternary — one of two alternatives:**

```jsx
{joined
  ? <p className="member">You're in! 🎉</p>
  : <button onClick={() => setJoined(true)}>Join</button>
}
```

**Short-circuit `&&` — show something or nothing:**

```jsx
{isSending && <p>Sending...</p>}
```

When `isSending` is true the `<p>` renders; when it is falsy the expression
renders nothing — a compact "maybe show this" gate.

### Rules and gotchas

- The condition belongs between braces and is a plain expression: `{joined &&
  ...}`, not `if` statements inside JSX.
- **Never render raw numbers through `&&`.** `{count && <p>{count}</p>}`
  renders the literal `0` on the page when count is `0`, because `0` itself is
  a falsy-but-returnable value. Use a boolean condition or a ternary:
  `{count > 0 && <p>{count}</p>}`.
- When a value is used both to decide and to display, prefer
  `{isLoading ? <Spinner /> : <Result />}` over two separate conditional lines;
  the ternary keeps the two states visually paired.
- Conditional rendering is just JavaScript — no template directives or special
  syntax is involved.

---

## 07 · useEffect — Sync with things outside React, after render

Most of a component is describing the screen from state. Occasionally a
component needs to reach *outside* that world — change the browser tab's
title, start a timer, save to localStorage. That is what `useEffect` is for:
it runs code **after** the component has rendered, and again whenever the
conditions it depends on change.

```jsx
useEffect(() => {
  document.title = `Count is ${count}`
}, [count])   // dependency array
```

The dependency array is the contract: the effect runs after the first render,
and then only when a dependency in the array has changed between renders.
`[count]` means "re-run every time `count` changes".

```jsx
useEffect(() => {
  const t = setTimeout(() => alert('Time!'), 5000)
  return () => clearTimeout(t)   // cleanup — undo before the next run / unmount
}, [])
```

An empty array `[]` means the effect runs **once**, right after the first mount.

### Rules and gotchas

- Effects run **after** render — they must not be needed for the screen itself
  to be correct (that is state and JSX's job).
- **Cleanup**: the function a `useEffect` returns is run before the effect runs
  again and when the component unmounts. It is how a timer or an event listener
  gets undone so duplicates are not stacked on repeat runs. Anything you start,
  clean up.
- Mentioning a variable from outside the effect inside the effect body means it
  should normally appear in the dependency array; that is how the effect stays
  in sync.

---

## 08 · useRef — Touch DOM nodes without re-rendering

State is for data the screen must show, and every state change re-renders the
component. **Refs** are for values that must survive between renders *without*
re-rendering anything — most commonly a direct reference to a real DOM node.

```jsx
const inputRef = useRef(null)

<input ref={inputRef} placeholder="Type your name" />

// later, e.g. from a click handler:
inputRef.current.focus()
```

`useRef(null)` returns an object `{ current: null }`. Passing it to `ref`
attaches the actual DOM element after render, so `inputRef.current` becomes
that element. Methods such as `focus()`, `scrollIntoView()`, or reading
measurements (`offsetWidth`) work directly on it.

### Rules and gotchas

- Changing `ref.current` does **not** re-render — that is exactly why a refs
  exist ("a box you can change without waking anyone up").
- Therefore refs are for things that don't show on screen: focus, scroll,
  measuring. If the value must be displayed or drive the UI, it belongs in
  state.
- A ref does not auto-mutate into the DOM node; it needs to be wired with a
  `ref` attribute, and it is only populated after the element has rendered.
- Don't read `ref.current` while the very first render is still running — the
  ref is only connected once rendering has finished.

---

## The project — Rock Paper Scissors vs the computer

Everything above is used to build one complete game: the student posts one of
three moves, the CPU replies with one of its own, and the round result (win,
lose, draw) is shown and scored.

Rules of the game:

- Rock beats Scissors, Scissors beats Paper, Paper beats Rock.
- Same move on both sides is a draw.

(Computer-agreeable reference for the rules engine: define "what beats what" as
a lookup, `{ Rock: 'Scissors', Paper: 'Rock', Scissors: 'Paper' }`, and a round
decides in three cases — computer's move equals the unbeaten-of the player's
means player wins, equal means draw, otherwise the CPU wins.)

### How the game is built

The project is a single Vite React app:

- one application file — `src/App.jsx` — is rewritten at every stage;
- one shared stylesheet — `src/index.css` — is added once and reused for the
  whole game;
- the app runs on `localhost` with hot reload, so each stage shows up instantly
  on save.

It is built in nine stages, and every stage maps to one of the eight concepts
above — so each concept the session teaches gets used for real, moments later.

**Stage 0 — Static UI (JSX).** The whole game on screen with no logic: a
title, a scoreboard, the two face-off spots, and three buttons. Clicking the
buttons does nothing — deliberately. This is the payoff you can see while only
writing markup, and it is where the shared stylesheet is dropped in.

**Stage 1 — Components.** The single screen is split into small pieces —
`Scoreboard`, `FaceOff`, `Moves` — and composed inside `App`. Same screen, but
now structured: one markup block per component, composed instead of repeated.

**Stage 2 — JSX is dynamic.** The hard-coded labels (score, move names, emoji)
become JavaScript expressions inside braces — variables and small expressions
rendered in the JSX, so the same components now display computed values instead
of fixed text.

**Stage 3 — Props.** The components that show a player's name and score become
generic: `FaceOff` and `Scoreboard` receive their values as props from `App`,
and the same component renders the player side and the CPU side with different
props.

**Stage 4 — useState.** The score enters the app: `App` holds the player and
CPU scores in state, and handlers in the components call the setters. Clicking
a move can now change what is on screen — the page has memory.

**Stage 5 — Events.** The buttons become real controls: each move button wires
an `onClick` or `onChange` handler, the CPU's random reply is computed, and a
round processes — the game now reacts to the user.

**Stage 6 — Conditional rendering.** The interface adapts: a "thinking…"
status while the CPU picks, the winner message, and a re-match button appear
based on state — the same UI shape that shows "You win" also shows "CPU wins"
because the JSX is conditional.

**Stage 7 — useEffect.** The CPU picks its move after a short delay, and the
page title shows the live score (`document.title`) — both tiny uses of an
effect that runs after render and cleans up after itself, instead of blocking
the UI.

**Stage 8 — useRef — the finish line.** A ref focuses the page heading right
after a round (or autofocuses the move buttons), which touches a DOM node
without forcing extra renders. The game is complete: static screen → reusable
components → dynamic props → stateful, event-driven, conditional, effect-driven,
and finally ref-touching — the whole session's concepts, live in one app.

---

## The eight concepts — one-line map

- **JSX** — markup with data in the middle of it.
- **Components** — small named, reusable functions that return markup.
- **Props** — the inputs a component receives from its parent.
- **useState** — memory that survives re-renders and updates the screen.
- **Events** — `onClick` / `onChange` / `onSubmit`: passing the function.
- **Conditional rendering** — ternaries and `&&` to show UI from state.
- **useEffect** — side work after render, with dependencies and cleanup.
- **useRef** — a mutable box / real DOM reference that never re-renders.

## The shared stylesheet

The game (and every example) uses a single small stylesheet — light theme,
white background, dark text, indigo accent. It defines the layout utilities,
the demo cards used across examples, and the `rps-*` classes for the game
(scoreboard, face-off cells, move buttons, winner states). It is pasted into
`src/index.css` once, at Stage 0, and never changes again.