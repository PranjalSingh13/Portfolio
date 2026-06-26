import { AnimatePresence, motion } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi'

const icons = {
  success: <FiCheckCircle className="text-success shrink-0" size={18} />,
  error:   <FiAlertCircle className="text-red-400 shrink-0" size={18} />,
  info:    <FiInfo        className="text-accent shrink-0"  size={18} />,
}

const colours = {
  success: 'border-success/30 bg-success/10',
  error:   'border-red-400/30 bg-red-400/10',
  info:    'border-accent/30 bg-accent/10',
}

/**
 * Accessible toast notification container.
 */
export function ToastContainer({ toasts, onRemove }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border
                        backdrop-blur-sm text-sm text-text max-w-sm shadow-xl ${colours[t.type] ?? colours.info}`}
            role="alert"
          >
            {icons[t.type] ?? icons.info}
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => onRemove(t.id)}
              className="text-muted hover:text-text transition-colors focus-visible:ring-1 focus-visible:ring-primary rounded"
              aria-label="Dismiss notification"
            >
              <FiX size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
