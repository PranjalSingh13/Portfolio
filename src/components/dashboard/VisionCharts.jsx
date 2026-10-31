import { useState } from 'react'
import { FiTrendingUp, FiCheckSquare, FiSquare } from 'react-icons/fi'

/**
 * VisionBarChart — Vertical neon gradient bars with interactive stat checkboxes
 * Matches the "Active Users" card in the Vision UI Pro dashboard screenshot.
 */
export function VisionBarChart() {
  const [activeMetrics, setActiveMetrics] = useState({
    commits: true,
    prs: true,
    problems: true,
    deploys: true,
  })

  const [hoveredBar, setHoveredBar] = useState(null)

  const bars = [
    { label: 'M', value: 340, height: 55, day: 'Mon' },
    { label: 'T', value: 220, height: 35, day: 'Tue' },
    { label: 'W', value: 480, height: 75, day: 'Wed' },
    { label: 'T', value: 390, height: 60, day: 'Thu' },
    { label: 'F', value: 540, height: 88, day: 'Fri' },
    { label: 'S', value: 420, height: 68, day: 'Sat' },
    { label: 'S', value: 310, height: 48, day: 'Sun' },
    { label: 'M', value: 460, height: 72, day: 'Mon' },
    { label: 'T', value: 590, height: 95, day: 'Tue' },
  ]

  const metrics = [
    { id: 'commits', label: 'Commits', value: '1,420+' },
    { id: 'prs', label: 'PRs & Merges', value: '48+' },
    { id: 'problems', label: 'DSA Solved', value: '350+' },
    { id: 'deploys', label: 'Deployments', value: '12+' },
  ]

  const toggleMetric = (id) => {
    setActiveMetrics((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Chart visualization */}
      <div className="relative pt-2 pb-6 px-2">
        <div className="h-44 w-full flex items-end justify-between gap-2.5 px-3 pb-2 pt-6 rounded-2xl bg-[#060B26]/60 border border-white/5 relative overflow-hidden">
          {/* Subtle horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4 opacity-15">
            <div className="border-b border-dashed border-cyan-400 w-full" />
            <div className="border-b border-dashed border-cyan-400 w-full" />
            <div className="border-b border-dashed border-cyan-400 w-full" />
          </div>

          {bars.map((bar, idx) => {
            const isHovered = hoveredBar === idx
            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative z-10"
                onMouseEnter={() => setHoveredBar(idx)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-7 px-2 py-0.5 rounded-md bg-[#0075FF] text-[10px] font-mono text-white shadow-lg shadow-blue-500/40 pointer-events-none whitespace-nowrap z-20">
                    {bar.value} hrs
                  </div>
                )}
                {/* Bar */}
                <div
                  className="w-full max-w-[14px] rounded-t-full transition-all duration-300"
                  style={{
                    height: `${bar.height}%`,
                    background: isHovered
                      ? 'linear-gradient(180deg, #00d4ff 0%, #0075ff 100%)'
                      : 'linear-gradient(180deg, #7551FF 0%, #0075FF 100%)',
                    boxShadow: isHovered
                      ? '0 0 16px rgba(0, 212, 255, 0.75)'
                      : '0 0 10px rgba(117, 81, 255, 0.4)',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Info title */}
      <div className="px-1 mb-3">
        <h4 className="text-sm font-bold text-white tracking-wide">Active Dev Velocity</h4>
        <p className="text-xs text-[#8fa0dd] flex items-center gap-1.5 mt-0.5">
          <span className="text-[#01B574] font-semibold flex items-center gap-0.5">
            <FiTrendingUp size={13} /> +24%
          </span>
          than last month
        </p>
      </div>

      {/* Bottom 4 metric pills with toggleable checkboxes matching Vision UI screenshot */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10">
        {metrics.map((m) => {
          const isChecked = activeMetrics[m.id]
          return (
            <button
              key={m.id}
              onClick={() => toggleMetric(m.id)}
              className="text-left p-1.5 rounded-xl hover:bg-white/5 transition-all text-xs"
            >
              <div className="flex items-center gap-1.5 text-[11px] text-[#8fa0dd] mb-0.5">
                {isChecked ? (
                  <FiCheckSquare className="text-[#0075FF]" size={13} />
                ) : (
                  <FiSquare className="text-gray-500" size={13} />
                )}
                <span className="truncate">{m.label}</span>
              </div>
              <div className="font-bold text-white text-xs pl-5 font-mono">
                {m.value}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * VisionAreaWaveChart — Glowing dual smooth neon wave charts
 * Matches the "Sales Overview" card in the Vision UI Pro dashboard screenshot.
 */
export function VisionAreaWaveChart() {
  const [hoverIndex, setHoverIndex] = useState(null)

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  // 12 data points matching the dual wave in screenshot
  const seriesA = [20, 55, 30, 48, 85, 62, 92, 50, 75, 98, 70, 88] // Cyan top wave
  const seriesB = [10, 32, 18, 35, 60, 45, 68, 38, 55, 70, 52, 65] // Blue bottom wave

  const width = 500
  const height = 180
  const paddingX = 20
  const paddingY = 25

  // Generate smooth SVG Catmull-Rom or cubic Bezier path
  const getCoordinates = (valArray) => {
    return valArray.map((val, idx) => {
      const x = paddingX + (idx / (valArray.length - 1)) * (width - paddingX * 2)
      const y = height - paddingY - (val / 100) * (height - paddingY * 2)
      return { x, y, val }
    })
  }

  const coordsA = getCoordinates(seriesA)
  const coordsB = getCoordinates(seriesB)

  const createSmoothPath = (points) => {
    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1]
      const p1 = points[i]
      const p2 = points[i + 1]
      const p3 = points[i + 2] || p2

      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
    }
    return d
  }

  const pathA = createSmoothPath(coordsA)
  const pathB = createSmoothPath(coordsB)

  const areaPathA = `${pathA} L ${coordsA[coordsA.length - 1].x} ${height - paddingY} L ${coordsA[0].x} ${height - paddingY} Z`
  const areaPathB = `${pathB} L ${coordsB[coordsB.length - 1].x} ${height - paddingY} L ${coordsB[0].x} ${height - paddingY} Z`

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-sm font-bold text-white tracking-wide">Performance Overview</h4>
          <p className="text-xs text-[#8fa0dd] flex items-center gap-1 mt-0.5">
            <span className="text-[#01B574] font-semibold flex items-center gap-0.5">
              <FiTrendingUp size={13} /> +38%
            </span>
            higher throughput in 2025
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D4FF] shadow-sm shadow-cyan-400" />
            <span className="text-[#a0c4ff]">API Ops</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0075FF]" />
            <span className="text-[#8fa0dd]">Code Index</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas for neon spline waves */}
      <div className="relative w-full overflow-hidden my-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-44 overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Neon Cyan Area Gradient */}
            <linearGradient id="cyanAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#0075FF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#060B26" stopOpacity="0" />
            </linearGradient>

            {/* Neon Blue Area Gradient */}
            <linearGradient id="blueAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0075FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#060B26" stopOpacity="0" />
            </linearGradient>

            {/* Glow filters */}
            <filter id="neonCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Horizontal grid guide lines */}
          {[0.25, 0.5, 0.75].map((factor, i) => {
            const y = paddingY + factor * (height - paddingY * 2)
            return (
              <line
                key={i}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="rgba(255, 255, 255, 0.06)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            )
          })}

          {/* Area Fills */}
          <path d={areaPathA} fill="url(#cyanAreaGrad)" />
          <path d={areaPathB} fill="url(#blueAreaGrad)" />

          {/* Spline Lines */}
          <path
            d={pathB}
            fill="none"
            stroke="#0075FF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={pathA}
            fill="none"
            stroke="#00D4FF"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#neonCyanGlow)"
          />

          {/* Interactive Hover Dots */}
          {coordsA.map((pt, idx) => (
            <g
              key={idx}
              className="cursor-pointer"
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoverIndex === idx ? 6 : 3.5}
                fill={hoverIndex === idx ? '#ffffff' : '#00D4FF'}
                stroke="#060B26"
                strokeWidth="2"
                className="transition-all duration-200"
              />
            </g>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoverIndex !== null && (
          <div
            className="absolute top-2 pointer-events-none px-2.5 py-1 rounded-lg bg-[#0075FF] text-white text-[11px] font-mono shadow-xl shadow-blue-500/50 -translate-x-1/2"
            style={{
              left: `${(hoverIndex / (months.length - 1)) * 90 + 5}%`,
            }}
          >
            {months[hoverIndex]}: {seriesA[hoverIndex]}k ops
          </div>
        )}
      </div>

      {/* Month Labels along X Axis */}
      <div className="flex justify-between px-2 pt-2 text-[10px] text-[#6b9acf] font-mono border-t border-white/5">
        {months.map((m, i) => (
          <span
            key={m}
            className={`transition-colors ${hoverIndex === i ? 'text-cyan-300 font-bold' : ''}`}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}
