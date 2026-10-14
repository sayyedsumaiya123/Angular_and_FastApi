import { useEffect, useRef, useState } from 'react'
import CodeBlock from './site/CodeBlock.jsx'
import { conceptExamples } from './examples/index.jsx'
import { emsStages } from './live-project-ems/index.jsx'

export default function App() {
  const [activeSession, setActiveSession] = useState('a')
  const [activeItemId, setActiveItemId] = useState('first-route')
  const [previewMode, setPreviewMode] = useState('solution') // 'starter' | 'solution'
  const [codeMode, setCodeMode] = useState('solution') // 'starter' | 'solution'
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [screen, setScreen] = useState('output')
  const workspaceRef = useRef(null)
  const expandButtonRef = useRef(null)

  function chooseItem(id) {
    setActiveItemId(id)
    setScreen('output')
    setPreviewMode('solution')
    setCodeMode('solution')
    setPreviewVersion(v => v + 1)
    setPreviewRequest(v => v + 1)
  }

  const [previewVersion, setPreviewVersion] = useState(0)

  const [showOptional, setShowOptional] = useState(false)
  const [previewRequest, setPreviewRequest] = useState(0)
  function chooseMode(mode) {
    setCodeMode(mode)
    setPreviewMode(mode)
    setPreviewRequest(value => value + 1)
  }
  useEffect(() => {
    if (!previewRequest) return
    const frame = requestAnimationFrame(() => {
      workspaceRef.current?.querySelector('.lesson-panel:not([hidden])')?.scrollTo(0, 0)
      workspaceRef.current?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [previewRequest])

  useEffect(() => {
    if (!isFullscreen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    workspaceRef.current?.focus()
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsFullscreen(false)
      if (e.key !== 'Tab') return
      const controls = [...workspaceRef.current.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')]
        .filter(el => !el.disabled && el.getClientRects().length > 0)
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === workspaceRef.current)) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && (document.activeElement === last || document.activeElement === workspaceRef.current)) {
        e.preventDefault()
        first?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      expandButtonRef.current?.focus()
    }
  }, [isFullscreen])

  // Session division
  const sessionA_concepts = conceptExamples.filter(c => ["first-route", "path-params", "query-params", "request-body"].includes(c.id))
  const sessionA_stages = emsStages.slice(0, 4) // 0 to 3

  const sessionB_concepts = conceptExamples.filter(c => ["crud", "error-handling"].includes(c.id))
  const sessionB_stages = emsStages.slice(4, showOptional ? 7 : 6) // stage 6 is optional

  const currentConcepts = activeSession === 'a' ? sessionA_concepts : sessionB_concepts
  const currentStages = activeSession === 'a' ? sessionA_stages : sessionB_stages

  const optionalConcepts = conceptExamples.filter(c => !["first-route", "path-params", "query-params", "request-body", "crud", "error-handling"].includes(c.id))
  let activeConcept = [...currentConcepts, ...(showOptional ? optionalConcepts : [])].find(c => c.id === activeItemId)
  let activeStage = currentStages.find(s => s.id === activeItemId)

  if (!activeConcept && !activeStage) {
    if (currentConcepts.length > 0) activeConcept = currentConcepts[0]
    else activeStage = currentStages[0]
  }

  const isStage = !!activeStage
  const activeItem = activeStage || activeConcept

  // Follow the sidebar order, then continue directly into the next workshop part.
  const lessonsFor = (session) => [
    ...(session === 'a' ? sessionA_concepts : sessionB_concepts),
    ...(showOptional ? optionalConcepts : []),
    ...(session === 'a' ? sessionA_stages : sessionB_stages),
  ]
  const lessons = lessonsFor(activeSession)
  const lessonIndex = lessons.findIndex(item => item.id === activeItem.id)
  const nextItem = lessons[lessonIndex + 1] || (activeSession === 'a' ? lessonsFor('b')[0] : null)
  const previousItem = lessons[lessonIndex - 1] || (activeSession === 'b' ? lessonsFor('a').at(-1) : null)
  function moveLesson(direction) {
    const item = direction === 'next' ? nextItem : previousItem
    if (!item) return
    if (direction === 'next' && lessonIndex === lessons.length - 1) setActiveSession('b')
    if (direction === 'previous' && lessonIndex === 0) setActiveSession('a')
    chooseItem(item.id)
  }
  function showScreen(value) {
    setScreen(value)
    setPreviewRequest(v => v + 1)
  }

  return (
    <div>
      {/* Topbar */}
      <header className="topbar" inert={isFullscreen ? "" : undefined}>
        <div className="brand">
          <span className="brand-badge">API</span>
          <div>
            <span className="brand-title">FastAPI Workshop Companion</span>
            <span className="brand-tag" style={{ marginLeft: '8px' }}>Beginner · 2 hours</span>
          </div>
        </div>

        <div className="topbar-right">
          <div className="session-toggle">
            <button
              className={activeSession === 'a' ? 'active' : ''}
              onClick={() => {
                setActiveSession('a')
                chooseItem('first-route')
              }}
            >
              Part 1 · Basics (0–55 min)
            </button>
            <button
              className={activeSession === 'b' ? 'active' : ''}
              onClick={() => {
                setActiveSession('b')
                chooseItem('crud')
              }}
            >
              Part 2 · Build EMS (55–120 min)
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar" inert={isFullscreen ? "" : undefined}>
          <nav className="workshop-switcher" aria-label="Choose workshop">
            <div className="sidebar-group-title">Separate Workshops</div>
            <a href="http://localhost:5174/" >Angular Workshop</a>
            <a href="http://localhost:5175/" aria-current="page">FastAPI Workshop</a>
          </nav>
          <details className="sidebar-group session-plan">
            <summary>Two-hour teaching plan</summary>
            <p>One separate 120-minute workshop. Before starting: basic Python familiarity and the local API running. Open /docs for real requests.</p>
            <ol><li><b>0–10 min</b><br />Explain request → Python function → JSON. Show the finished API in /docs.</li><li><b>10–25 min</b><br />First GET route and Swagger Send/Try it out.</li><li><b>25–40 min</b><br />Find an event by ID; add category filtering.</li><li><b>40–55 min</b><br />Create an event with POST. Try invalid title and seats.</li><li><b>55–70 min</b><br />CRUD and useful error responses; predict the status codes.</li><li><b>70–105 min</b><br />Live build: project stages 0–5, event list, create, filter, RSVP and delete.</li><li><b>105–115 min</b><br />Audience challenge: create an event, update it, then delete it.</li><li><b>115–120 min</b><br />Recap and questions. Optional topics are take-home.</li></ol><p><a href="https://fastapi.tiangolo.com/tutorial/first-steps/" target="_blank" rel="noreferrer">Official beginner tutorial</a></p>
          </details>

          {/* Concept Examples */}
          <div className="sidebar-group">
            <div className="sidebar-group-title">Concept Examples</div>
            {currentConcepts.map(item => (
              <button
                key={item.id}
                className={`nav-item ${activeItem?.id === item.id ? 'active' : ''}`}
                onClick={() => chooseItem(item.id)}
              >
                <div className="nav-item-left">
                  <span className="nav-num">{item.num}</span>
                  <span>{item.title}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="sidebar-group">
            <button className="btn btn-auto btn-outline" aria-expanded={showOptional} onClick={() => { setShowOptional(v => !v); chooseItem(currentConcepts[0].id) }}>{showOptional ? 'Hide' : 'Show'} optional topics</button>
            {showOptional && <><p className="demo-note">After the session · not required for the two-hour plan</p>{optionalConcepts.map(item => <button key={item.id} className={`nav-item ${activeItem?.id === item.id ? 'active' : ''}`} onClick={() => chooseItem(item.id)}>{item.title}</button>)}</>}
          </div>
          {/* Live Project Stages */}
          <div className="sidebar-group">
            <div className="sidebar-group-title">Live Project — Event Management API</div>
            {currentStages.map(stage => (
              <button
                key={stage.id}
                className={`nav-item ${activeItem?.id === stage.id ? 'active' : ''}`}
                onClick={() => chooseItem(stage.id)}
              >
                <div className="nav-item-left">
                  <span className="nav-num">⚡</span>
                  <span>{stage.name}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Workspace */}
        <main className={`workspace learning-workspace ${isFullscreen ? 'expanded-workspace' : ''}`}
          ref={workspaceRef} tabIndex={-1} role={isFullscreen ? 'dialog' : undefined}
          aria-modal={isFullscreen ? true : undefined} aria-label="Lesson workspace">
          <nav className="lesson-toolbar" aria-label="Lesson navigation">
            <div className="lesson-screen-controls">
              <button className={`tab-btn ${screen === 'output' ? 'active' : ''}`} aria-pressed={screen === 'output'} onClick={() => showScreen('output')}>1. Output</button>
              <button className={`tab-btn ${screen === 'code' ? 'active' : ''}`} aria-pressed={screen === 'code'} onClick={() => showScreen('code')}>2. Code &amp; explanation</button>
            </div>
            <div className="lesson-actions">
              <button className="btn btn-auto btn-outline" disabled={!previousItem} onClick={() => moveLesson('previous')}>Previous</button>
              <button className="btn btn-auto" disabled={!nextItem} onClick={() => moveLesson('next')} title={nextItem ? `Next: ${nextItem.title || nextItem.name}` : 'Workshop complete'}>{nextItem ? 'Next →' : 'Workshop complete'}</button>
              <button ref={expandButtonRef} className="btn btn-auto btn-outline" onClick={() => setIsFullscreen(v => !v)}>{isFullscreen ? 'Exit expanded view (Esc)' : 'Expand view'}</button>
            </div>
          </nav>
          <p className="lesson-progress" role="status">Part {activeSession === 'a' ? '1' : '2'} · Lesson {lessonIndex + 1} of {lessons.length} · {activeItem.title || activeItem.name}</p>
          {/* Left Panel: Theory, Instructions & Code */}
          <div className="theory-and-code lesson-panel" hidden={screen !== 'code'}>
            {isStage ? (
              // Stage View
              <>
                <h1 className="view-title">
                  <span className="ex-num">{activeStage.name}</span>
                </h1>
                <p className="subhead">{activeStage.intro}</p>

                <div className="ex-panel">
                  <div className="ex-label">Step-by-Step Implementation</div>
                  <ol className="theory-ul" style={{ margin: 0, paddingLeft: '20px' }}>
                    {activeStage.steps.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ol>
                </div>

                <div className="tab-row">
                  <div className="tab-btn-group">
                    <button className="tab-btn active">Python Route Code</button>
                  </div>
                </div>

                <CodeBlock
                  code={activeStage.code}
                  title="routers/events.py"
                  language="python"
                />
              </>
            ) : (
              // Concept View
              <>
                <h1 className="view-title">
                  <span className="ex-num">{activeConcept.num}</span> · {activeConcept.title}
                </h1>
                <p className="subhead">{activeConcept.teach}</p><div className="ex-panel"><div className="ex-label">Live demo · try this</div><p>{activeConcept.demo}</p></div>

                <div className="ex-panel">
                  <div className="ex-label">What Happens Here</div>
                  <div className="blurb-row">
                    <div>
                      <b>Starter:</b> {activeConcept.blurb.starter}
                    </div>
                    <div>
                      <b>Solution:</b> {activeConcept.blurb.solution}
                    </div>
                  </div>
                </div>

                {/* Code Tabs */}<p className="demo-note">Code samples are read-only. Copy them into your editor for live coding; use the preview controls to demonstrate the result.</p>
                <div className="tab-row">
                  <div className="tab-btn-group">
                    <button
                      className={`tab-btn ${codeMode === 'starter' ? 'active' : ''}`}
                      onClick={() => chooseMode('starter')}
                    >
                      Starter Code
                    </button>
                    <button
                      className={`tab-btn ${codeMode === 'solution' ? 'active' : ''}`}
                      onClick={() => chooseMode('solution')}
                    >
                      Solution Code
                    </button>
                  </div>
                </div>

                <CodeBlock
                  code={codeMode === 'starter' ? activeConcept.starterCode : activeConcept.solutionCode}
                  title={`main.${codeMode === 'starter' ? 'starter' : 'solution'}.py`}
                  language="python"
                />

                {/* Theory Section */}
                <div className="theory-section">
                  <div className="ex-label">Quick recap</div>
                  {activeConcept.theory.map((t, idx) => {
                    if (t.h) return <h3 key={idx} className="theory-title">{t.h}</h3>
                    if (t.p) return <p key={idx} className="theory-p">{t.p}</p>
                    if (t.code) {
                      return (
                        <CodeBlock
                          key={idx}
                          code={t.code}
                          title="Reference Pattern"
                          language="python"
                        />
                      )
                    }
                    if (t.ul) {
                      return (
                        <ul key={idx} className="theory-ul">
                          {t.ul.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )
                    }
                    return null
                  })}
                </div>
              </>
            )}
          </div>

          {/* Right Panel: Interactive API response simulator */}
          <div className="interactive-preview lesson-panel" hidden={screen !== 'output'} aria-label="Interactive demo preview">
            <h1 className="view-title">{activeItem.title || activeItem.name} — Expected output</h1>
            <p className="subhead">Try the program first, then open Code &amp; explanation to see how it works.</p>
            <div className="preview-controls-row">
              <button className="btn btn-auto btn-outline" onClick={() => setPreviewVersion(v => v + 1)}>Reset demo</button>
            </div>

            {!isStage && previewMode === 'starter' && <p className="demo-note" role="status">Starter example: some controls are intentionally incomplete. Choose Solution to try the working behavior.</p>}
            <div className="tab-row" style={{ marginTop: 0 }}>
              <div className="ex-label">API Request Simulator</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {!isStage && (
                  <div className="tab-btn-group">
                    <button
                      aria-pressed={previewMode === 'starter'}
                      className={`tab-btn ${previewMode === 'starter' ? 'active' : ''}`}
                      onClick={() => chooseMode('starter')}
                    >
                      Starter API
                    </button>
                    <button
                      aria-pressed={previewMode === 'solution'}
                      className={`tab-btn ${previewMode === 'solution' ? 'active' : ''}`}
                      onClick={() => chooseMode('solution')}
                    >
                      Solution API
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="demo-note" style={{ marginTop: '8px' }}>
              Previews simulate API behavior. For live requests, start this API and use <a href="http://127.0.0.1:8000/docs" target="_blank" rel="noreferrer">/docs</a>.
            </p>

            {!isStage && previewMode === 'solution' && <p className="demo-note" role="status" style={{ marginTop: 12 }}>Showing the working solution below. {activeConcept.demo}</p>}
            <div style={{ marginTop: '12px' }}>
              {isStage ? (
                <activeStage.Component key={`${activeItem.id}-${previewVersion}`} />
              ) : previewMode === 'starter' ? (
                <activeConcept.Starter key={`${activeItem.id}-${previewVersion}`} />
              ) : (
                <activeConcept.Solution key={`${activeItem.id}-${previewVersion}`} />
              )}
            </div>
            <button className="btn btn-auto output-continue" onClick={() => showScreen('code')}>See code &amp; explanation →</button>
          </div>
        </main>
      </div>

    </div>
  )
}
