import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi'

/**
 * Expandable dark glassmorphism project card with neon glow accents.
 */
export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl transition-all duration-300 group"
      style={{
        background: 'rgba(8, 20, 41, 0.9)',
        border: '1px solid rgba(0, 180, 255, 0.1)',
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${project.color}40`
        e.currentTarget.style.boxShadow = `0 0 35px ${project.color}12`
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(0, 180, 255, 0.1)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'none'
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Top colored accent */}
      <div style={{
        height: '2px',
        background: `linear-gradient(90deg, ${project.color}, transparent)`,
        opacity: 0.8,
      }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  backgroundColor: project.color,
                  boxShadow: `0 0 6px ${project.color}80`,
                }}
                aria-hidden="true"
              />
              <span className="text-xs font-mono" style={{ color: '#6b9acf' }}>{project.period}</span>
              {project.featured && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: 'rgba(0, 180, 255, 0.12)',
                    color: '#00b4ff',
                    border: '1px solid rgba(0, 180, 255, 0.25)',
                  }}
                >
                  Featured
                </span>
              )}
            </div>
            <h3
              className="text-xl font-bold transition-colors duration-200"
              style={{ color: '#d6e8ff', fontFamily: 'Outfit, Inter, sans-serif' }}
            >
              {project.title}
            </h3>
            <p className="text-sm mt-0.5" style={{ color: '#6b9acf' }}>{project.subtitle}</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-1 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200"
                style={{ color: '#6b9acf' }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#00d4ff'
                  e.currentTarget.style.background = 'rgba(0, 180, 255, 0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#6b9acf'
                  e.currentTarget.style.background = 'transparent'
                }}
                aria-label={`GitHub for ${project.title}`}
              >
                <FiGithub size={17} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200"
                style={{ color: '#6b9acf' }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = project.color
                  e.currentTarget.style.background = `${project.color}15`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#6b9acf'
                  e.currentTarget.style.background = 'transparent'
                }}
                aria-label={`Live demo for ${project.title}`}
              >
                <FiExternalLink size={17} />
              </a>
            )}
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span key={tech} className="tech-badge" style={{ borderColor: `${project.color}25` }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Problem */}
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b9acf' }}>{project.problem}</p>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
          style={{ color: '#00b4ff' }}
          onMouseEnter={e => e.currentTarget.style.color = '#7ecfff'}
          onMouseLeave={e => e.currentTarget.style.color = '#00b4ff'}
          aria-expanded={expanded}
          aria-controls={`project-details-${project.id}`}
        >
          {expanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          {expanded ? 'Show less' : 'View details'}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              id={`project-details-${project.id}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-4 space-y-4" style={{ borderTop: '1px solid rgba(0, 180, 255, 0.08)' }}>
                <div>
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-widest mb-2" style={{ color: '#6b9acf' }}>Solution</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#a0c4ff' }}>{project.solution}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-widest mb-2" style={{ color: '#6b9acf' }}>Key Highlights</h4>
                  <ul className="space-y-1.5">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-sm" style={{ color: '#a0c4ff' }}>
                        <span className="mt-0.5 shrink-0" style={{ color: project.color }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-widest mb-2" style={{ color: '#6b9acf' }}>Challenges</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b9acf' }}>{project.challenges}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}
