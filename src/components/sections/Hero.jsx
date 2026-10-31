import { motion } from 'framer-motion'
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiCode, FiCpu, FiZap } from 'react-icons/fi'
import { SITE, LINKS } from '../../utils/constants'

/**
 * Dark navy glassmorphism Hero â€” Vision UI Pro style dashboard aesthetic.
 */
export default function Hero({ site }) {
  const activeSite = site || SITE

  const stats = [
    { label: 'Projects Built', value: '10+', icon: <FiCode size={14} /> },
    { label: 'CGPA', value: activeSite.cgpa || '7.82', icon: <FiCpu size={14} /> },
    { label: 'Tech Stack', value: '20+', icon: <FiZap size={14} /> },
  ]

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden grid-bg"
      style={{ borderBottom: '1px solid rgba(0, 180, 255, 0.1)' }}
    >
      {/* Background glowing orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute" style={{
          top: '-10%', left: '-5%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(0, 85, 204, 0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'float-orb 10s ease-in-out infinite',
        }} />
        <div className="absolute" style={{
          bottom: '-15%', right: '-5%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(0, 180, 255, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float-orb 8s ease-in-out infinite reverse',
        }} />
        {/* Subtle scan line effect */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,180,255,0.015) 50%, transparent 100%)',
          backgroundSize: '100% 4px',
        }} />
      </div>

      {/* Fade overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
        background: 'linear-gradient(0deg, #060d1f 0%, transparent 100%)',
      }} />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left: Text content */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(0, 180, 255, 0.07)',
              border: '1px solid rgba(0, 180, 255, 0.2)',
              boxShadow: '0 0 20px rgba(0, 180, 255, 0.08)',
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{
              background: '#34d399',
              boxShadow: '0 0 6px rgba(52, 211, 153, 0.8)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span className="text-xs font-mono font-semibold" style={{ color: '#7ecfff' }}>
              [ pranjal_singh_init ] â€” Open to SDE & Full Stack roles
            </span>
          </motion.div>

          {/* Heading */}
          <h1
            className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4 leading-none"
            style={{ fontFamily: 'Outfit, Inter, sans-serif' }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #d6e8ff 0%, #a0c4ff 50%, #d6e8ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {activeSite.name}
            </span>
          </h1>

          {/* Roles with neon separator */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6">
            {['Full Stack Developer', 'Backend Engineer', 'Problem Solver'].map((role, idx, arr) => (
              <span key={role} className="flex items-center gap-3">
                <span className="text-base sm:text-lg font-semibold font-mono" style={{ color: '#00b4ff' }}>
                  {role}
                </span>
                {idx < arr.length - 1 && (
                  <span style={{ color: 'rgba(0, 180, 255, 0.3)', fontSize: '1.2rem' }}>|</span>
                )}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-base sm:text-lg mb-8 max-w-xl leading-relaxed" style={{ color: '#6b9acf' }}>
            BCA student at Graphic Era Hill University. Engineering secure, high-performance web systems
            and database interfaces with clean, well-documented codebases.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#projects" className="btn-primary">
              View Projects <FiArrowRight size={15} />
            </a>
            <a href={LINKS.resume} download="PranjalSingh_Resume.pdf" className="btn-ghost">
              <FiDownload size={15} /> Download Resume
            </a>
            <div className="flex gap-3 items-center">
              <a
                href={LINKS.github} target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-xl transition-all duration-200"
                style={{
                  background: 'rgba(0, 180, 255, 0.05)',
                  border: '1px solid rgba(0, 180, 255, 0.18)',
                  color: '#6b9acf',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#00d4ff'
                  e.currentTarget.style.borderColor = 'rgba(0,180,255,0.45)'
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(0,180,255,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#6b9acf'
                  e.currentTarget.style.borderColor = 'rgba(0, 180, 255, 0.18)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                aria-label="GitHub profile"
              >
                <FiGithub size={18} />
              </a>
              <a
                href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-xl transition-all duration-200"
                style={{
                  background: 'rgba(0, 180, 255, 0.05)',
                  border: '1px solid rgba(0, 180, 255, 0.18)',
                  color: '#6b9acf',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#00d4ff'
                  e.currentTarget.style.borderColor = 'rgba(0,180,255,0.45)'
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(0,180,255,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#6b9acf'
                  e.currentTarget.style.borderColor = 'rgba(0, 180, 255, 0.18)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                aria-label="LinkedIn profile"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{
                  background: 'rgba(8, 20, 41, 0.9)',
                  border: '1px solid rgba(0, 180, 255, 0.12)',
                }}
              >
                <span style={{ color: '#00b4ff' }}>{stat.icon}</span>
                <span className="text-sm font-bold" style={{ color: '#d6e8ff' }}>{stat.value}</span>
                <span className="text-xs" style={{ color: '#6b9acf' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Dashboard terminal card */}
        <motion.div
          className="lg:col-span-5 flex justify-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div
            className="relative w-full max-w-md rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(8, 20, 41, 0.9)',
              border: '1px solid rgba(0, 180, 255, 0.18)',
              boxShadow: '0 0 60px rgba(0, 180, 255, 0.1), 0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Top bar glow line */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{
              background: 'linear-gradient(90deg, transparent, rgba(0, 180, 255, 0.6), transparent)',
            }} />

            {/* Terminal Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: 'rgba(13, 31, 62, 0.8)',
                borderBottom: '1px solid rgba(0, 180, 255, 0.1)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57', boxShadow: '0 0 5px rgba(255,95,87,0.5)' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e', boxShadow: '0 0 5px rgba(254,188,46,0.5)' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#28c840', boxShadow: '0 0 5px rgba(40,200,64,0.5)' }} />
              </div>
              <span className="text-xs font-mono" style={{ color: '#4a7aaa' }}>bash â€” pranjal@gehu</span>
              <div className="w-16" />
            </div>

            {/* Terminal Body */}
            <div className="p-5 space-y-4 font-mono text-xs" style={{ minHeight: '260px', color: '#6b9acf' }}>
              <div>
                <span style={{ color: '#00b4ff', fontWeight: 600 }}>$</span>
                <span style={{ color: '#4a7aaa' }}> cat info.json</span>
                <pre className="mt-2 pl-3 leading-relaxed text-[11px]" style={{
                  borderLeft: '2px solid rgba(0, 180, 255, 0.2)',
                  color: '#a0c4ff',
                }}>{`{
  "name": "${activeSite.name}",
  "location": "${activeSite.location}",
  "education": "BCA â€” AI & Data Science",
  "focus": ["Backend", "Systems", "Full Stack"]
}`}</pre>
              </div>

              <div>
                <span style={{ color: '#00b4ff', fontWeight: 600 }}>$</span>
                <span style={{ color: '#4a7aaa' }}> npx dev --status</span>
                <div className="mt-1.5 pl-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{
                    background: '#34d399',
                    boxShadow: '0 0 6px rgba(52, 211, 153, 0.8)',
                    animation: 'pulse 2s ease-in-out infinite',
                    display: 'inline-block',
                  }} />
                  <span style={{ color: '#34d399' }}>Ready for SDE & Full Stack roles</span>
                </div>
              </div>

              <div>
                <span style={{ color: '#00b4ff', fontWeight: 600 }}>$</span>
                <span style={{ color: '#4a7aaa' }}> git log --oneline -3</span>
                <div className="mt-1.5 pl-3 space-y-1">
                  <div><span style={{ color: '#fbbf24' }}>a3f2c1e</span> <span style={{ color: '#7ecfff' }}>feat: AgriConnect AI crop-advisory endpoint</span></div>
                  <div><span style={{ color: '#fbbf24' }}>b7e4d2a</span> <span style={{ color: '#7ecfff' }}>feat: StructDB custom SQL parser engine</span></div>
                  <div><span style={{ color: '#fbbf24' }}>c9a8f3b</span> <span style={{ color: '#7ecfff' }}>feat: MyRideShare real-time tracking</span></div>
                </div>
              </div>

              <div className="flex items-center gap-1" style={{ color: '#4a7aaa' }}>
                <span style={{ color: '#00b4ff', fontWeight: 600 }}>$</span>
                <span className="inline-block w-2 h-4 ml-1" style={{
                  background: '#00b4ff',
                  animation: 'blink 1s step-end infinite',
                  opacity: 0.8,
                }} />
              </div>
            </div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{
              background: 'linear-gradient(90deg, transparent, rgba(0, 180, 255, 0.3), transparent)',
            }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
