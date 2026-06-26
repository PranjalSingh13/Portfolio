import { useState, useEffect, useCallback } from 'react'
import { fetchGitHubProfile, fetchGitHubRepos, computeLanguages } from '../services/github'

/**
 * useGitHub — fetches and caches GitHub profile + repos.
 * Gracefully handles API rate limits (403/429).
 */
export function useGitHub() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rateLimited, setRateLimited] = useState(false)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const [profile, repos] = await Promise.all([
        fetchGitHubProfile(),
        fetchGitHubRepos(),
      ])
      const languages = computeLanguages(repos)
      const topRepos = repos
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
      setData({ profile, repos: topRepos, languages })
    } catch (err) {
      if (err.message.includes('403') || err.message.includes('429')) {
        setRateLimited(true)
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return { data, loading, error, rateLimited }
}
