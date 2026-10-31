import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { SITE, LINKS } from '../../utils/constants'

/**
 * Dark navy glassmorphism footer.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(0, 180, 255, 0.1)',
        background: '#060d1f',
        paddingTop: '3rem',
        paddingBottom: '3rem',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
            <span style={{ color: '#d6e8ff' }}>Pranjal Singh</span>
            <span style={{
              background: 'linear-gradient(135deg, #0055cc, #00b4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}> .dev</span>
          </p>
          <p className="text-xs mt-1" style={{ color: '#6b9acf' }}>
            &copy; {currentYear} Pranjal Singh. All rights reserved.
          </p>
          <p className="text-xs mt-0.5 font-mono" style={{ color: '#4a7aaa' }}>
            Built with React + Vite + TailwindCSS
          </p>
        </div>

        <div className="flex items-center gap-4">
          {[
            { href: LINKS.github, icon: <FiGithub size={19} />, label: 'GitHub', hoverColor: '#00d4ff' },
            { href: LINKS.linkedin, icon: <FiLinkedin size={19} />, label: 'LinkedIn', hoverColor: '#0077b5' },
            { href: LINKS.leetcode, icon: <SiLeetcode size={19} />, label: 'LeetCode', hoverColor: '#fbbf24' },
          ].map(({ href, icon, label, hoverColor }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl transition-all duration-200"
              style={{
                background: 'rgba(0, 180, 255, 0.05)',
                border: '1px solid rgba(0, 180, 255, 0.15)',
                color: '#6b9acf',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = hoverColor
                e.currentTarget.style.borderColor = `${hoverColor}55`
                e.currentTarget.style.background = `${hoverColor}10`
                e.currentTarget.style.boxShadow = `0 0 12px ${hoverColor}25`
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#6b9acf'
                e.currentTarget.style.borderColor = 'rgba(0, 180, 255, 0.15)'
                e.currentTarget.style.background = 'rgba(0, 180, 255, 0.05)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'none'
              }}
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
