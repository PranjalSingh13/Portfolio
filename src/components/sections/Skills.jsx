import AnimatedSection from '../ui/AnimatedSection'
import { SKILLS } from '../../data/skills'

const LABEL = { color: '#00b4ff', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }

/**
 * Skills Section — dark navy glassmorphism dashboard grid.
 */
export default function Skills({ skills }) {
  const activeSkills = skills || SKILLS

  const catColors = ['#00b4ff', '#34d399', '#a78bfa', '#fbbf24', '#f472b6', '#fb923c']

  return (
    <section
      id="skills"
      className="relative overflow-hidden"
      style={{ background: '#060d1f', borderBottom: '1px solid rgba(0, 180, 255, 0.08)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', left: '-10%', bottom: '10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(0, 180, 255, 0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="section-container relative z-10">
        <AnimatedSection>
          <span style={LABEL}>Capabilities</span>
          <h2 className="section-title mt-2">Technical Skills</h2>
          <p className="section-subtitle">Categorized competencies and tools based on academic and practical experience.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSkills.map((categoryGroup, catIndex) => {
            const color = catColors[catIndex % catColors.length]
            return (
              <AnimatedSection
                key={categoryGroup.category}
                delay={catIndex * 0.05}
              >
                <div
                  className="rounded-2xl p-6 flex flex-col h-full transition-all duration-300 group"
                  style={{
                    background: 'rgba(8, 20, 41, 0.9)',
                    border: '1px solid rgba(0, 180, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${color}40`
                    e.currentTarget.style.boxShadow = `0 0 30px ${color}12`
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(0, 180, 255, 0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'none'
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    opacity: 0.6,
                  }} />

                  <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: `1px solid rgba(0, 180, 255, 0.08)` }}>
                    <span className="text-2xl" role="img" aria-hidden="true">{categoryGroup.icon}</span>
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider" style={{ color }}>
                      {categoryGroup.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {categoryGroup.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
                        style={{
                          background: `${color}10`,
                          border: `1px solid ${color}20`,
                          color: '#a0c4ff',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = `${color}20`
                          e.currentTarget.style.borderColor = `${color}50`
                          e.currentTarget.style.color = color
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = `${color}10`
                          e.currentTarget.style.borderColor = `${color}20`
                          e.currentTarget.style.color = '#a0c4ff'
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
