import { useState } from 'react'
import AnimatedSection from '../ui/AnimatedSection'
import ProjectCard from '../ui/ProjectCard'
import { PROJECTS } from '../../data/projects'

/**
 * Projects Section rendering expandable cards for portfolio highlights.
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

  return (
    <section id="projects" className="bg-background border-b border-border/40">
      <div className="section-container">
        <AnimatedSection>
          <span className="text-primary font-mono text-sm font-semibold tracking-wider uppercase">
            Portfolio
          </span>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">A collection of custom systems, pricing scrapers, and full stack applications.</p>
        </AnimatedSection>

        {/* Filter buttons */}
        <AnimatedSection delay={0.1} className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              filter === 'all'
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'border-border text-muted hover:border-primary/50'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              filter === 'featured'
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'border-border text-muted hover:border-primary/50'
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => setFilter('backend')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              filter === 'backend'
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'border-border text-muted hover:border-primary/50'
            }`}
          >
            Systems & Backend
          </button>
        </AnimatedSection>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
