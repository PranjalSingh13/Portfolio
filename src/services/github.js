import { GITHUB_USERNAME } from '../utils/constants'

const BASE_URL = 'https://api.github.com'

/**
 * Fetch GitHub user profile.
 * Uses public API — no token required for basic reads.
 */
export async function fetchGitHubProfile() {
  const res = await fetch(`${BASE_URL}/users/${GITHUB_USERNAME}`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  })
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
  return res.json()
}

/**
 * Fetch public repositories sorted by stars.
 */
export async function fetchGitHubRepos() {
  const res = await fetch(
    `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=30`,
    { headers: { Accept: 'application/vnd.github.v3+json' } }
  )
  if (!res.ok) throw new Error(`GitHub repos error: ${res.status}`)
  return res.json()
}

/**
 * Compute language breakdown from repos list.
 */
export function computeLanguages(repos) {
  const langMap = {}
  repos.forEach((repo) => {
    if (repo.language) {
      langMap[repo.language] = (langMap[repo.language] || 0) + 1
    }
  })
  const total = Object.values(langMap).reduce((a, b) => a + b, 0)
  return Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([lang, count]) => ({
      lang,
      count,
      percent: Math.round((count / total) * 100),
    }))
}

/**
 * Fetch recent public events for the GitHub user.
 */
export async function fetchGitHubEvents() {
  const res = await fetch(`${BASE_URL}/users/${GITHUB_USERNAME}/events/public?per_page=10`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  })
  if (!res.ok) throw new Error(`GitHub events error: ${res.status}`)
  return res.json()
}

