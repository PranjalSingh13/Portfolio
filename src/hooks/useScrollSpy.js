import { useState, useEffect } from 'react'
import { NAV_LINKS } from '../utils/constants'

/**
 * Tracks which section is currently in view and returns its href.
 */
export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState('#home')

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''))

    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`)
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach((obs) => obs && obs.disconnect())
  }, [])

  return activeSection
}
