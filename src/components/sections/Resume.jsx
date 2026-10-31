import AnimatedSection from '../ui/AnimatedSection'
import { FiDownload, FiCheckCircle, FiFileText } from 'react-icons/fi'
import { SITE, LINKS } from '../../utils/constants'

const LABEL = { color: '#00b4ff', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }

/**
 * Resume Section — dark navy glassmorphism dashboard style.
 */
export default function Resume({ site }) {
  const activeSite = site || SITE
  const highlights = [
    'ATS-compliant, single-page layout (verified)',
    'Flagship ML: TradeGuard (FastAPI, XGBoost, OCR, TF-IDF)',
    'NearShare: P2P File Transfer with ML (k-NN) & ECDH + AES-256-GCM',
    'Uptoskills Internship: Reduced candidate processing time by 30%',
    '5 Merged Pull Requests in Kestra (15k+ ⭐ GitHub)',
    `Verified CGPA: ${activeSite.cgpa}`,
  ]

  return (
    <section
      id="resume"
      className="relative overflow-hidden"
      style={{ background: '#060d1f', borderBottom: '1px solid rgba(0, 180, 255, 0.08)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', right: '5%', top: '20%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      <div className="section-container relative z-10">
        <AnimatedSection>
          <span style={LABEL}>Curriculum Vitae</span>
          <h2 className="section-title mt-2">Resume &amp; Qualifications</h2>
          <p className="section-subtitle">Download the formal single-page resume or inspect key qualifications below.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Info */}
          <div className="lg:col-span-5">
            <div
              className="rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full"
              style={{
                background: 'rgba(8, 20, 41, 0.9)',
                border: '1px solid rgba(0, 180, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, #0055cc, #00b4ff, transparent)',
              }} />

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(0, 180, 255, 0.1)', color: '#00b4ff', border: '1px solid rgba(0,180,255,0.2)' }}>
                    <FiFileText size={20} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: '#d6e8ff' }}>Resume Overview</h3>
                </div>

                <p className="text-sm leading-relaxed mb-6" style={{ color: '#6b9acf' }}>
                  The official resume is engineered with an ATS-friendly, single-column design optimised for automated parsers, Machine Learning, and Software Engineering recruiter screens.
                </p>

                <ul className="space-y-3 mb-8">
                  {highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm" style={{ color: '#6b9acf' }}>
                      <FiCheckCircle className="shrink-0 mt-0.5" size={16} style={{ color: '#34d399' }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2.5">
                <a href={LINKS.resume} download="Pranjal_Singh_Resume.pdf" className="btn-primary justify-center w-full">
                  <FiDownload size={16} /> Download Resume PDF
                </a>
                <a href="/docs/resume.json" download="resume.json" className="text-xs text-center font-mono py-2 rounded-lg transition-colors" style={{ color: '#6b9acf', border: '1px solid rgba(0, 180, 255, 0.15)' }}>
                  {'{ }'} Download resume.json
                </a>
              </div>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="lg:col-span-7">
            <div
              className="rounded-2xl p-6 md:p-8 flex flex-col gap-5 h-full select-none"
              style={{
                background: 'rgba(8, 20, 41, 0.9)',
                border: '1px solid rgba(0, 180, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(0, 180, 255, 0.05) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

              <div className="pb-4" style={{ borderBottom: '1px solid rgba(0, 180, 255, 0.08)' }}>
                <h3 className="text-base font-bold" style={{ color: '#d6e8ff' }}>{activeSite.name}</h3>
                <p className="text-xs font-mono mt-0.5" style={{ color: '#00b4ff' }}>{activeSite.title}</p>
                <p className="text-[10px] font-mono mt-1" style={{ color: '#6b9acf' }}>
                  {activeSite.email} | {activeSite.phone} | Bhimtal, Uttarakhand
                </p>
              </div>

              {[
                {
                  label: 'Education',
                  content: <div className="pl-3.5 space-y-1" style={{ borderLeft: '2px solid rgba(0, 180, 255, 0.2)' }}>
                    <div className="flex justify-between text-xs font-semibold" style={{ color: '#d6e8ff' }}>
                      <span>{activeSite.university} — BCA (AI & Data Science)</span>
                      <span>Jun 2024 — Jun 2027</span>
                    </div>
                    <div className="text-[11px]" style={{ color: '#6b9acf' }}>Bhimtal, Uttarakhand | CGPA: {activeSite.cgpa}</div>
                  </div>
                },
                {
                  label: 'Internship Experience',
                  content: <div className="space-y-4 pl-3.5" style={{ borderLeft: '2px solid rgba(0, 180, 255, 0.2)' }}>
                    <div>
                      <div className="flex justify-between text-xs font-semibold" style={{ color: '#d6e8ff' }}>
                        <span>Full Stack Developer Intern — TBI, GEHU</span>
                        <span>Jun 2026 — Aug 2026</span>
                      </div>
                      <p className="text-[10px] mt-0.5 leading-relaxed" style={{ color: '#6b9acf' }}>
                        Built AgriConnect REST APIs & Google Gemini crop-advisory endpoint, JWT auth, and frontend AI Advisor interface.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold" style={{ color: '#d6e8ff' }}>
                        <span>Backend Developer Intern — Uptoskills (Remote)</span>
                        <span>May 2026 — Aug 2026</span>
                      </div>
                      <p className="text-[10px] mt-0.5 leading-relaxed" style={{ color: '#6b9acf' }}>
                        Built Interview Management Module (6+ REST API endpoints) — <strong>reduced candidate processing time by 30%</strong>; audited 20+ routes.
                      </p>
                    </div>
                  </div>
                },
                {
                  label: 'Featured Projects & Open Source',
                  content: <div className="space-y-2 pl-3.5 text-xs" style={{ borderLeft: '2px solid rgba(0, 180, 255, 0.2)' }}>
                    <div>
                      <span className="font-semibold" style={{ color: '#38bdf8' }}>TradeGuard:</span>{' '}
                      <span style={{ color: '#6b9acf' }}>Maritime document intelligence & XGBoost risk engine (ROC-AUC 0.86, 100% precision) with FastAPI.</span>
                    </div>
                    <div>
                      <span className="font-semibold" style={{ color: '#06b6d4' }}>NearShare:</span>{' '}
                      <span style={{ color: '#6b9acf' }}>E2EE P2P file transfer with ECDH + AES-256-GCM and embedded k-NN ML telemetry optimization.</span>
                    </div>
                    <div>
                      <span className="font-semibold" style={{ color: '#a855f7' }}>Kestra (Open Source):</span>{' '}
                      <span style={{ color: '#6b9acf' }}>Merged 5 pull requests in 15k+ ⭐ orchestration platform (UI refactoring, bug fixes, unit tests).</span>
                    </div>
                  </div>
                },
                {
                  label: 'Key Technical Skills',
                  content: <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs pl-3.5" style={{ borderLeft: '2px solid rgba(0, 180, 255, 0.2)' }}>
                    {[
                      ['ML & Data', 'scikit-learn, XGBoost, k-NN, TF-IDF, OCR, NumPy, pandas'],
                      ['Languages', 'Python, JavaScript (ES6+), C++, C, SQL'],
                      ['Backend & APIs', 'FastAPI, Node.js, Express, Flask, REST APIs, JWT Auth'],
                      ['Databases & Tools', 'PostgreSQL, MongoDB, SQLite, SQLAlchemy, Git, Linux'],
                    ].map(([k, v]) => (
                      <div key={k}><span className="font-semibold" style={{ color: '#a0c4ff' }}>{k}:</span> <span style={{ color: '#6b9acf' }}>{v}</span></div>
                    ))}
                  </div>
                },
              ].map(({ label, content }) => (
                <div key={label}>
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider mb-2.5" style={{ color: '#6b9acf' }}>{label}</h4>
                  {content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
