import Stage0 from './stages/stage-0.jsx'
import Stage1 from './stages/stage-1.jsx'
import Stage2 from './stages/stage-2.jsx'
import Stage3 from './stages/stage-3.jsx'
import Stage4 from './stages/stage-4.jsx'
import Stage5 from './stages/stage-5.jsx'
import Stage6 from './stages/stage-6.jsx'
import Stage7 from './stages/stage-7.jsx'
import Stage8 from './stages/stage-8.jsx'

import Stage0Code from './stages/stage-0.jsx?raw'
import Stage1Code from './stages/stage-1.jsx?raw'
import Stage2Code from './stages/stage-2.jsx?raw'
import Stage3Code from './stages/stage-3.jsx?raw'
import Stage4Code from './stages/stage-4.jsx?raw'
import Stage5Code from './stages/stage-5.jsx?raw'
import Stage6Code from './stages/stage-6.jsx?raw'
import Stage7Code from './stages/stage-7.jsx?raw'
import Stage8Code from './stages/stage-8.jsx?raw'

export const rpsStages = [
  {
    id: 'rps-0',
    name: 'Stage 0 — Static UI',
    topic: 'JSX',
    intro: 'The whole game, on screen, dead. No logic yet — just markup to look at.',
    steps: [
      'Create the project: npm create vite@latest rps -- --template react',
      'Enter it and install: cd rps, then npm install, then npm run dev',
      'Open src/App.jsx, delete the template demo code and paste in the code below',
      'Paste the stylesheet from the CSS tab into src/index.css — you only do this once, every stage shares it',
      'Save — the page updates instantly (hot reload)',
      'Click the buttons and be disappointed: nothing happens. Correct — there is no logic yet.',
    ],
    code: Stage0Code,
    Component: Stage0,
  },
  {
    id: 'rps-1',
    name: 'Stage 1 — Components',
    topic: 'Components',
    intro: 'Same screen, but now App is built from small pieces: Scoreboard, FaceOff, Moves.',
    steps: [
      'Open src/App.jsx and replace it with the code below',
      'Notice: the screen looks identical, but the page is now a tree of components',
      'This is Components: markup split into reusable functions',
    ],
    code: Stage1Code,
    Component: Stage1,
  },
  {
    id: 'rps-2',
    name: 'Stage 2 — JSX is dynamic',
    topic: 'JSX',
    intro: 'The three buttons now come from a moves array — JSX can loop over data with {moves.map(...)}.',
    steps: [
      'Replace src/App.jsx with the code below',
      'The buttons are no longer typed — they are rendered from the moves array',
      'Live moment: add a 4th move (Lizard, \ud83e\udd8e) to the array — a 4th button appears. Delete it after.',
    ],
    code: Stage2Code,
    Component: Stage2,
  },
  {
    id: 'rps-3',
    name: 'Stage 3 — Props',
    topic: 'Props',
    intro: 'Pieces accept data now: <Scoreboard you={0} cpu={0} draws={0} /> and <MoveButton move={...} />.',
    steps: [
      'Replace src/App.jsx with the code below',
      'Scoreboard and MoveButton now receive their values as props',
      'Highlight the difference from Stage 2: components stopped hardcoding — App supplies the data.',
    ],
    code: Stage3Code,
    Component: Stage3,
  },
  {
    id: 'rps-4',
    name: 'Stage 4 — useState',
    topic: 'useState',
    intro: 'The game gets memory. Click Rock and your side shows \u270a — state redraws only the parts that changed.',
    steps: [
      'Replace src/App.jsx with the code below',
      'Click a move — your emoji appears instantly',
      'The CPU and score are still static — that comes next.',
    ],
    code: Stage4Code,
    Component: Stage4,
  },
  {
    id: 'rps-5',
    name: 'Stage 5 — Events',
    topic: 'Events',
    intro: 'The physics: clicking picks your move AND the CPU picks one at random. The event object exists but clicks don\u2019t reload.',
    steps: [
      'Replace src/App.jsx with the code below',
      'play(pick) is now attached to every button with onClick',
      'Note the handler is passed as a function (() => play(move)), never called with parentheses',
    ],
    code: Stage5Code,
    Component: Stage5,
  },
  {
    id: 'rps-6',
    name: 'Stage 6 — Conditional',
    topic: 'Conditional',
    intro: 'The result line: win, lose or draw — decided by whoWins() and rendered with ternaries.',
    steps: [
      'Replace src/App.jsx with the code below',
      'beats encodes what each move defeats; whoWins derives the result — we do not store it',
      'The score now ticks up after every round',
    ],
    code: Stage6Code,
    Component: Stage6,
  },
  {
    id: 'rps-7',
    name: 'Stage 7 — useEffect',
    topic: 'useEffect',
    intro: 'Click around, then look at the browser tab — the score syncs there too. That\u2019s an effect.',
    steps: [
      'Replace src/App.jsx with the code below',
      'useEffect runs after every render where [score] changed and syncs document.title',
      'Play a few rounds and watch the tab update every time',
      'The game is fully playable now — the only thing left is a bit of keyboard polish.',
    ],
    code: Stage7Code,
    Component: Stage7,
  },
  {
    id: 'rps-8',
    name: 'Stage 8 — useRef (final)',
    topic: 'useRef',
    intro: 'Polish: resets now also focus the Rock button via useRef — a DOM node grabbed without re-rendering.',
    steps: [
      'Replace src/App.jsx with the code below — this is the finished game',
      'rockRef attaches to the first button; reset() focuses it so keyboard players can restart instantly',
      'Build it in real life: npm create vite, paste Stage 0, then climb stage by stage to here',
    ],
    code: Stage8Code,
    Component: Stage8,
  },
]