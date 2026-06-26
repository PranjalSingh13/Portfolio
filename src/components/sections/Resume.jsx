import AnimatedSection from '../ui/AnimatedSection'
import { FiDownload, FiCheckCircle, FiFileText } from 'react-icons/fi'
import { SITE, LINKS } from '../../utils/constants'

/**
 * Resume Section with an interactive ATS-friendly structure preview.
 */
export default function Resume({ site }) {
  const activeSite = site || SITE
  const highlights = [
    'ATS-compliant single-column layout',
    'Includes Full Stack (React/Node) & Backend (Python/Flask) experience',
    'Verified internship logs at Uptoskills & TBI (GEHU)',
    `Verified CGPA: ${activeSite.cgpa}`,
  ]

  return (
    <section id="resume" className="bg-background border-b border-border/40">
      <div className="section-container">
        <AnimatedSection>
          <span className="text-primary font-mono text-sm font-semibold tracking-wider uppercase">
            Curriculum Vitae
          </span>
          <h2 className="section-title">Resume & Qualifications</h2>
          <p className="section-subtitle">Download the formal single-page resume or inspect key qualifications below.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left panel: Info summary */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-card border border-border p-6 md:p-8 rounded-2xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <FiFileText size={20} />
                </div>
                <h3 className="text-lg font-bold text-text">Resume Overview</h3>
              </div>

              <p className="text-sm text-muted leading-relaxed mb-6">
                The official resume is engineered with an ATS-friendly, single-column design optimised for automated parsers and SDE recruiter screens.
              </p>

              <ul className="space-y-3.5 mb-8" aria-label="Resume Highlights">
                {highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-muted">
                    <FiCheckCircle className="text-success shrink-0 mt-0.5" size={16} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={LINKS.resume}
              download="PranjalSingh_Resume.pdf"
              className="btn-primary justify-center w-full"
            >
              <FiDownload size={16} /> Download Resume PDF
            </a>
          </div>

          {/* Right panel: Live interactive schema preview */}
          <div className="lg:col-span-7 bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 select-none relative overflow-hidden">
            {/* Elegant preview layout representing the actual resume sections */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="border-b border-border/60 pb-4">
              <h3 className="text-base font-bold text-text">{activeSite.name}</h3>
              <p className="text-xs text-primary font-mono mt-0.5">{activeSite.title}</p>
              <p className="text-[10px] text-muted font-mono mt-1">
                {activeSite.email} | {activeSite.phone} | Bhimtal, Uttarakhand
              </p>
            </div>

            {/* Experience Block */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted mb-2.5">
                Education
              </h4>
              <div className="border-l border-border/60 pl-3.5 space-y-1">
                <div className="flex justify-between text-xs font-semibold text-text">
                  <span>{activeSite.university}</span>
                  <span>2024 — 2027</span>
                </div>
                <div className="text-[11px] text-muted">
                  {activeSite.degree} | CGPA: {activeSite.cgpa}
                </div>
              </div>
            </div>

            {/* Experience Block */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted mb-2.5">
                Work Experience
              </h4>
              <div className="space-y-4 border-l border-border/60 pl-3.5">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-text">
                    <span>Full Stack Developer Intern — TBI, GEHU</span>
                    <span>2026 — Present</span>
                  </div>
                  <p className="text-[10px] text-muted mt-0.5">
                    Building AgriConnect full stack platform using React, Node, Express, MongoDB.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-text">
                    <span>Backend Developer Intern — Uptoskills</span>
                    <span>2026</span>
                  </div>
                  <p className="text-[10px] text-muted mt-0.5">
                    Integrated Interview Management module; audited and secured 20+ API routes.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Technical Skills */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted mb-2.5">
                Key Technical Skills
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-muted">
                <div>
                  <span className="font-semibold text-text/80">Languages:</span> Python, JavaScript, C++, C, SQL
                </div>
                <div>
                  <span className="font-semibold text-text/80">Backend:</span> Node.js, Express, Flask, REST APIs, JWT
                </div>
                <div>
                  <span className="font-semibold text-text/80">Databases:</span> MongoDB, MySQL, SQLite, PostgreSQL
                </div>
                <div>
                  <span className="font-semibold text-text/80">DevOps:</span> Git, GitHub, Postman, Vercel, Render
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
