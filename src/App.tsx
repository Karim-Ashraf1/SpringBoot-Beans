import { useState } from 'react'
import { IocDiagram } from './components/IocDiagram'
import { ScopeContent } from './components/ScopeContent'
import { scopeData, scopeIds, scopeTabLabels } from './data/scopeData'
import type { ScopeId } from './data/scopeData'
import './App.css'

export type DiagramMode = 'broken' | 'fixed'

function App() {
  const [activeScope, setActiveScope] = useState<ScopeId>('request')
  const [mode, setMode] = useState<DiagramMode>('broken')
  const content = scopeData[activeScope]
  const title = `${content.scopeLabel} injected into Singleton`

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Spring Boot Beans</h1>
        <p className="app-subtitle">Scope injection into Singleton</p>
        <nav className="app-scope-tabs" role="tablist">
          {scopeIds.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeScope === id}
              className={`scope-tab ${activeScope === id ? 'active' : ''}`}
              onClick={() => {
                setActiveScope(id)
                setMode('broken')
              }}
            >
              {scopeTabLabels[id]}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <div className="app-grid">
          <div className="app-grid-left">
            <div className="app-mode-toggle">
              <button
                type="button"
                className={mode === 'broken' ? 'active' : ''}
                onClick={() => setMode('broken')}
              >
                Broken
              </button>
              <button
                type="button"
                className={mode === 'fixed' ? 'active' : ''}
                onClick={() => setMode('fixed')}
              >
                Fixed
              </button>
            </div>
            <IocDiagram scope={activeScope} mode={mode} />
          </div>
          <div className="app-grid-right">
            <ScopeContent key={activeScope} title={title} content={content} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
