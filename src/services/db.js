import { PROJECTS } from '../data/projects'
import { EXPERIENCE } from '../data/experience'
import { SKILLS } from '../data/skills'
import { ACHIEVEMENTS } from '../data/achievements'
import { SITE } from '../utils/constants'

const STORAGE_KEY = 'pranjal_portfolio_dynamic_data'
// Increment this whenever the data structure changes — forces old cached data to be wiped
const CACHE_VERSION = 'v4'

/**
 * Loads portfolio state, prioritizing local storage edits with robust fallback safeguards.
 * If the cached version doesn't match CACHE_VERSION, the stale cache is wiped and
 * fresh defaults from source files are returned.
 */
export function loadPortfolioData() {
  const defaults = {
    site: SITE,
    projects: PROJECTS,
    experience: EXPERIENCE,
    skills: SKILLS,
    achievements: ACHIEVEMENTS,
    _version: CACHE_VERSION,
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      // Version mismatch → wipe stale cache, return fresh defaults
      if (!parsed || parsed._version !== CACHE_VERSION) {
        localStorage.removeItem(STORAGE_KEY)
        return defaults
      }
      if (typeof parsed === 'object') {
        return {
          site: parsed.site && typeof parsed.site === 'object' ? { ...SITE, ...parsed.site } : SITE,
          projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : PROJECTS,
          experience: Array.isArray(parsed.experience) && parsed.experience.length > 0 ? parsed.experience : EXPERIENCE,
          skills: Array.isArray(parsed.skills) && parsed.skills.length > 0 ? parsed.skills : SKILLS,
          achievements: Array.isArray(parsed.achievements) && parsed.achievements.length > 0 ? parsed.achievements : ACHIEVEMENTS,
          _version: CACHE_VERSION,
        }
      }
    }
  } catch (e) {
    // Corrupted cache — wipe it
    console.error('Failed to load local storage content, wiping cache:', e)
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  return defaults
}

/**
 * Persists portfolio edits to local storage.
 */
export function savePortfolioData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (e) {
    console.error('Failed to save portfolio data:', e)
    return false
  }
}

/**
 * Resets portfolio edits back to source file defaults.
 */
export function resetPortfolioData() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (e) {
    console.error('Failed to reset portfolio storage:', e)
    return false
  }
}

/**
 * Formats a javascript object as a string suitable for copying into raw files.
 */
export function formatDataAsJsFile(data, exportName) {
  return `export const ${exportName} = ${JSON.stringify(data, null, 2)}`
}
