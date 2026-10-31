import AnimatedSection from '../ui/AnimatedSection'
import { ACHIEVEMENTS } from '../../data/achievements'
import { FiExternalLink } from 'react-icons/fi'

const LABEL = { color: '#00b4ff', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }

/**
 * Achievements — dark navy glassmorphism stat grid.
 */
export default function Achievements({ achievements }) {
  const activeAchievements = achievements || ACHIEVEMENTS

  return (
    <section
      id="achievements"
      className="relative overflow-hidden"
      style={{ background: '#060d1f', borderBottom: '1px solid rgba(0, 180, 255, 0.08)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', right: '0', bottom: '0',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      <div className="section-container relative z-10">
        <AnimatedSection>
          <span style={LABEL}>Milestones</span>
          <h2 className="section-title mt-2">Achievements &amp; Certifications</h2>
          <p className="section-subtitle">A collection of industry certificates, academic honors, and badges.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeAchievements.map((item, idx) => (
            <AnimatedSection
              key={item.id}
              delay={idx * 0.05}
            >
              <div
                className="rounded-2xl p-6 flex flex-col justify-between h-full transition-all duration-300"
                style={{
                  background: 'rgba(8, 20, 41, 0.9)',
                  border: '1px solid rgba(0, 180, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${item.color}45`
                  e.currentTarget.style.boxShadow = `0 0 28px ${item.color}12`
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 180, 255, 0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                {/* Top accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                  opacity: 0.6,
                }} />

                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div
                      className="p-3 rounded-xl text-xl flex items-center justify-center"
                      style={{
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}25`,
                        color: item.color,
                      }}
                    >
                      <span role="img" aria-hidden={true}>{item.icon}</span>
                    </div>
                    <span className="text-xs font-mono font-medium" style={{ color: '#6b9acf' }}>{item.year}</span>
                  </div>

                  <span
                    className="text-[10px] font-mono font-semibold uppercase tracking-wider"
                    style={{ color: item.color }}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold mt-1.5 leading-snug" style={{ color: '#d6e8ff' }}>{item.title}</h3>
                  <p className="text-xs mt-1" style={{ color: '#6b9acf' }}>{item.issuer}</p>

                  {item.description && (
                    <p className="text-xs leading-relaxed mt-3 pt-3" style={{
                      color: '#6b9acf',
                      borderTop: '1px solid rgba(0, 180, 255, 0.08)',
                    }}>
                      {item.description}
                    </p>
                  )}
                </div>

                {item.link && item.link !== '#' && (
                  <div className="mt-5 pt-4 flex items-center justify-end" style={{ borderTop: '1px solid rgba(0, 180, 255, 0.08)' }}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
                      style={{ color: '#00b4ff' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#7ecfff'}
                      onMouseLeave={e => e.currentTarget.style.color = '#00b4ff'}
                    >
                      Verify Credential <FiExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
