import JsxStarter from './jsx/Starter.jsx'
import JsxSolution from './jsx/Solution.jsx'
import ComponentsStarter from './components/Starter.jsx'
import ComponentsSolution from './components/Solution.jsx'
import PropsStarter from './props/Starter.jsx'
import PropsSolution from './props/Solution.jsx'
import StateStarter from './state/Starter.jsx'
import StateSolution from './state/Solution.jsx'
import EventsStarter from './events/Starter.jsx'
import EventsSolution from './events/Solution.jsx'
import ConditionalStarter from './conditional/Starter.jsx'
import ConditionalSolution from './conditional/Solution.jsx'
import EffectsStarter from './effects/Starter.jsx'
import EffectsSolution from './effects/Solution.jsx'
import RefsStarter from './refs/Starter.jsx'
import RefsSolution from './refs/Solution.jsx'

import JsxStarterCode from './jsx/Starter.jsx?raw'
import JsxSolutionCode from './jsx/Solution.jsx?raw'
import ComponentsStarterCode from './components/Starter.jsx?raw'
import ComponentsSolutionCode from './components/Solution.jsx?raw'
import PropsStarterCode from './props/Starter.jsx?raw'
import PropsSolutionCode from './props/Solution.jsx?raw'
import StateStarterCode from './state/Starter.jsx?raw'
import StateSolutionCode from './state/Solution.jsx?raw'
import EventsStarterCode from './events/Starter.jsx?raw'
import EventsSolutionCode from './events/Solution.jsx?raw'
import ConditionalStarterCode from './conditional/Starter.jsx?raw'
import ConditionalSolutionCode from './conditional/Solution.jsx?raw'
import EffectsStarterCode from './effects/Starter.jsx?raw'
import EffectsSolutionCode from './effects/Solution.jsx?raw'
import RefsStarterCode from './refs/Starter.jsx?raw'
import RefsSolutionCode from './refs/Solution.jsx?raw'

export const conceptExamples = [
  {
    id: 'jsx',
    num: '01',
    title: 'JSX',
    teach: 'Layout with JavaScript. Variables, expressions, and objects inside {curly braces}.',
    blurb: {
      starter: 'A finished student-profile card — one name, one batch, a skill list. All typed out by hand as fixed text.',
      solution: 'The same card, but every label is printed by {curly braces} reading from a JS object — name, uppercase name, batch, and each skill. Change the data and the card changes.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'JSX is the syntax React components are written in. It looks like HTML, but it lives inside a JavaScript file, so markup and logic share one place.',
      },
      {
        p: 'Browsers cannot run JSX natively. Vite compiles it into plain createElement(...) calls at build time — JSX is not a new language, just sugar over normal React function calls.',
      },
      {
        h: 'Expressions in {curly braces}',
      },
      {
        p: 'Anything between { and } inside JSX is a real JavaScript expression, and its result is what gets painted. Variables print, arithmetic runs, function calls return:',
      },
      {
        code: `const name = 'Zaid Rakhange'
const batch = 2027

<h1>{name}</h1>              // Zaid Rakhange
<h2>{batch}</h2>            // 2027
<p>{name.toUpperCase()}</p>  // ZAID RAKHANGE`,
      },
      {
        p: 'The expression is evaluated before anything touches the screen, so you build markup from data instead of typing "{name}" out. Anything that evaluates to a value works: a variable, a calculation, a function call, string length.',
      },
      {
        p: 'What is NOT allowed inside the braces is a statement — no if, no for, no let. Decisions inside JSX use expressions (ternaries, the next topic), not statements.',
      },
      {
        h: 'Rules & gotchas',
      },
      {
        ul: [
          'One component returns ONE element — wrap siblings in a <div>, <main>, or a <> ... </> fragment (fragments add no element to the page).',
          'Use className, not class — class is a reserved word in JavaScript.',
          'Event props use camelCase and take functions: onClick, not onclick.',
          'Void elements are self-closing: <img /> and <input /> work, <img> does not.',
          'If the screen stays unchanged, you typed the value in rather than evaluating it — look for missing braces.',
        ],
      },
    ],
    Starter: JsxStarter,
    Solution: JsxSolution,
    starterCode: JsxStarterCode,
    solutionCode: JsxSolutionCode,
  },
  {
    id: 'components',
    num: '02',
    title: 'Components',
    teach: 'Break the page into small, reusable pieces. Build the UI from custom tags.',
    blurb: {
      starter: 'Two team-member cards, one after the other — the whole card markup is copied and pasted twice.',
      solution: 'One Card built from tiny components — Badge, MemberName, MemberRole — and App composes it as many times as it needs. Same output, zero duplication.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'A component is just a function that returns JSX. The whole app is a tree of these functions — each one answers a single question: "render this chunk of the page here".',
      },
      {
        code: `function Scoreboard() {
  return <div className="scoreboard">You 0 · CPU 0</div>
}`,
      },
      {
        p: 'Pages stop being one giant HTML file and become small building blocks. A component\u2019s JSX may use other components in place of plain elements — that is composition:',
      },
      {
        code: `function Game() {
  return (
    <div className="game">
      <Scoreboard />
      <FaceOff />
      <Moves />
    </div>
  )
}`,
      },
      {
        h: 'Key ideas',
      },
      {
        ul: [
          'Split a page into pieces: Badge, MemberName, MemberRole — each is its own function.',
          'Reuse a piece anywhere without copying its markup again: <MemberCard /> as many times as you like.',
          'App composes smaller components, like stacking blocks.',
          'Children: JSX placed between your tags (<Card>…</Card>) arrives as a special children prop this component renders wherever it likes.',
        ],
      },
      {
        h: 'Rules & gotchas',
      },
      {
        ul: [
          'Component names MUST start with a capital letter. Lowercase is treated as a plain HTML tag (<div>, <p>) and is never your component.',
          'A component returns ONE top-level element — a fragment <> ... </> costs nothing and qualifies.',
          'A component function runs on every render — keep it pure: same input in, same JSX out.',
          'The next topic (Props) is how a piece gets its data — for now every piece draws itself.',
        ],
      },
    ],
    Starter: ComponentsStarter,
    Solution: ComponentsSolution,
    starterCode: ComponentsStarterCode,
    solutionCode: ComponentsSolutionCode,
  },
  {
    id: 'props',
    num: '03',
    title: 'Props',
    teach: 'Make components accept data. One component, many layouts.',
    blurb: {
      starter: 'Two pricing cards, Basic and Pro, hard-coded side by side — separate markup, duplicated styles.',
      solution: 'One generic PricingCard component. The same JSX is rendered with different props (plan, price, features) — one component produces both cards.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'Props are the arguments a component receives — parameters for markup. They arrive as a single props object and are usually destructured in the signature:',
      },
      {
        code: `function PricingCard({ plan, price, features, featured }) {
  return (
    <div className={'price-card' + (featured ? ' featured' : '')}>
      <h3>{plan}</h3>
      <p>₹{price}</p>
      <ul>{features.map((f) => <li key={f}>{f}</li>)}</ul>
    </div>
  )
}`,
      },
      {
        p: 'Data flows one way: a parent hands props to a child, and a child never sends them back up. One component + different props = many different cards on the page:',
      },
      {
        code: `<PricingCard plan="Basic" price={0} features={['2 examples', 'Community support']} />
<PricingCard plan="Pro" price={99} features={['Everything in Basic', 'Stage-by-stage help']} featured />`,
      },
      {
        ul: [
          'featured with no value means featured={true} — a handy shorthand for boolean props.',
          'Defaults: function PricingCard({ plan = "Free" }) kicks in when no prop is passed.',
          'Spread: <PricingCard {...event} /> passes every field of event as props at once.',
          'Props can be strings, numbers, booleans, arrays, functions — even other JSX.',
        ],
      },
      {
        h: 'Rules & gotchas',
      },
      {
        ul: [
          'Props are READ-ONLY inside the component — never reassign them.',
          'A component re-renders whenever the props it receives change.',
          'Forgetting to pass a prop gives undefined — render it with a default value if you like.',
        ],
      },
    ],
    Starter: PropsStarter,
    Solution: PropsSolution,
    starterCode: PropsStarterCode,
    solutionCode: PropsSolutionCode,
  },
  {
    id: 'state',
    num: '04',
    title: 'useState',
    teach: 'Give the page memory. Variables reset on reload — state survives.',
    blurb: {
      starter: 'A like counter frozen at "0 likes" with a Like button that responds to nothing.',
      solution: 'The count lives in state. Clicking Like calls the setter, the number re-renders, and the button keeps counting up.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'State is data the component remembers between renders. A plain variable resets to its starting value on every render, which is useless for anything that must survive or change — a like count, a score, text being typed.',
      },
      {
        code: `const [likes, setLikes] = useState(0)`,
      },
      {
        p: 'useState(0) returns a pair, always destructured in the same order: the current value, and a setter function. Calling the setter does two things at once — it changes the value AND tells React to redraw the screen.',
      },
      {
        code: `function LikeButton() {
  const [likes, setLikes] = useState(0)

  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ {likes}
    </button>
  )
}`,
      },
      {
        h: 'Key ideas',
      },
      {
        ul: [
          'Only the component that owns the state re-renders when it changes — its children do too, but the rest of the app is untouched.',
          'New state REPLACES the old value. That is why strings and arrays are copied before updating (setText(t + \'!\'), setItems([...items, x])).',
          'The setter accepts either a value or an updater function: setLikes(prev => prev + 1) — the updater form is the safe one when the next value depends on the previous.',
        ],
      },
      {
        h: 'Rules & gotchas',
      },
      {
        ul: [
          'Never mutate directly: likes++ or state.count = 5 does nothing useful — always use the setter.',
          'Hooks must run at the top level of the component, inside the function body — not inside if, loops, or nested functions.',
          'Calling a setter does not update the variable on that same line — it schedules a re-render with the new value.',
        ],
      },
    ],
    Starter: StateStarter,
    Solution: StateSolution,
    starterCode: StateStarterCode,
    solutionCode: StateSolutionCode,
  },
  {
    id: 'events',
    num: '05',
    title: 'Events',
    teach: 'React to a click or a keystroke. Handle input, then re-render.',
    blurb: {
      starter: 'A guest book with a name field and a "Sign in" button. Typing and clicking do nothing at all.',
      solution: 'Handlers come alive: every keystroke lands in state via onChange, submitting runs a handler that prevents a page reload, and the guest signs in.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'Events are the real world pushing back: clicks, typing, form submits. React wires them to elements with handler props — onClick, onChange, onSubmit. A handler is a function you pass; React calls it when the event actually fires.',
      },
      {
        code: `function LikeButton() {
  const [likes, setLikes] = useState(0)

  function handleLike() {
    setLikes(prev => prev + 1)
  }

  return <button onClick={handleLike}>❤️ {likes}</button>
}`,
      },
      {
        h: 'The one rule behind most bugs',
      },
      {
        p: 'Pass the function, not the call. onClick={handleLike} hands React a reference it invokes on click; onClick={handleLike()} runs the function immediately, during render, and passes the result.',
      },
      {
        code: `onClick={handleLike}     // correct — called when clicked
onClick={handleLike()}   // wrong — runs immediately, does nothing later`,
      },
      {
        p: 'When the handler needs an argument, wrap it in an arrow: onClick={() => handleLike(\'rock\')}.',
      },
      {
        h: 'Key patterns',
      },
      {
        ul: [
          'Controlled input — every keystroke lands in state: <input value={text} onChange={(e) => setText(e.target.value)} />. State is the single source of truth and the field always reflects it.',
          'e.target.value reads the input\u2019s new value from the event object.',
          'e.preventDefault() on a form submit stops the browser reloading the page — a reload wipes all state.',
        ],
      },
      {
        h: 'Rules & gotchas',
      },
      {
        ul: [
          'onClick={fn()} runs immediately and does nothing later — the classic beginner bug.',
          'Form submits reload the page unless you call e.preventDefault() in the submit handler.',
          'Events only work when attached inside JSX on the actual element users touch.',
        ],
      },
    ],
    Starter: EventsStarter,
    Solution: EventsSolution,
    starterCode: EventsStarterCode,
    solutionCode: EventsSolutionCode,
  },
  {
    id: 'conditional',
    num: '06',
    title: 'Conditional',
    teach: 'Render different UI depending on state. The classic "if else" in JSX.',
    blurb: {
      starter: 'A workshop card that says "24 people are going" with one Join button.',
      solution: 'State decides the screen: not joined shows the Join button, joined shows a different message and a Leave button — the same card, two faces, via ternary and &&.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'The screen you see is a decision: is the user joined or not? In React that decision is plain JavaScript inside JSX — no template directives or special syntax, just expressions that choose which JSX to render.',
      },
      {
        h: 'Ternary — one of two branches, both defined',
      },
      {
        code: `{joined
  ? <p className="member">You're in! 🎉</p>
  : <button onClick={() => setJoined(true)}>Join</button>
}`,
      },
      {
        p: 'Ternary when both branches exist. The condition reads like plain English: if joined is truthy, render the first result; otherwise render the second.',
      },
      {
        h: 'Short-circuit — show something or nothing',
      },
      {
        code: `{isLoading && <Spinner />}`,
      },
      {
        p: '&& renders the right side only when the left side is truthy — a compact "maybe show this" gate. Use it when the alternative is nothing at all.',
      },
      {
        h: 'Whole-screen switch',
      },
      {
        code: `if (!user) return <Login />
return <Dashboard />`,
      },
      {
        p: 'A component may return completely different trees — the condition does not have to be inside JSX. Plain early returns split an entire screen.',
      },
      {
        h: 'Rules & gotchas',
      },
      {
        ul: [
          'A condition must produce JSX, null, or nothing — never raw numbers. {count && <X/>} renders the literal "0" when count is 0; write {count > 0 && <X/>}.',
          'Use a ternary when both branches exist; && when only one does.',
          'The state you check must already exist — conditions never create state.',
        ],
      },
    ],
    Starter: ConditionalStarter,
    Solution: ConditionalSolution,
    starterCode: ConditionalStarterCode,
    solutionCode: ConditionalSolutionCode,
  },
  {
    id: 'effects',
    num: '07',
    title: 'useEffect',
    teach: 'Do something when state changes — sync the outside world (the tab title).',
    blurb: {
      starter: 'A working counter: +1 and reset buttons update the number on screen.',
      solution: 'Same counter, plus a side effect — the browser tab title now follows the count, updated via useEffect after every change.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'Rendering only paints the screen. Side effects are things to do AROUND it: change the tab title, fetch data, start timers, save. useEffect runs a function AFTER the component paints, and again when its dependencies change.',
      },
      {
        code: `useEffect(() => {
  document.title = \`Count is \${count}\`
}, [count])   // dependency array`,
      },
      {
        p: 'The dependency array is the "watch list": React re-runs the effect only when one of those values has changed since the last render. An empty array [] means run once, right after the first render, and never again.',
      },
      {
        code: `useEffect(() => {
  const t = setTimeout(() => alert('Time!'), 5000)
  return () => clearTimeout(t)   // cleanup
}, [])`,
      },
      {
        h: 'Rules & gotchas',
      },
      {
        ul: [
          'Anything the effect reads from state or props belongs in the dependency array — otherwise it reads stale values.',
          'Return a cleanup function to undo the effect: clearTimeout, remove listeners, unsubscribe. Without it, repeats stack up (double timers, duplicate listeners).',
          'Effects run after render — they must not be what makes the screen correct in the same pass.',
          'Do not set state directly inside an effect unless it truly needs the post-render pass — prefer computing during render.',
        ],
      },
    ],
    Starter: EffectsStarter,
    Solution: EffectsSolution,
    starterCode: EffectsStarterCode,
    solutionCode: EffectsSolutionCode,
  },
  {
    id: 'refs',
    num: '08',
    title: 'useRef',
    teach: 'Reach for elements directly without causing a re-render.',
    blurb: {
      starter: 'A search input and a "Focus the input" button that does nothing.',
      solution: 'A ref attaches directly to the input; clicking the button calls inputRef.current.focus() — touching the real element with no re-render.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'A ref is a box: useRef(null) gives { current: null } — a value React keeps between renders but does not watch. Refs are for things state should NOT redraw for: focusing inputs, scrolling, measuring size, storing timers.',
      },
      {
        code: `function AutoFocusInput() {
  const inputRef = useRef(null)

  return (
    <input
      ref={inputRef}
      placeholder="Type your name"
      onFocus={() => inputRef.current.select()}
    />
  )
}`,
      },
      {
        p: 'ref={inputRef} attaches the box to a real element; after the render, inputRef.current is the actual <input>. focus(), select(), scrollIntoView(), measuring size — DOM things React data cannot do.',
      },
      {
        h: 'The key difference from state',
      },
      {
        p: 'Changing ref.current does NOT trigger a render — that is the entire point. Use state for what the user SEES; refs for what you need to grab directly.',
      },
      {
        h: 'Rules & gotchas',
      },
      {
        ul: [
          'Read ref.current in event handlers, not in JSX — writing it in the markup never updates the screen.',
          'ref.current is null until the element mounts — guard, or read it inside the handler.',
          'Do not put a ref on every input just to read a value — a controlled input (state) is usually better.',
        ],
      },
    ],
    Starter: RefsStarter,
    Solution: RefsSolution,
    starterCode: RefsStarterCode,
    solutionCode: RefsSolutionCode,
  },
]