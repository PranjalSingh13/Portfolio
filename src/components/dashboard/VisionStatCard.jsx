/**
 * VisionStatCard — Matches the 4 top KPI cards in Vision UI Pro screenshot.
 * Displays title, value, percentage badge, and glowing blue rounded icon.
 */
export default function VisionStatCard({ title, value, change, isPositive = true, icon }) {
  return (
    <div className="relative rounded-2xl p-4 bg-gradient-to-br from-[#060B26]/90 to-[#0F1535]/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/30 hover:border-[#0075FF]/40 transition-all duration-300 group overflow-hidden">
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold text-[#8fa0dd] tracking-wider uppercase">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
              {value}
            </h3>
            {change && (
              <span
                className={`text-xs font-bold font-mono ${
                  isPositive ? 'text-[#01B574]' : 'text-[#E31A1A]'
                }`}
              >
                {change}
              </span>
            )}
          </div>
        </div>

        {/* Glowing blue rounded square icon container matching Vision UI */}
        <div className="w-11 h-11 rounded-xl bg-[#0075FF] flex items-center justify-center text-white shadow-lg shadow-[#0075FF]/45 shrink-0 group-hover:scale-105 group-hover:shadow-[#0075FF]/70 transition-all duration-300">
          {icon}
        </div>
      </div>
    </div>
  )
}
