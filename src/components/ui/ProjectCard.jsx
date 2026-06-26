import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi'

/**
 * Expandable project card with tech stack, highlights, problem/solution, and links.
 */
export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group cursor-default"
      aria-label={`Project: ${project.title}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: project.color }}
              aria-hidden="true"
            />
            <span className="text-xs text-muted font-mono">{project.period}</span>
            {project.featured && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                Featured
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-text group-hover:text-accent transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm text-muted mt-0.5">{project.subtitle}</p>
        </div>

        {/* Action links */}
        <div className="flex items-center gap-2 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted hover:text-text hover:bg-surface transition-all duration-200"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <FiGithub size={18} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted hover:text-accent hover:bg-surface transition-all duration-200"
              aria-label={`Live demo for ${project.title}`}
            >
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map((tech) => (
          <span key={tech} className="tech-badge">{tech}</span>
        ))}
      </div>

      {/* Problem statement */}
      <p className="text-sm text-muted leading-relaxed mb-4">{project.problem}</p>

      {/* Expand / collapse */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="flex items-center gap-1.5 text-xs text-primary hover:text-accent transition-colors duration-200 font-medium focus-visible:ring-1 focus-visible:ring-primary rounded"
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
            <div className="pt-5 border-t border-border mt-4 space-y-4">
              {/* Solution */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">Solution</h4>
                <p className="text-sm text-text/80 leading-relaxed">{project.solution}</p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">Key Highlights</h4>
                <ul className="space-y-1.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 text-sm text-text/80">
                      <span className="text-primary mt-0.5 shrink-0" aria-hidden="true">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">Challenges</h4>
                <p className="text-sm text-muted leading-relaxed">{project.challenges}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
