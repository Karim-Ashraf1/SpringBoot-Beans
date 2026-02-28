import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CodeBlock } from './CodeBlock'
import { ErrorPanel } from './ErrorPanel'
import type { ScopeContent as ScopeContentType } from '../data/scopeData'
import './ScopeContent.css'

export type ContentTabId = 'broken' | 'error' | 'fixed' | 'impact'

const contentTabs: { id: ContentTabId; label: string }[] = [
  { id: 'broken', label: 'Broken Code' },
  { id: 'error', label: 'Error Output' },
  { id: 'fixed', label: 'Fixed Code' },
  { id: 'impact', label: 'Enterprise Impact' },
]

export interface ScopeContentProps {
  title: string
  content: ScopeContentType
}

export function ScopeContent({ title, content }: ScopeContentProps) {
  const [activeTab, setActiveTab] = useState<ContentTabId>('broken')

  return (
    <div className="scope-content">
      <h2 className="scope-content-title">{title}</h2>
      <div className="scope-content-tabs-row">
        {contentTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="scope-content-body">
        <AnimatePresence mode="wait">
          {activeTab === 'broken' && (
            <motion.div
              key="broken"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
              className="scope-content-pane"
            >
              <div className="scope-content-scroll scrollbar-hide">
                <CodeBlock
                  code={content.brokenCode}
                  filename={content.brokenFilename}
                  highlightLines={content.brokenHighlightLines}
                  highlightKind="problem"
                />
              </div>
            </motion.div>
          )}
          {activeTab === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
              className="scope-content-pane"
            >
              <div className="scope-content-scroll scrollbar-hide">
                <ErrorPanel message={content.errorMessage} />
              </div>
            </motion.div>
          )}
          {activeTab === 'fixed' && (
            <motion.div
              key="fixed"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
              className="scope-content-pane"
            >
              <div className="scope-content-scroll scrollbar-hide">
                <CodeBlock
                  code={content.fixedCode}
                  filename={content.fixedFilename}
                  highlightLines={content.fixedHighlightLines}
                  highlightKind="solution"
                />
              </div>
            </motion.div>
          )}
          {activeTab === 'impact' && (
            <motion.div
              key="impact"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
              className="scope-content-pane scope-content-impact"
            >
              <div className="scope-content-scroll scrollbar-hide">
                <p>{content.enterpriseImpact}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
