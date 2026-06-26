import { PROJECTS } from '../data/projects'
import { EXPERIENCE } from '../data/experience'
import { SKILLS } from '../data/skills'
import { ACHIEVEMENTS } from '../data/achievements'
import { SITE } from '../utils/constants'

const STORAGE_KEY = 'pranjal_portfolio_dynamic_data'

/**
 * Loads portfolio state, prioritizing local storage edits.
 */
export function loadPortfolioData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data)
    }
  } catch (e) {
    console.error('Failed to load local storage content:', e)
  }

  // Fallback defaults
  return {
    site: SITE,
    projects: PROJECTS,
    experience: EXPERIENCE,
    skills: SKILLS,
    achievements: ACHIEVEMENTS,
  }
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
