import AnimatedSection from '../ui/AnimatedSection'
import { EXPERIENCE } from '../../data/experience'

const LABEL = { color: '#00b4ff', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }

/**
 * Experience Timeline — dark navy dashboard style.
 */
export default function Experience({ experience }) {
  const activeExp = experience || EXPERIENCE

  return (
    <section
      id="experience"
      className="relative overflow-hidden"
      style={{ background: '#060d1f', borderBottom: '1px solid rgba(0, 180, 255, 0.08)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', right: '5%', top: '30%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="section-container relative z-10">
        <AnimatedSection>
          <span style={LABEL}>Work History</span>
          <h2 className="section-title mt-2">Internship Experience</h2>
          <p className="section-subtitle">Practical industry experience built during SDE and Full Stack developer stints.</p>
        </AnimatedSection>

        <div className="relative pl-8 space-y-10">
          {/* Main timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px" style={{
            background: 'linear-gradient(180deg, rgba(0, 180, 255, 0.5), rgba(0, 85, 204, 0.05))',
          }} />

          {activeExp.map((job, idx) => (
            <AnimatedSection
              key={job.id}
              delay={idx * 0.1}
              className="relative pl-6 group"
            >
              {/* Timeline node */}
              <span
                className="absolute -left-2 top-5 w-4 h-4 rounded-full border-2 z-10 transition-all duration-300 group-hover:scale-125"
                style={{
                  borderColor: job.color,
                  background: '#060d1f',
                  boxShadow: `0 0 10px ${job.color}55`,
                }}
              />

              <div
                className="rounded-2xl p-6 md:p-8 transition-all duration-300"
                style={{
                  background: 'rgba(8, 20, 41, 0.9)',
                  border: '1px solid rgba(0, 180, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${job.color}40`
                  e.currentTarget.style.boxShadow = `0 0 30px ${job.color}10`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 180, 255, 0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, ${job.color}, transparent)`,
                  opacity: 0.7,
                }} />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 pb-4"
                  style={{ borderBottom: '1px solid rgba(0, 180, 255, 0.08)' }}
                >
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: '#6b9acf' }}>
                      {job.type}
                    </span>
                    <h3 className="text-xl font-bold mt-1" style={{ color: '#d6e8ff' }}>{job.role}</h3>
                    <p className="text-sm font-semibold mt-0.5">
                      <span style={{ color: job.color }}>{job.company}</span>
                      <span style={{ color: '#6b9acf' }}> — {job.project}</span>
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span
                      className="inline-block text-xs font-mono font-medium px-3 py-1.5 rounded-full"
                      style={{
                        background: `${job.color}15`,
                        color: job.color,
                        border: `1px solid ${job.color}30`,
                      }}
                    >
                      {job.period}
                    </span>
                    <p className="text-xs mt-1.5" style={{ color: '#6b9acf' }}>{job.location}</p>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {job.highlights.map((bullet, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: '#6b9acf' }}>
                      <span className="mt-0.5 shrink-0" style={{ color: job.color }}>▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2" style={{ borderTop: '1px solid rgba(0, 180, 255, 0.06)' }}>
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="tech-badge"
                      style={{ borderColor: `${job.color}25` }}
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
