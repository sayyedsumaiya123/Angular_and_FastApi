import ListsStarter from './lists/Starter.jsx'
import ListsSolution from './lists/Solution.jsx'
import FormsStarter from './forms/Starter.jsx'
import FormsSolution from './forms/Solution.jsx'
import ApiStarter from './api/Starter.jsx'
import ApiSolution from './api/Solution.jsx'
import CommStarter from './communication/Starter.jsx'
import CommSolution from './communication/Solution.jsx'
import RoutingStarter from './routing/Starter.jsx'
import RoutingSolution from './routing/Solution.jsx'
import HooksStarter from './custom-hooks/Starter.jsx'
import HooksSolution from './custom-hooks/Solution.jsx'

import ListsStarterCode from './lists/Starter.jsx?raw'
import ListsSolutionCode from './lists/Solution.jsx?raw'
import FormsStarterCode from './forms/Starter.jsx?raw'
import FormsSolutionCode from './forms/Solution.jsx?raw'
import ApiStarterCode from './api/Starter.jsx?raw'
import ApiSolutionCode from './api/Solution.jsx?raw'
import CommStarterCode from './communication/Starter.jsx?raw'
import CommSolutionCode from './communication/Solution.jsx?raw'
import RoutingStarterCode from './routing/Starter.jsx?raw'
import RoutingSolutionCode from './routing/Solution.jsx?raw'
import HooksStarterCode from './custom-hooks/Starter.jsx?raw'
import HooksSolutionCode from './custom-hooks/Solution.jsx?raw'

export const conceptExamplesB = [
  {
    id: 'b-lists',
    num: '01',
    title: 'Lists',
    teach: 'Render arrays with .map() and key. One array, any number of items.',
    blurb: {
      starter: 'Three events hardcoded as separate divs — copy-paste a fourth and you get a fourth item.',
      solution: 'One array, one .map(), and React paints every item automatically. Add a fourth to the array and it appears.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'Most UI is a list: messages, products, team members, events. React renders lists by mapping an array to JSX — one element per item.',
      },
      {
        code: `const events = [
  { id: 1, name: 'React Workshop', date: 'Aug 31' },
  { id: 2, name: 'Hackathon',      date: 'Sep 15' },
]`,
      },
      {
        h: '.map() and the key prop',
      },
      {
        p: 'Array.map() turns each item into JSX. Every top-level element needs a unique key — React uses it to track which item is which during re-renders.',
      },
      {
        code: `{events.map((event) => (
  <div className="event-item" key={event.id}>
    <span>{event.name}</span>
    <span>{event.date}</span>
  </div>
))}`,
      },
      {
        h: 'Rules & gotchas',
      },
      {
        ul: [
          'key must be unique among siblings — the array index works but is discouraged when items reorder or delete.',
          'key is not accessible inside the child — use id as the key, not something you need to read.',
          'Each mapped element must be a single JSX element — wrap in a fragment <> if needed.',
          'If you see a React warning about missing keys, one of your mapped elements is missing a key.',
        ],
      },
    ],
    Starter: ListsStarter,
    Solution: ListsSolution,
    starterCode: ListsStarterCode,
    solutionCode: ListsSolutionCode,
  },
  {
    id: 'b-forms',
    num: '02',
    title: 'Forms',
    teach: 'Controlled inputs. State is the single source of truth — the field always reflects it.',
    blurb: {
      starter: 'A sign-up form with name and email fields and a Submit button. Typing does nothing — inputs are dead.',
      solution: 'Every keystroke lands in state via onChange, the input value is bound to state, and submit reads the values after preventDefault.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'Forms collect user input — text, selections, checkboxes. React handles them with state: each keystroke updates state, and the input value always mirrors that state.',
      },
      {
        code: `const [email, setEmail] = useState('')
<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>`,
      },
      {
        h: 'Controlled vs uncontrolled',
      },
      {
        p: 'Controlled: React state is the source of truth — value={state}. Uncontrolled: the DOM holds the value — use ref to read it. Controlled is the React way for most forms.',
      },
      {
        h: 'Form submission',
      },
      {
        code: `function handleSubmit(e) {
  e.preventDefault()      // stops page reload
  // read state, send data
}`,
      },
      {
        p: 'Without e.preventDefault(), the browser reloads the page on submit, wiping all state.',
      },
      {
        h: 'Rules & gotchas',
      },
      {
        ul: [
          'value={state} without onChange makes the input read-only — you need both.',
          'e.preventDefault() in onSubmit is mandatory or the page reloads.',
          'For textareas, use <textarea value={…}> — the same pattern applies.',
          'For checkboxes, use checked={bool} instead of value.',
        ],
      },
    ],
    Starter: FormsStarter,
    Solution: FormsSolution,
    starterCode: FormsStarterCode,
    solutionCode: FormsSolutionCode,
  },
  {
    id: 'b-api',
    num: '03',
    title: 'API',
    teach: 'Fetch data, show loading, handle errors. useEffect runs the fetch after render.',
    blurb: {
      starter: 'A Users panel with two hardcoded cards and a "Load Users" button that does nothing.',
      solution: 'useEffect fires a fetch on mount, loading and error states handle the in-between, and the user list maps over real data from an API.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'Most apps fetch data from a server. React fetches in useEffect — after the component renders — and stores the result in state, which triggers a re-render with the real data.',
      },
      {
        code: `const [users, setUsers] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => { setUsers(data); setLoading(false) })
}, [])   // empty deps = fetch once on mount`,
      },
      {
        h: 'Loading and error states',
      },
      {
        p: 'You never have the data immediately. Show a loading indicator while fetching, and an error message if it fails — the screen is never blank or broken.',
      },
      {
        h: 'Rules & gotchas',
      },
      {
        ul: [
          'Fetch in useEffect, not during render — rendering must be fast and side-effect-free.',
          'Empty dependency array [] = run once on mount. Missing it = re-fetch every render.',
          'Always handle errors — a network failure should show a message, not crash.',
          'Use an ignore flag or AbortController to avoid setting state on unmounted components.',
        ],
      },
    ],
    Starter: ApiStarter,
    Solution: ApiSolution,
    starterCode: ApiStarterCode,
    solutionCode: ApiSolutionCode,
  },
  {
    id: 'b-communication',
    num: '04',
    title: 'Communication',
    teach: 'Props down, callbacks up. Parents own data; children receive it and send events back.',
    blurb: {
      starter: 'A user card and a counter — each hardcoded with their own data, no connection between them.',
      solution: 'App owns the users list and count. UserCard and Counter receive them as props and call back via callback props to remove or like.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'Components talk through props. Data flows down: a parent passes props to a child. Events flow up: the child calls a function the parent gave it.',
      },
      {
        code: `function UserCard({ name, onRemove }) {
  return (
    <div>
      <h2>{name}</h2>
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}`,
      },
      {
        h: 'Lifting state up',
      },
      {
        p: 'When two siblings need the same data, move the state to their closest common parent and pass it down. The parent owns the truth; children just display it.',
      },
      {
        h: 'Rules & gotchas',
      },
      {
        ul: [
          'Props are read-only — a child never modifies a prop directly.',
          'Callback props are just functions: onClick={() => onRemove(id)}.',
          'If you find yourself passing the same props through many levels, consider context or state management.',
          'State should live in the lowest component that needs it — or the closest common ancestor.',
        ],
      },
    ],
    Starter: CommStarter,
    Solution: CommSolution,
    starterCode: CommStarterCode,
    solutionCode: CommSolutionCode,
  },
  {
    id: 'b-routing',
    num: '05',
    title: 'Routing',
    teach: 'Map URLs to components. Different path = different component on screen.',
    blurb: {
      starter: 'A multi-page app simulated with state — buttons toggle which "page" is shown via if/else.',
      solution: 'react-router-dom replaces the state switch: <Link> navigates, <Routes> picks the right component, and the URL stays honest.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'Routing maps a URL path to a component. When the URL is /about, React renders the About component — not by hiding elements, but by swapping them.',
      },
      {
        code: `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}`,
      },
      {
        h: 'Key pieces',
      },
      {
        ul: [
          'BrowserRouter wraps the app — one at the top.',
          'Link replaces <a> — it updates the URL without a full page reload.',
          'Routes matches the current URL and renders exactly one Route.',
          'useParams extracts dynamic segments: /users/:id → { id }.',
        ],
      },
      {
        h: 'Rules & gotchas',
      },
      {
        ul: [
          'Only one BrowserRouter per app — nesting them causes bugs.',
          'Link works inside BrowserRouter — plain <a> reloads the page.',
          'Routes renders the first matching Route — order matters.',
          'Always give Route a key when the path includes a dynamic segment.',
        ],
      },
    ],
    Starter: RoutingStarter,
    Solution: RoutingSolution,
    starterCode: RoutingStarterCode,
    solutionCode: RoutingSolutionCode,
  },
  {
    id: 'b-hooks',
    num: '06',
    title: 'Custom Hooks',
    teach: 'Extract reusable logic into use___ functions. Same rules as built-in hooks.',
    blurb: {
      starter: 'Two components — UserList and PostList — each with their own identical fetch logic copy-pasted.',
      solution: 'One useFetch(url) hook extracts the fetch + loading + error logic. Both components call it — zero duplication.',
    },
    theory: [
      {
        h: 'What it is',
      },
      {
        p: 'A custom hook is a function whose name starts with use and that calls other hooks. It extracts a piece of logic so multiple components can share it without duplicating stateful code.',
      },
      {
        code: `function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => { setData(json); setLoading(false) })
      .catch((err) => { setError(err.message); setLoading(false) })
  }, [url])

  return { data, loading, error }
}`,
      },
      {
        h: 'The rules',
      },
      {
        ul: [
          'Call hooks at the top level — never inside if, loops, or nested functions.',
          'Only call hooks from React functions — components or other custom hooks.',
          'Name starts with "use" — this is how React knows to check the rules of hooks.',
          'A custom hook can call any built-in hook (useState, useEffect, useRef, etc.).',
        ],
      },
      {
        h: 'When to extract',
      },
      {
        ul: [
          'Two components share the same stateful logic — time to extract.',
          'A component does several things and you want to separate concerns.',
          'A hook returns data + loading + error — a common pattern (useFetch, useAuth, etc.).',
        ],
      },
    ],
    Starter: HooksStarter,
    Solution: HooksSolution,
    starterCode: HooksStarterCode,
    solutionCode: HooksSolutionCode,
  },
]
