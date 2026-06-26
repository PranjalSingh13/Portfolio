import { motion } from 'framer-motion'
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi'
import { SITE, LINKS } from '../../utils/constants'

/**
 * Premium Hero Section with an editorial/minimalist design.
 * Features an interactive static terminal window/compilation mock instead of an AI-generated graphic.
 */
export default function Hero({ site }) {
  const roles = ['Full Stack Developer', 'Backend Engineer', 'Problem Solver']
  const activeSite = site || SITE

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden grid-bg border-b border-border/40"
    >
      {/* Subtle overlay to fade the background grid */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Editorial Text Area */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <span className="text-primary font-mono text-xs font-semibold tracking-widest uppercase mb-4">
            [ pranjal_singh_init ]
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 text-text leading-tight">
            {activeSite.name}
          </h1>

          <div className="text-base sm:text-lg font-mono font-medium text-muted mb-6 flex flex-wrap gap-x-3 gap-y-1">
            {roles.map((role, idx) => (
              <span key={role} className="flex items-center">
                <span className="text-primary font-semibold">{role}</span>
                {idx < roles.length - 1 && (
                  <span className="text-border ml-3 font-normal select-none" aria-hidden="true">
                    /
                  </span>
                )}
              </span>
            ))}
          </div>

          <p className="text-muted text-base sm:text-lg mb-10 max-w-xl leading-relaxed text-balance">
            BCA student at Graphic Era Hill University. Engineering secure, high-performance web systems and database interfaces with clean, documented code bases.
          </p>

          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="btn-primary w-full sm:w-auto justify-center group"
            >
              View Projects
              <FiArrowRight className="group-hover:translate-x-0.5 transition-transform duration-200" size={15} />
            </a>

            <a
              href={LINKS.resume}
              download="PranjalSingh_Resume.pdf"
              className="btn-ghost w-full sm:w-auto justify-center"
            >
              <FiDownload size={15} /> Download Resume
            </a>

            <div className="flex gap-3 mt-4 sm:mt-0 w-full sm:w-auto justify-center items-center sm:pl-2">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-border text-muted hover:text-text hover:bg-surface transition-all focus-visible:ring-1 focus-visible:ring-primary"
                aria-label="GitHub profile"
              >
                <FiGithub size={18} />
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-border text-muted hover:text-primary hover:bg-surface transition-all focus-visible:ring-1 focus-visible:ring-primary"
                aria-label="LinkedIn profile"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Developer Mock Terminal / Window */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md bg-card border border-border rounded-xl shadow-2xl overflow-hidden font-mono text-xs">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-surface/50 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] text-muted font-mono select-none">bash - pranjal@gehu</span>
            </div>

            {/* Terminal Window Body */}
            <div className="p-5 space-y-4 text-muted/90 min-h-[220px]">
              <div>
                <span className="text-primary font-semibold">$</span> cat info.json
                <pre className="text-text/80 mt-1 pl-3 border-l border-border/80 text-[11px] leading-relaxed">
{`{
  "name": "${activeSite.name}",
  "location": "${activeSite.location}",
  "education": "${activeSite.degree}",
  "focus": ["Backend", "Systems", "Full Stack"]
}`}
                </pre>
              </div>

              <div>
                <span className="text-primary font-semibold">$</span> npx dev --status
                <div className="text-success mt-1 pl-3 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span>Ready for SDE & Full Stack roles</span>
                </div>
              </div>

              <div>
                <span className="text-primary font-semibold">$</span> git status
                <div className="text-text/70 mt-1 pl-3 select-none">
                  On branch main. Code base optimized.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
