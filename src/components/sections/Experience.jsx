import AnimatedSection from '../ui/AnimatedSection'
import { EXPERIENCE } from '../../data/experience'

/**
 * Experience Timeline Section detailing professional internship milestones.
 */
export default function Experience({ experience }) {
  const activeExp = experience || EXPERIENCE

  return (
    <section id="experience" className="bg-background border-b border-border/40">
      <div className="section-container">
        <AnimatedSection>
          <span className="text-primary font-mono text-sm font-semibold tracking-wider uppercase">
            Work History
          </span>
          <h2 className="section-title">Internship Experience</h2>
          <p className="section-subtitle">Practical industry experience built during SDE and Full Stack developer stints.</p>
        </AnimatedSection>

        <div className="relative pl-6 lg:pl-10 space-y-12">
          {/* Main timeline line */}
          <div className="absolute left-6 lg:left-10 top-2 bottom-2 w-px bg-border/80" />

          {activeExp.map((job, idx) => (
            <AnimatedSection
              key={job.id}
              delay={idx * 0.1}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Timeline indicator node */}
              <span
                className="absolute -left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-background z-10 transition-transform duration-300 group-hover:scale-125"
                style={{ borderColor: job.color }}
              />

              <div className="card p-6 md:p-8 bg-card border border-border rounded-2xl hover:border-primary/20 transition-all duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 border-b border-border/60 pb-4">
                  <div>
                    <span className="text-xs font-mono font-medium text-muted uppercase tracking-wider">
                      {job.type}
                    </span>
                    <h3 className="text-xl font-bold text-text mt-1">{job.role}</h3>
                    <p className="text-sm font-semibold text-primary/90 mt-0.5">
                      {job.company} — <span className="text-text/75">{job.project}</span>
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="inline-block text-xs font-mono font-medium text-primary bg-primary/5 border border-primary/10 px-3 py-1 rounded-full">
                      {job.period}
                    </span>
                    <p className="text-xs text-muted mt-1.5">{job.location}</p>
                  </div>
                </div>

                {/* Job highlights */}
                <ul className="space-y-2 mb-6" aria-label={`Highlights for ${job.role}`}>
                  {job.highlights.map((bullet, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-muted leading-relaxed">
                      <span className="text-primary mt-0.5 shrink-0" aria-hidden="true">
                        ▸
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies used */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="tech-badge"
                      style={{ borderColor: `${job.color}18` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
