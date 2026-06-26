import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiGithub, FiSun, FiMoon } from 'react-icons/fi'
import { NAV_LINKS, LINKS, SITE } from '../../utils/constants'
import { useScrollSpy } from '../../hooks/useScrollSpy'

/**
 * Sticky Navbar that shrinks on scroll.
 * Features scrollspy active links, theme toggling, and fully accessible mobile nav.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState('dark') // Default dark mode
  const activeSection = useScrollSpy()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initialize and synchronize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled
          ? 'py-3 bg-background/80 backdrop-blur-md border-border/80 shadow-md'
          : 'py-5 bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <a
          href="#home"
          className="text-lg font-bold tracking-tight text-text hover:text-primary transition-colors focus-visible:ring-1 focus-visible:ring-primary rounded"
          aria-label="Pranjal Singh Home"
        >
          Pranjal<span className="text-primary">.dev</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-text focus-visible:ring-1 focus-visible:ring-primary rounded py-1 px-2 ${
                activeSection === link.href ? 'text-primary' : 'text-muted'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border text-muted hover:text-text hover:bg-surface transition-colors focus-visible:ring-1 focus-visible:ring-primary"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-border text-muted hover:text-text hover:bg-surface transition-colors focus-visible:ring-1 focus-visible:ring-primary"
            aria-label="GitHub profile"
          >
            <FiGithub size={18} />
          </a>

          <a
            href={LINKS.resume}
            download="PranjalSingh_Resume.pdf"
            className="px-4 py-2 rounded-xl text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-white transition-all focus-visible:ring-1 focus-visible:ring-primary"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border text-muted hover:text-text hover:bg-surface transition-colors focus-visible:ring-1 focus-visible:ring-primary"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-border text-muted hover:text-text hover:bg-surface transition-colors focus-visible:ring-1 focus-visible:ring-primary"
            aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-card border-b border-border shadow-xl md:hidden">
          <nav className="flex flex-col p-6 gap-4" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2 px-3 rounded-lg hover:bg-surface transition-colors ${
                  activeSection === link.href ? 'text-primary bg-primary/5' : 'text-muted'
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="flex items-center justify-between border-t border-border pt-4 mt-2">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiGithub size={18} /> GitHub
              </a>

              <a
                href={LINKS.resume}
                download="PranjalSingh_Resume.pdf"
                className="px-4 py-2 rounded-lg text-xs font-semibold border border-primary text-primary hover:bg-primary hover:text-white transition-all text-center"
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
