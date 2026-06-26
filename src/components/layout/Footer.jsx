import { FiGithub, FiLinkedin, FiExternalLink } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { SITE, LINKS } from '../../utils/constants'

/**
 * Minimalist, elegant footer.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo and copyright */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-text">
            Pranjal Singh <span className="text-primary font-normal">.dev</span>
          </p>
          <p className="text-xs text-muted mt-1">
            &copy; {currentYear} Pranjal Singh. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-text hover:scale-105 transition-all focus-visible:ring-1 focus-visible:ring-primary rounded p-1"
            aria-label="GitHub profile"
          >
            <FiGithub size={20} />
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-primary hover:scale-105 transition-all focus-visible:ring-1 focus-visible:ring-primary rounded p-1"
            aria-label="LinkedIn profile"
          >
            <FiLinkedin size={20} />
          </a>
          <a
            href={LINKS.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-amber-500 hover:scale-105 transition-all focus-visible:ring-1 focus-visible:ring-primary rounded p-1"
            aria-label="LeetCode profile"
          >
            <SiLeetcode size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
