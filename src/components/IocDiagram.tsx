import { motion, AnimatePresence } from 'framer-motion'
import type { ScopeId } from '../data/scopeData'
import type { DiagramMode } from '../App'

export interface IocDiagramProps {
  scope: ScopeId
  mode: DiagramMode
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.2 },
  }),
}

const arrowVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.08, duration: 0.25 },
  }),
}

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

function DiagramBroken({ scope }: { scope: ScopeId }) {
  const isRequest = scope === 'request'
  const isPrototype = scope === 'prototype'

  const depLabel =
    scope === 'request'
      ? 'Request bean'
      : scope === 'session'
        ? 'Session bean'
        : 'Prototype'
  const subLabel =
    isPrototype ? 'injected once' : '✗ not available'
  const message = isPrototype
    ? 'Same instance reused'
    : isRequest
      ? "Scope 'request' is not active"
      : "Scope 'session' is not active"
  const showFailure = !isPrototype

  return (
    <motion.div
      className="ioc-diagram-container"
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="ioc-diagram-title">Spring IoC Container</div>
      <svg
        viewBox="0 0 320 260"
        className="ioc-diagram"
        style={{ width: '100%', maxWidth: '320px', height: 'auto' }}
      >
        <motion.rect
          x="20"
          y="16"
          width="280"
          height="228"
          rx="8"
          className="ioc-box"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        />
        <motion.text
          x="160"
          y="42"
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="11"
          fontFamily="var(--font-mono)"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Spring IoC Container
        </motion.text>

        <motion.rect
          x="44"
          y="62"
          width="100"
          height="48"
          rx="4"
          className="ioc-box"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        />
        <motion.text
          x="94"
          y="88"
          textAnchor="middle"
          fill="var(--text)"
          fontSize="10"
          fontFamily="var(--font-mono)"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Singleton
        </motion.text>
        <motion.text
          x="94"
          y="100"
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="8"
          fontFamily="var(--font-mono)"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          created at startup
        </motion.text>

        <motion.rect
          x="168"
          y="62"
          width="112"
          height="48"
          rx="4"
          className={`ioc-box ${showFailure ? 'failure' : 'reused'}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        />
        <motion.text
          x="224"
          y="84"
          textAnchor="middle"
          fill="var(--text)"
          fontSize="9"
          fontFamily="var(--font-mono)"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {depLabel}
        </motion.text>
        <motion.text
          x="224"
          y="97"
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="8"
          fontFamily="var(--font-mono)"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {subLabel}
        </motion.text>

        <motion.path
          d="M 144 86 L 166 86"
          className={showFailure ? 'arrow-failure' : 'arrow-reused'}
          variants={arrowVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        />
        <motion.polygon
          points="166,83 174,86 166,89"
          fill={showFailure ? 'var(--red)' : 'var(--yellow)'}
          variants={arrowVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        />

        <motion.text
          x="160"
          y={isPrototype ? 195 : 210}
          textAnchor="middle"
          fill={showFailure ? 'var(--red)' : 'var(--yellow)'}
          fontSize="9"
          fontFamily="var(--font-mono)"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {message}
        </motion.text>
      </svg>
    </motion.div>
  )
}

function DiagramFixed({ scope }: { scope: ScopeId }) {
  const isPrototype = scope === 'prototype'
  const depLabel =
    scope === 'request'
      ? 'Request bean'
      : scope === 'session'
        ? 'Session bean'
        : 'Prototype'
  const subLabel =
    scope === 'request'
      ? 'proxy → resolved'
      : scope === 'session'
        ? 'proxy → resolved'
        : 'new per getObject()'
  const message = isPrototype
    ? 'New instance per call'
    : 'Proxy resolves at runtime'

  return (
    <motion.div
      className="ioc-diagram-container"
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="ioc-diagram-title">Spring IoC Container</div>
      <svg
        viewBox="0 0 320 260"
        className="ioc-diagram"
        style={{ width: '100%', maxWidth: '320px', height: 'auto' }}
      >
        <motion.rect
          x="20"
          y="16"
          width="280"
          height="228"
          rx="8"
          className="ioc-box"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        />
        <motion.text
          x="160"
          y="42"
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="11"
          fontFamily="var(--font-mono)"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Spring IoC Container
        </motion.text>

        <motion.rect
          x="44"
          y="62"
          width="100"
          height="48"
          rx="4"
          className="ioc-box"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        />
        <motion.text
          x="94"
          y="88"
          textAnchor="middle"
          fill="var(--text)"
          fontSize="10"
          fontFamily="var(--font-mono)"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Singleton
        </motion.text>
        <motion.text
          x="94"
          y="100"
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="8"
          fontFamily="var(--font-mono)"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          created at startup
        </motion.text>

        <motion.rect
          x="168"
          y="62"
          width="112"
          height="48"
          rx="4"
          className="ioc-box proxy"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        />
        <motion.text
          x="224"
          y="84"
          textAnchor="middle"
          fill="var(--text)"
          fontSize="9"
          fontFamily="var(--font-mono)"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {depLabel}
        </motion.text>
        <motion.text
          x="224"
          y="97"
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="7"
          fontFamily="var(--font-mono)"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {subLabel}
        </motion.text>

        <motion.path
          d="M 144 86 L 166 86"
          className="arrow-resolved"
          variants={arrowVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        />
        <motion.polygon
          points="166,83 174,86 166,89"
          fill="var(--green)"
          variants={arrowVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        />

        <motion.text
          x="160"
          y={isPrototype ? 195 : 210}
          textAnchor="middle"
          fill="var(--green)"
          fontSize="9"
          fontFamily="var(--font-mono)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {message}
        </motion.text>
      </svg>
    </motion.div>
  )
}

export function IocDiagram({ scope, mode }: IocDiagramProps) {
  return (
    <AnimatePresence mode="wait">
      {mode === 'broken' ? (
        <DiagramBroken key={`${scope}-broken`} scope={scope} />
      ) : (
        <DiagramFixed key={`${scope}-fixed`} scope={scope} />
      )}
    </AnimatePresence>
  )
}
