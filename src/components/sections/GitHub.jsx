import { FiGithub, FiStar, FiGitBranch, FiUsers, FiFolder, FiAlertTriangle } from 'react-icons/fi'
import AnimatedSection from '../ui/AnimatedSection'
import { useGitHub } from '../../hooks/useGitHub'
import { SkeletonCard, SkeletonText } from '../ui/LoadingSkeleton'
import { LINKS, GITHUB_USERNAME } from '../../utils/constants'

/**
 * GitHub Section. Fetches real data dynamically using useGitHub hook.
 * Handles loading, fallback static details on rate limiting, and displays repo cards/languages.
 */
export default function GitHub() {
  const { data, loading, error, rateLimited } = useGitHub()

  // Real statistics fallback in case of rate limiting (to look professional at all times)
  const fallbackStats = {
    profile: {
      login: GITHUB_USERNAME,
      public_repos: 18,
      followers: 12,
      following: 15,
      bio: 'BCA Student | Full Stack & Backend Engineer',
    },
    repos: [
      {
        name: 'MyRideShare',
        description: 'AI-Powered Ride Sharing Application with User & Captain portals, WebSocket connection, and fare estimation.',
        stargazers_count: 4,
        forks_count: 2,
        language: 'JavaScript',
        html_url: `https://github.com/${GITHUB_USERNAME}/MyRideShare`,
      },
      {
        name: 'StructDB',
        description: 'Custom Relational Database Engine built from scratch with SQL parser, B-Tree indexes, and ACID guarantees.',
        stargazers_count: 5,
        forks_count: 1,
        language: 'Python',
        html_url: `https://github.com/${GITHUB_USERNAME}/StructDB`,
      },
      {
        name: 'PriceComparisonPro',
        description: 'Full Stack Price Aggregator comparing Amazon, Flipkart, Ajio, and Meesho in parallel using ThreadPoolExecutor.',
        stargazers_count: 3,
        forks_count: 0,
        language: 'Python',
        html_url: `https://github.com/${GITHUB_USERNAME}/PriceComparisonPro`,
      },
    ],
    languages: [
      { lang: 'Python', count: 8, percent: 45 },
      { lang: 'JavaScript', count: 6, percent: 35 },
      { lang: 'HTML/CSS', count: 3, percent: 15 },
      { lang: 'C++', count: 1, percent: 5 },
    ],
  }

  const activeProfile = rateLimited || error ? fallbackStats.profile : data?.profile
  const activeRepos = rateLimited || error ? fallbackStats.repos : data?.repos
  const activeLangs = rateLimited || error ? fallbackStats.languages : data?.languages

  return (
    <section id="github" className="bg-background border-b border-border/40">
      <div className="section-container">
        <AnimatedSection>
          <span className="text-primary font-mono text-sm font-semibold tracking-wider uppercase">
            Open Source
          </span>
          <h2 className="section-title">GitHub Profile</h2>
          <p className="section-subtitle">Real-time repository telemetry and statistics fetched from GitHub API.</p>
        </AnimatedSection>

        {/* Rate limit warning notification */}
        {(rateLimited || error) && (
          <AnimatedSection className="mb-8 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-400 text-sm flex items-start gap-3">
            <FiAlertTriangle className="shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-semibold">GitHub API limit reached or network error.</p>
              <p className="text-xs text-amber-400/80 mt-1">
                Showing cached portfolio snapshot instead of real-time data to prevent layout disruption.
              </p>
            </div>
          </AnimatedSection>
        )}

        {loading ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-card border border-border p-6 rounded-2xl h-24" />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
              </div>
              <div className="lg:col-span-4 bg-card border border-border p-6 rounded-2xl h-80 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Telemetry Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-card border border-border p-6 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <FiFolder size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text tabular-nums">
                    {activeProfile?.public_repos}
                  </div>
                  <div className="text-xs text-muted">Public Repositories</div>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-success/10 rounded-xl text-success">
                  <FiUsers size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text tabular-nums">
                    {activeProfile?.followers}
                  </div>
                  <div className="text-xs text-muted">Followers</div>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-xl text-accent">
                  <FiUsers size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text tabular-nums">
                    {activeProfile?.following}
                  </div>
                  <div className="text-xs text-muted">Following</div>
                </div>
              </div>

              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card border border-border p-6 rounded-2xl flex items-center gap-4 hover:border-primary/40 hover:bg-surface/30 transition-all duration-300"
              >
                <div className="p-3 bg-muted/10 rounded-xl text-text">
                  <FiGithub size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-text flex items-center gap-1">
                    @{activeProfile?.login}
                  </div>
                  <div className="text-xs text-primary font-medium">View GitHub Profile</div>
                </div>
              </a>
            </div>

            {/* Repositories & Language Breakdown Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Repos column */}
              <div className="lg:col-span-8 space-y-6">
                <h3 className="text-lg font-bold text-text flex items-center gap-2">
                  <FiFolder className="text-primary" /> Popular Repositories
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {activeRepos?.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-text text-sm hover:text-primary transition-colors">
                          {repo.name}
                        </h4>
                        <p className="text-xs text-muted leading-relaxed mt-2 line-clamp-2">
                          {repo.description || 'No description provided.'}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-6 text-xs text-muted font-mono">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <FiStar size={12} /> {repo.stargazers_count}
                        </span>
                        {repo.forks_count > 0 && (
                          <span className="flex items-center gap-1">
                            <FiGitBranch size={12} /> {repo.forks_count}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Language breakdown column */}
              <div className="lg:col-span-4 bg-card border border-border p-6 rounded-2xl space-y-6">
                <h3 className="text-lg font-bold text-text">Language Breakdown</h3>
                <div className="space-y-4">
                  {activeLangs?.map((langItem) => (
                    <div key={langItem.lang}>
                      <div className="flex justify-between items-center text-xs font-semibold mb-1">
                        <span className="text-text">{langItem.lang}</span>
                        <span className="text-muted">{langItem.percent}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-surface overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${langItem.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contribution graph placeholder illustration */}
                <div className="border-t border-border/80 pt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
                    Contributions telemetry
                  </h4>
                  <div className="bg-surface/50 border border-border rounded-xl p-4 flex flex-col items-center justify-center min-h-24 text-center">
                    <p className="text-xs text-muted leading-relaxed">
                      Daily Git contribution velocity metrics can be viewed directly on Pranjal's GitHub activity feed.
                    </p>
                    <a
                      href={LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:text-accent font-semibold"
                    >
                      Go to GitHub <FiGithub size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
