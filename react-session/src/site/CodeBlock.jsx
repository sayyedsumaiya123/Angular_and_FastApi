import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

export default function CodeBlock({ code, title, language = 'jsx' }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="code-block">
      <div className="code-head">
        <span className="code-filename">{title}</span>
        <button className="btn btn-auto" onClick={copy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <Highlight theme={themes.github} code={code.trim()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="code-pre" style={{ ...style }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="code-line-no">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}