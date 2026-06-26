import AnimatedSection from '../ui/AnimatedSection'
import { SKILLS } from '../../data/skills'

/**
 * Skills Section categorized by domains.
 * Editorial, grid-tag-based layout with zero progress bars for a professional developer look.
 */
export default function Skills({ skills }) {
  const activeSkills = skills || SKILLS

  return (
    <section id="skills" className="bg-background border-b border-border/40">
      <div className="section-container">
        <AnimatedSection>
          <span className="text-primary font-mono text-xs font-semibold tracking-widest uppercase">
            Capabilities
          </span>
          <h2 className="section-title mt-2">Technical Skills</h2>
          <p className="section-subtitle">Categorized competencies and tools based on academic and practical experience.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeSkills.map((categoryGroup, catIndex) => (
            <AnimatedSection
              key={categoryGroup.category}
              delay={catIndex * 0.04}
              className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between hover:border-primary/20 transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-3 mb-5 border-b border-border pb-3">
                  <span className="text-xl" role="img" aria-hidden="true">
                    {categoryGroup.icon}
                  </span>
                  <h3 className="text-sm font-mono font-bold text-text uppercase tracking-wider">
                    {categoryGroup.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {categoryGroup.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-surface/50 border border-border/80 text-text/90 hover:border-primary/30 transition-all duration-200"
                    >
                      {skill.name}
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
