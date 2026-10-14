import { useState } from 'react'
import CodeBlock from './site/CodeBlock.jsx'
import { rpsStages } from './live-project-rps'
import { conceptExamples } from './examples'
import { conceptExamplesB } from './examples-b'
import templateCss from './examples/template.css?raw'

function GitHubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

function LinkedInIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

function LockIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="11" width="17" height="10" rx="2.5" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
    </svg>
  )
}

function UnlockIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="11" width="17" height="10" rx="2.5" />
      <path d="M8 11V7.5a4 4 0 0 1 7.6-1.3" />
    </svg>
  )
}

const RAKHANGE_LINKEDIN = 'https://www.linkedin.com/in/rakhangezaid/'
const RAKHANGE_GITHUB = 'https://github.com/icancodefyi'

const SOLUTIONS_PASSWORD = 'session-zaid'
const STAGES_PASSWORD = 'rps'

const sessions = [
  {
    key: 'a',
    label: 'Core React',
    groups: [
      { kind: 'concept', name: 'Concept Examples', items: conceptExamples },
      { kind: 'stage',   name: 'Live Project — Rock Paper Scissors', items: rpsStages },
    ],
  },
  {
    key: 'b',
    label: 'Forms → Custom Hooks',
    groups: [
      { kind: 'concept', name: 'Concept Examples', items: conceptExamplesB },
    ],
  },
]

function findItem(id, groups) {
  for (const group of groups) {
    const found = group.items.find((item) => item.id === id)
    if (found) return { found, kind: group.kind }
  }
  return null
}

function ConceptView({ item, unlocked, onRequestSolution, onRelock, templateCss }) {
  const [previewMode, setPreviewMode] = useState('starter')
  const [codeMode, setCodeMode] = useState('starter')

  const Active = previewMode === 'starter' ? item.Starter : item.Solution

  function switchPreview(mode) {
    setPreviewMode(mode)
  }

  function switchCode(mode) {
    if (mode === 'solution' && !unlocked) return onRequestSolution()
    setCodeMode(mode)
  }

  return (
    <>
      <h1>
        <span className="ex-num">{item.num}</span> {item.title}
      </h1>
      <p className="subhead">{item.teach}</p>

      {item.blurb ? (
        <div className="ex-panel">
          <div className="ex-label">What happens here</div>
          <div className="blurb">
            <div className="blurb-row">
              <span className="blurb-key">Starter</span>
              <p className="blurb-text">{item.blurb.starter}</p>
            </div>
            <div className="blurb-row">
              <span className="blurb-key blurb-key-sol">Solution</span>
              <p className="blurb-text">{item.blurb.solution}</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="ex-panel theory">
        <div className="ex-label">Theory</div>
        {item.theory.map((block, i) => {
          if (block.h) return <h4 key={i} className="theory-h">{block.h}</h4>
          if (block.p) return <p key={i} className="theory-p">{block.p}</p>
          if (block.ul) return (
            <ul key={i} className="theory-ul">
              {block.ul.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )
          if (block.code) return (
            <CodeBlock key={i} code={block.code} title="example" />
          )
          return null
        })}
      </div>

      <div className="ex-panel">
        <div className="ex-label">
          Preview
          <div className="seg">
            <button
              className={'seg-btn' + (previewMode === 'starter' ? ' active' : '')}
              onClick={() => switchPreview('starter')}
            >
              Starter
            </button>
            <button
              className={'seg-btn' + (previewMode === 'solution' ? ' active' : '')}
              onClick={() => switchPreview('solution')}
            >
              Solution
            </button>
          </div>
        </div>
        <Active />
      </div>

      <div className="ex-panel">
        <div className="ex-label">
          Code — students copy-paste the Starter and CSS, you build the Solution together.
          <div className="seg">
            <button
              className={'seg-btn' + (codeMode === 'starter' ? ' active' : '')}
              onClick={() => switchCode('starter')}
            >
              Starter
            </button>
            <button
              className={'seg-btn' + (codeMode === 'css' ? ' active' : '')}
              onClick={() => setCodeMode('css')}
            >
              CSS
            </button>
            <button
              className={'seg-btn' + (codeMode === 'solution' ? ' active' : '')}
              onClick={() => switchCode('solution')}
            >
              {unlocked ? 'Solution' : (
                <span className="with-icon"><LockIcon /> Solution</span>
              )}
            </button>
          </div>
        </div>
        {codeMode === 'css' ? (
          <>
            <CodeBlock code={templateCss} title="src/index.css" language="css" />
            <p className="demo-note">
              The styling, already done for you. Add this once — every example shares it.
            </p>
          </>
        ) : (
          <CodeBlock
            code={codeMode === 'starter' ? item.starterCode : item.solutionCode}
            title={
              codeMode === 'starter'
                ? 'src/examples/Starter.jsx'
                : 'src/examples/Solution.jsx'
            }
          />
        )}
      </div>

      {unlocked ? (
        <div className="unlocked-bar">
          <span className="with-icon"><UnlockIcon size={15} /> Solutions unlocked for this browser</span>
          <button className="btn btn-auto" onClick={onRelock}>Lock again</button>
        </div>
      ) : (
        <p className="subhead lock-hint">
          <span className="with-icon"><LockIcon /> Solutions unlock with the password shared at the end of the session.</span>
        </p>
      )}
    </>
  )
}

function StageView({ item, templateCss, locked, onUnlockStages }) {
  const [codeMode, setCodeMode] = useState('app')
  const [pass, setPass] = useState('')
  const [passError, setPassError] = useState(false)
  const Active = item.Component

  function submitStageUnlock(e) {
    e.preventDefault()
    if (pass === STAGES_PASSWORD) {
      onUnlockStages()
      setPass('')
      setPassError(false)
    } else {
      setPassError(true)
    }
  }

  if (locked) {
    return (
      <>
        <h1>{item.name}</h1>
        <p className="subhead">
          {item.topic ? `${item.topic} — ` : ''}{item.intro}
        </p>

        <div className="ex-panel">
          <div className="stage-lock">
            <span className="stage-lock-icon"><LockIcon size={18} /></span>
            <h3>Stage locked</h3>
            <p className="demo-note">
              Stage 0 stays open as the starting point. Unlock the rest of the
              build with the password from the session.
            </p>
            <form className="stage-lock-form" onSubmit={submitStageUnlock}>
              <input
                className="name-input"
                type="password"
                placeholder="Enter password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value)
                  setPassError(false)
                }}
                autoFocus
              />
              {passError ? <p className="lock-error">Wrong password — try again.</p> : null}
              <button className="btn" type="submit">Unlock stages</button>
            </form>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <h1>{item.name}</h1>
      <p className="subhead">
        {item.topic ? `${item.topic} — ` : ''}{item.intro}
      </p>

      <div className="ex-panel">
        <div className="ex-label">Do this — build it</div>
        <ol className="build-steps">
          {item.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="ex-panel">
        <div className="ex-label">
          Code
          <div className="seg">
            <button
              className={'seg-btn' + (codeMode === 'app' ? ' active' : '')}
              onClick={() => setCodeMode('app')}
            >
              App.jsx
            </button>
            <button
              className={'seg-btn' + (codeMode === 'css' ? ' active' : '')}
              onClick={() => setCodeMode('css')}
            >
              CSS
            </button>
          </div>
        </div>
        {codeMode === 'css' ? (
          <>
            <CodeBlock code={templateCss} title="src/index.css" language="css" />
            <p className="demo-note">
              One stylesheet for the whole game — add it once at Stage 0.
            </p>
          </>
        ) : (
          <CodeBlock code={item.code} title="src/App.jsx" />
        )}
      </div>

      <div className="ex-panel">
        <div className="ex-label">Result — run it</div>
        <Active />
      </div>
    </>
  )
}

function LockModal({ onClose, onUnlock }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (input === SOLUTIONS_PASSWORD) {
      onUnlock()
    } else {
      setError(true)
    }
  }

  return (
    <div className="lock-overlay" onClick={onClose}>
      <form
        className="lock-modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
      >
        <h3><span className="with-icon"><LockIcon size={15} /> Solutions are locked</span></h3>
        <p className="demo-note">
          The Starter gives you the UI. The Solution — the logic shown live in the
          session — unlocks with the password shared at the end of the workshop.
        </p>
        <input
          className="name-input"
          type="password"
          placeholder="Enter password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        {error ? <p className="lock-error">Wrong password — try again.</p> : null}
        <div className="row">
          <button className="btn" type="submit">Unlock</button>
          <button className="btn btn-auto" type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

function App() {
  const [session, setSession] = useState('a')
  const [activeId, setActiveId] = useState('jsx')
  const [solutionsUnlocked, setSolutionsUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem('csi-unlocked') === '1'
    } catch {
      return false
    }
  })
  const [stagesUnlocked, setStagesUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem('csi-rps-unlocked') === '1'
    } catch {
      return false
    }
  })
  const [showLock, setShowLock] = useState(false)

  const currentSession = sessions.find((s) => s.key === session)
  const groups = currentSession.groups

  function switchSession(key) {
    setSession(key)
    const first = sessions.find((s) => s.key === key).groups[0]?.items[0]
    if (first) setActiveId(first.id)
  }

  function unlock() {
    try {
      sessionStorage.setItem('csi-unlocked', '1')
    } catch {
      /* storage unavailable */
    }
    setSolutionsUnlocked(true)
    setShowLock(false)
  }

  function unlockStages() {
    try {
      sessionStorage.setItem('csi-rps-unlocked', '1')
    } catch {
      /* storage unavailable */
    }
    setStagesUnlocked(true)
  }

  function relock() {
    try {
      sessionStorage.removeItem('csi-unlocked')
    } catch {
      /* storage unavailable */
    }
    setSolutionsUnlocked(false)
  }

  const current = findItem(activeId, groups)

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <img className="brand-logo" src="/csi-logo.svg" alt="CSI ACE logo" />
          <span className="brand-title">React Session</span>
        </div>
        <nav className="topbar-links">
          <a
            className="topbar-link"
            href={RAKHANGE_GITHUB}
            target="_blank"
            rel="noreferrer noopener"
          >
            <GitHubIcon /> Zaid's GitHub
          </a>
          <a
            className="topbar-link"
            href={RAKHANGE_LINKEDIN}
            target="_blank"
            rel="noreferrer noopener"
          >
            <LinkedInIcon /> Zaid's LinkedIn
          </a>
        </nav>
      </header>

      <div className="viewer">
        <aside className="sidebar">
          <div className="session-toggle">
            {sessions.map((s) => (
              <button
                key={s.key}
                className={'session-btn' + (s.key === session ? ' active' : '')}
                onClick={() => switchSession(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
          {groups.map((group) => (
            <div key={group.name}>
              <h2>{group.name}</h2>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  className={'side-item' + (item.id === activeId ? ' active' : '')}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.num ? `${item.num} · ${item.title}` : item.name}
                </button>
              ))}
            </div>
          ))}
        </aside>

      <main className="content">
        {!current ? (
          <p className="subhead">Pick an example from the sidebar.</p>
        ) : current.kind === 'concept' ? (
          <ConceptView
            key={activeId}
            item={current.found}
            unlocked={solutionsUnlocked}
            onRequestSolution={() => setShowLock(true)}
            onRelock={relock}
            templateCss={templateCss}
          />
        ) : current.kind === 'stage' ? (
          <StageView
            key={activeId}
            item={current.found}
            templateCss={templateCss}
            locked={current.found.id !== 'rps-0' && !stagesUnlocked}
            onUnlockStages={unlockStages}
          />
        ) : (
          <p className="subhead">Pick a section from the sidebar.</p>
        )}
      </main>
      </div>

      {showLock ? (
        <LockModal
          onClose={() => setShowLock(false)}
          onUnlock={unlock}
        />
      ) : null}
    </>
  )
}

export default App