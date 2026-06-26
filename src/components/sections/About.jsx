import AnimatedSection from '../ui/AnimatedSection'
import { SITE } from '../../utils/constants'

/**
 * About Section containing the professional story, education timeline, goals, and values.
 */
export default function About() {
  const milestones = [
    {
      year: '2024 — 2027',
      title: 'BCA — AI & Data Science',
      institution: 'Graphic Era Hill University, Bhimtal',
      description: 'CGPA: 7.82 / 10.0',
    },
    {
      year: '2024',
      title: 'Intermediate (12th CBSE)',
      institution: 'Inspiration Public School, Kathgodam, Uttarakhand',
    },
    {
      year: '2022',
      title: 'High School (10th CBSE)',
      institution: 'K.L. Mehta Dayanand Public School, Faridabad, Haryana',
    },
  ]

  const pillars = [
    {
      title: 'Reliable Systems',
      description: 'Committed to writing secure, validated, and optimized code that adheres to standard software engineering best practices.',
    },
    {
      title: 'Continuous Growth',
      description: 'Eagerly learning advanced DSA, computer network design, and AI integrations to expand full stack competencies.',
    },
    {
      title: 'Agile & Collaborative',
      description: 'Value Git teamwork, transparent communication, and structured sprint execution derived from internship experiences.',
    },
  ]

  return (
    <section id="about" className="bg-background border-b border-border/40">
      <div className="section-container">
        <AnimatedSection>
          <span className="text-primary font-mono text-sm font-semibold tracking-wider uppercase">
            Who I Am
          </span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">My professional story, academic milestones, and core values.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6 text-muted leading-relaxed">
            <AnimatedSection delay={0.1}>
              <p>
                I am a focused student developer based in India, currently completing my Bachelor of Computer Applications with a focus on Artificial Intelligence and Data Science. My professional journey began by diving deep into systems programming and building core modules from the ground up, such as building a custom SQL parser database engine completely from scratch without external libraries.
              </p>
              <p className="mt-4">
                Through my internships, I have gained real-world exposure to full stack architectures and backend auditing. Whether validating inputs to prevent vulnerabilities, designing RESTful interfaces, managing database schemas, or writing multi-threaded scrapers, I prioritize clean architectural design over temporary quick-fixes.
              </p>
            </AnimatedSection>

            {/* Core Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {pillars.map((pillar, index) => (
                <AnimatedSection
                  key={pillar.title}
                  delay={0.15 + index * 0.05}
                  className="bg-card border border-border/60 p-4 rounded-xl hover:border-primary/20 transition-all duration-300"
                >
                  <h4 className="text-text font-bold text-sm mb-1">{pillar.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{pillar.description}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Education Timeline Column */}
          <div className="lg:col-span-6 space-y-8 relative pl-6 lg:pl-10">
            {/* Vertical timeline connector */}
            <div className="absolute left-6 lg:left-10 top-2 bottom-2 w-px bg-border/60" />

            {milestones.map((item, index) => (
              <AnimatedSection
                key={item.title}
                delay={0.1 + index * 0.1}
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Timeline node icon / indicator */}
                <span className="absolute -left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors duration-300 z-10" />

                <div>
                  <span className="text-xs font-mono font-medium text-primary bg-primary/5 px-2.5 py-0.5 rounded-full border border-primary/10">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-text mt-3">{item.title}</h3>
                  <p className="text-sm font-medium text-muted mt-0.5">{item.institution}</p>
                  {item.description && (
                    <p className="text-sm text-muted mt-2 leading-relaxed">{item.description}</p>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
