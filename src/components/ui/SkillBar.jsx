import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useIntersection } from '../../hooks/useIntersection'

/**
 * Animated skill proficiency bar.
 * Bar fills in when it enters the viewport.
 */
export default function SkillBar({ name, level, color = '#2563EB' }) {
  const [ref, isVisible] = useIntersection({ threshold: 0.2 })

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-text">{name}</span>
        <span className="text-xs text-muted tabular-nums">{level}%</span>
      </div>
      <div className="skill-track" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100} aria-label={`${name} proficiency`}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${level}%` : 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}
