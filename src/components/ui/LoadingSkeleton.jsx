/**
 * Loading skeleton components for GitHub section.
 */
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-card border border-border p-6 ${className}`}>
      <div className="h-4 bg-surface rounded w-3/4 mb-3" />
      <div className="h-3 bg-surface rounded w-full mb-2" />
      <div className="h-3 bg-surface rounded w-2/3" />
    </div>
  )
}

export function SkeletonText({ className = '' }) {
  return <div className={`animate-pulse h-3 bg-surface rounded ${className}`} />
}

export function SkeletonAvatar({ size = 64 }) {
  return (
    <div
      className="animate-pulse rounded-full bg-surface"
      style={{ width: size, height: size }}
    />
  )
}
