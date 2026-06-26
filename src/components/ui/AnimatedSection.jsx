import { motion } from 'framer-motion'

/**
 * Reusable animated section wrapper.
 * Simplified for an Editorial/Minimalist design with subtle, short fade-ins.
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
