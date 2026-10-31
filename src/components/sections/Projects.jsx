import { useState } from 'react'
import AnimatedSection from '../ui/AnimatedSection'
import ProjectCard from '../ui/ProjectCard'
import { PROJECTS } from '../../data/projects'

const LABEL = { color: '#00b4ff', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }

/**
 * Projects Section — dark navy dashboard with filter tabs.
 */
export default function Projects({ projects }) {
  const [filter, setFilter] = useState('all')
  const activeProjs = projects || PROJECTS

  const filteredProjects = activeProjs.filter((p) => {
    if (filter === 'all') return true
    if (filter === 'featured') return p.featured
    if (filter === 'backend') {
      return p.stack.some((s) => ['Node.js', 'Express.js', 'Python', 'Flask', 'SQLite', 'PostgreSQL', 'Custom SQL Parser'].includes(s))
    }
    return true
  })

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'featured', label: 'Featured' },
    { key: 'backend', label: 'Systems & Backend' },
  ]

  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      style={{ background: '#060d1f', borderBottom: '1px solid rgba(0, 180, 255, 0.08)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', left: '5%', top: '20%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(0, 85, 204, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      <div className="section-container relative z-10">
        <AnimatedSection>
          <span style={LABEL}>Portfolio</span>
          <h2 className="section-title mt-2">Projects</h2>
          <p className="section-subtitle">A collection of custom systems, pricing scrapers, and full stack applications.</p>
        </AnimatedSection>

        {/* Filter buttons */}
        <AnimatedSection delay={0.1} className="flex flex-wrap gap-2 mb-10">
          {filters.map(({ key, label }) => {
            const isActive = filter === key
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: isActive ? 'linear-gradient(135deg, #0055cc, #00b4ff)' : 'rgba(0, 180, 255, 0.05)',
                  color: isActive ? '#fff' : '#7ecfff',
                  border: isActive ? '1px solid rgba(0, 180, 255, 0.3)' : '1px solid rgba(0, 180, 255, 0.15)',
                  boxShadow: isActive ? '0 0 16px rgba(0, 180, 255, 0.25)' : 'none',
                }}
              >
                {label}
              </button>
            )
          })}
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
