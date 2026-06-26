import AnimatedSection from '../ui/AnimatedSection'
import { ACHIEVEMENTS } from '../../data/achievements'
import { FiAward, FiExternalLink } from 'react-icons/fi'

/**
 * Achievements section presenting certifications, badges, and internships.
 */
export default function Achievements({ achievements }) {
  const activeAchievements = achievements || ACHIEVEMENTS

  return (
    <section id="achievements" className="bg-background border-b border-border/40">
      <div className="section-container">
        <AnimatedSection>
          <span className="text-primary font-mono text-sm font-semibold tracking-wider uppercase">
            Milestones
          </span>
          <h2 className="section-title">Achievements & Certifications</h2>
          <p className="section-subtitle">A collection of industry certificates, academic honors, and badges.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAchievements.map((item, idx) => (
            <AnimatedSection
              key={item.id}
              delay={idx * 0.05}
              className="card bg-card border border-border p-6 rounded-2xl flex flex-col justify-between hover:border-primary/30 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div
                    className="p-3 rounded-xl text-lg flex items-center justify-center bg-surface border border-border"
                    style={{ color: item.color }}
                  >
                    <span role="img" aria-hidden={true}>
                      {item.icon}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-medium text-muted">{item.year}</span>
                </div>

                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-primary">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-text mt-1.5 leading-snug">{item.title}</h3>
                <p className="text-xs text-muted mt-1">{item.issuer}</p>

                {item.description && (
                  <p className="text-xs text-muted leading-relaxed mt-3 pt-3 border-t border-border/60">
                    {item.description}
                  </p>
                )}
              </div>

              {item.link && item.link !== '#' && (
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-end">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-accent"
                  >
                    Verify Credential <FiExternalLink size={12} />
                  </a>
                </div>
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
