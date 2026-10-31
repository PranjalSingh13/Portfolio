import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiGithub, FiSun, FiMoon } from 'react-icons/fi'
import { NAV_LINKS, LINKS, SITE } from '../../utils/constants'
import { useScrollSpy } from '../../hooks/useScrollSpy'

/**
 * Glassmorphism sticky Navbar — dark navy dashboard style with neon cyan accents.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const activeSection = useScrollSpy()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    document.documentElement.classList.toggle('light', savedTheme === 'light')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'py-2.5 border-b'
          : 'py-4 border-b border-transparent'
      }`}
      style={scrolled ? {
        background: 'rgba(6, 13, 31, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderColor: 'rgba(0, 180, 255, 0.12)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
      } : {
        background: 'transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          className="relative text-lg font-bold tracking-tight transition-all focus-visible:ring-1 rounded"
          aria-label="Pranjal Singh Home"
          style={{ fontFamily: 'Outfit, Inter, sans-serif' }}
        >
          <span style={{ color: '#d6e8ff' }}>Pranjal</span>
          <span style={{
            background: 'linear-gradient(135deg, #0055cc, #00b4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>.dev</span>
          {/* Subtle glow under logo */}
          <span className="absolute -bottom-1 left-0 w-full h-px" style={{
            background: 'linear-gradient(90deg, #0055cc, #00b4ff, transparent)',
            opacity: 0.6,
          }} />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive ? '#00d4ff' : '#6b9acf',
                  background: isActive ? 'rgba(0, 180, 255, 0.08)' : 'transparent',
                  textShadow: isActive ? '0 0 8px rgba(0, 212, 255, 0.4)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#b0d8ff'
                    e.currentTarget.style.background = 'rgba(0, 180, 255, 0.05)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#6b9acf'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full" style={{
                    background: 'linear-gradient(90deg, #0055cc, #00b4ff)',
                    boxShadow: '0 0 6px rgba(0,180,255,0.6)',
                  }} />
                )}
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border transition-all duration-200"
            style={{
              background: 'rgba(0, 180, 255, 0.05)',
              borderColor: 'rgba(0, 180, 255, 0.18)',
              color: '#6b9acf',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#00d4ff'
              e.currentTarget.style.borderColor = 'rgba(0, 180, 255, 0.4)'
              e.currentTarget.style.background = 'rgba(0, 180, 255, 0.1)'
              e.currentTarget.style.boxShadow = '0 0 12px rgba(0,180,255,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#6b9acf'
              e.currentTarget.style.borderColor = 'rgba(0, 180, 255, 0.18)'
              e.currentTarget.style.background = 'rgba(0, 180, 255, 0.05)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>

          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border transition-all duration-200"
            style={{
              background: 'rgba(0, 180, 255, 0.05)',
              borderColor: 'rgba(0, 180, 255, 0.18)',
              color: '#6b9acf',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#00d4ff'
              e.currentTarget.style.borderColor = 'rgba(0, 180, 255, 0.4)'
              e.currentTarget.style.background = 'rgba(0, 180, 255, 0.1)'
              e.currentTarget.style.boxShadow = '0 0 12px rgba(0,180,255,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#6b9acf'
              e.currentTarget.style.borderColor = 'rgba(0, 180, 255, 0.18)'
              e.currentTarget.style.background = 'rgba(0, 180, 255, 0.05)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            aria-label="GitHub profile"
          >
            <FiGithub size={17} />
          </a>

          <a
            href={LINKS.resume}
            download="PranjalSingh_Resume.pdf"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #0055cc, #00b4ff)',
              color: '#fff',
              border: '1px solid rgba(0, 180, 255, 0.3)',
              boxShadow: '0 0 16px rgba(0, 180, 255, 0.2)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 28px rgba(0, 180, 255, 0.5)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 16px rgba(0, 180, 255, 0.2)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            Resume
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border transition-all"
            style={{
              background: 'rgba(0, 180, 255, 0.05)',
              borderColor: 'rgba(0, 180, 255, 0.18)',
              color: '#6b9acf',
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border transition-all"
            style={{
              background: 'rgba(0, 180, 255, 0.05)',
              borderColor: 'rgba(0, 180, 255, 0.18)',
              color: '#6b9acf',
            }}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="absolute top-full left-0 w-full md:hidden"
          style={{
            background: 'rgba(6, 13, 31, 0.96)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0, 180, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          }}
        >
          <nav className="flex flex-col p-6 gap-2" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium transition-all"
                  style={{
                    color: isActive ? '#00d4ff' : '#6b9acf',
                    background: isActive ? 'rgba(0, 180, 255, 0.1)' : 'transparent',
                    border: isActive ? '1px solid rgba(0, 180, 255, 0.2)' : '1px solid transparent',
                  }}
                >
                  {link.label}
                </a>
              )
            })}
            <div className="flex items-center justify-between border-t mt-2 pt-4"
              style={{ borderColor: 'rgba(0, 180, 255, 0.1)' }}
            >
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: '#6b9acf' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiGithub size={18} /> GitHub
              </a>
              <a
                href={LINKS.resume}
                download="PranjalSingh_Resume.pdf"
                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #0055cc, #00b4ff)',
                  color: '#fff',
                  border: '1px solid rgba(0, 180, 255, 0.3)',
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

