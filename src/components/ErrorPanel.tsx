import { motion } from 'framer-motion'

export interface ErrorPanelProps {
  message: string
}

export function ErrorPanel({ message }: ErrorPanelProps) {
  return (
    <motion.div
      className="error-panel"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {message}
    </motion.div>
  )
}
