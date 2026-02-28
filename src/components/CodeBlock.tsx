import { useState, useCallback } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { motion } from 'framer-motion'
import './CodeBlock.css'

export type HighlightKind = 'problem' | 'solution' | 'none'

export interface CodeBlockProps {
  code: string
  filename: string
  language?: string
  highlightLines?: number[]
  highlightKind?: HighlightKind
}

export function CodeBlock({
  code,
  filename,
  language = 'java',
  highlightLines = [],
  highlightKind = 'none',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  const lineCount = code.split('\n').length

  return (
    <motion.div
      className="code-block-wrapper"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="code-block-header">
        <span className="code-block-filename">{filename}</span>
        <button
          type="button"
          className="code-block-copy"
          onClick={copyToClipboard}
          aria-label="Copy to clipboard"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="code-block-body">
        <div className="code-block-line-numbers">
          {Array.from({ length: lineCount }, (_, i) => {
            const lineNum = i + 1
            const isHighlight =
              highlightLines.includes(lineNum) && highlightKind !== 'none'
            const isProblem = isHighlight && highlightKind === 'problem'
            const isSolution = isHighlight && highlightKind === 'solution'
            return (
              <div
                key={lineNum}
                className={`line-num ${isProblem ? 'line-num-problem' : ''} ${isSolution ? 'line-num-solution' : ''}`}
              >
                {lineNum}
              </div>
            )
          })}
        </div>
        <div className="code-block-content">
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              padding: '1rem 1rem 1rem 0.5rem',
              background: 'var(--bg-code)',
              fontSize: '0.8125rem',
              lineHeight: 1.6,
              fontFamily: 'var(--font-mono)',
              borderRadius: '0 0 8px 8px',
              overflow: 'hidden',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
            codeTagProps={{
              style: {
                fontFamily: 'inherit',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              },
            }}
            lineNumberStyle={{ minWidth: '2em' }}
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
          {highlightLines.length > 0 && highlightKind !== 'none' && (
            <div className="line-highlights" aria-hidden>
              {code.split('\n').map((_, i) => {
                const lineNum = i + 1
                const isProblem =
                  highlightLines.includes(lineNum) && highlightKind === 'problem'
                const isSolution =
                  highlightLines.includes(lineNum) &&
                  highlightKind === 'solution'
                if (!isProblem && !isSolution) return null
                return (
                  <div
                    key={lineNum}
                    className={`line-highlight ${isProblem ? 'line-highlight-problem' : ''} ${isSolution ? 'line-highlight-solution' : ''}`}
                    style={{ top: `${(i + 1) * 1.6 - 0.2}rem` }}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
