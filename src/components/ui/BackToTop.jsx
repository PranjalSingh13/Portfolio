import { useState, useEffect } from 'react'
import { FiArrowUp } from 'react-icons/fi'

/**
 * Back To Top button — neon glow dashboard style.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '5.5rem',
        right: '1.5rem',
        zIndex: 40,
        padding: '0.75rem',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #0055cc, #00b4ff)',
        border: '1px solid rgba(0, 180, 255, 0.35)',
        color: '#fff',
        boxShadow: '0 0 20px rgba(0, 180, 255, 0.35)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 180, 255, 0.6)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 180, 255, 0.35)'
        e.currentTarget.style.transform = 'none'
      }}
    >
      <FiArrowUp size={18} />
    </button>
  )
}
