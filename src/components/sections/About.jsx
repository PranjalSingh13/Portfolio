import { motion } from 'framer-motion'
import AnimatedSection from '../ui/AnimatedSection'
import { FiShield, FiTrendingUp, FiUsers } from 'react-icons/fi'

const SECTION_LABEL_STYLE = { color: '#00b4ff', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }

/**
 * About Section - dark navy glassmorphism dashboard style.
 */
export default function About() {
  const milestones = [
    {
      year: '2024 - 2027',
      title: 'BCA - AI & Data Science',
      institution: 'Graphic Era Hill University, Bhimtal',
      description: 'CGPA: 7.82 / 10.0',
      color: '#00b4ff',
    },
    {
      year: '2024',
      title: 'Intermediate (12th CBSE)',
      institution: 'Inspiration Public School, Kathgodam, Uttarakhand',
      color: '#34d399',
    },
    {
      year: '2022',
      title: 'High School (10th CBSE)',
      institution: 'K.L. Mehta Dayanand Public School, Faridabad, Haryana',
      color: '#fbbf24',
    },
  ]

  const pillars = [
    {
      title: 'Reliable Systems',
      Icon: FiShield,
      description: 'Committed to writing secure, validated, and optimized code that adheres to standard software engineering best practices.',
      color: '#00b4ff',
    },
    {
      title: 'Continuous Growth',
      Icon: FiTrendingUp,
      description: 'Eagerly learning advanced DSA, computer network design, and AI integrations to expand full stack competencies.',
      color: '#34d399',
    },
    {
      title: 'Agile & Collaborative',
      Icon: FiUsers,
      description: 'Value Git teamwork, transparent communication, and structured sprint execution derived from internship experiences.',
      color: '#a78bfa',
    },
  ]

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ background: '#060d1f', borderBottom: '1px solid rgba(0, 180, 255, 0.08)' }}
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', right: '-10%', top: '20%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(0, 85, 204, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="section-container relative z-10">
        <AnimatedSection>
          <span style={SECTION_LABEL_STYLE}>Who I Am</span>
          <h2 className="section-title mt-2">About Me</h2>
          <p className="section-subtitle">My professional story, academic milestones, and core values.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatedSection delay={0.1}>
              <p className="leading-relaxed text-base" style={{ color: '#6b9acf' }}>
                I am a focused student developer based in India, currently completing my Bachelor of Computer Applications
                with a focus on Artificial Intelligence and Data Science. My professional journey began by diving deep into
                systems programming and building core modules from the ground up, such as building a custom SQL parser
                database engine completely from scratch without external libraries.
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: '#6b9acf' }}>
                Through my internships, I have gained real-world exposure to full stack architectures and backend auditing.
                Whether validating inputs to prevent vulnerabilities, designing RESTful interfaces, managing database schemas,
                or writing multi-threaded scrapers, I prioritize clean architectural design over temporary quick-fixes.
              </p>
            </AnimatedSection>

            {/* Core Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {pillars.map((pillar, index) => (
                <AnimatedSection
                  key={pillar.title}
                  delay={0.15 + index * 0.07}
                  className="rounded-xl p-4 transition-all duration-300"
                  style={{
                    background: 'rgba(8, 20, 41, 0.9)',
                    border: `1px solid rgba(0, 180, 255, 0.1)`,
                  }}
                >
                  <pillar.Icon size={24} style={{ color: pillar.color, marginBottom: 12 }} />
                  <h4 className="font-bold text-sm mb-2" style={{ color: pillar.color }}>{pillar.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#6b9acf' }}>{pillar.description}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Education Timeline Column */}
          <div className="lg:col-span-6 space-y-6 relative pl-8">
            {/* Vertical timeline connector */}
            <div className="absolute left-0 top-2 bottom-2 w-px" style={{
              background: 'linear-gradient(180deg, rgba(0, 180, 255, 0.5), rgba(0, 85, 204, 0.1))',
            }} />

            {milestones.map((item, index) => (
              <AnimatedSection
                key={item.title}
                delay={0.1 + index * 0.1}
                className="relative pl-6 group"
              >
                {/* Timeline node */}
                <span
                  className="absolute -left-2 top-1.5 w-4 h-4 rounded-full border-2 z-10 transition-all duration-300 group-hover:scale-125"
                  style={{
                    borderColor: item.color,
                    background: '#060d1f',
                    boxShadow: `0 0 8px ${item.color}55`,
                  }}
                />

                <div
                  className="p-5 rounded-xl transition-all duration-300"
                  style={{
                    background: 'rgba(8, 20, 41, 0.8)',
                    border: '1px solid rgba(0, 180, 255, 0.1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${item.color}44`
                    e.currentTarget.style.boxShadow = `0 0 20px ${item.color}15`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(0, 180, 255, 0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <span
                    className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    {item.year}
                  </span>
                  <h3 className="text-base font-bold mt-3" style={{ color: '#d6e8ff' }}>{item.title}</h3>
                  <p className="text-sm font-medium mt-1" style={{ color: '#6b9acf' }}>{item.institution}</p>
                  {item.description && (
                    <p className="text-sm mt-2" style={{ color: item.color }}>{item.description}</p>
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
