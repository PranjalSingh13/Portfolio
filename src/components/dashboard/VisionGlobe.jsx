import { useEffect, useRef, useState } from 'react'

/**
 * VisionGlobe — Interactive 3D Dotted Holographic Canvas Globe
 * Faithfully matches the glowing cyan/blue dotted globe in Vision UI Pro.
 */
export default function VisionGlobe({ className = '' }) {
  const canvasRef = useRef(null)
  const isDraggingRef = useRef(false)
  const lastMousePosRef = useRef({ x: 0, y: 0 })
  const rotationRef = useRef({ x: 0.2, y: 0 })
  const autoRotateSpeed = 0.004

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    // Generate points on sphere surface with continent-like clusters
    const numPoints = 850
    const points = []

    for (let i = 0; i < numPoints; i++) {
      // Golden spiral distribution for uniform spherical coverage
      const y = 1 - (i / (numPoints - 1)) * 2 // from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y)
      const phi = i * 2.39996323 // golden ratio angle

      const x = Math.cos(phi) * radiusAtY
      const z = Math.sin(phi) * radiusAtY

      // Determine continent probability for realistic world globe dot clusters
      const lat = Math.asin(y) * (180 / Math.PI)
      const lon = Math.atan2(z, x) * (180 / Math.PI)

      // Highlight prominent dot clusters
      const isLand = checkIsLand(lat, lon)

      points.push({
        x,
        y,
        z,
        isLand,
        baseSize: isLand ? 1.8 : 1.0,
      })
    }

    // Key pulse locations (e.g. India, San Francisco, London, Tokyo)
    const hotspots = [
      { lat: 28.6, lon: 77.2, label: 'India (Base)' },
      { lat: 37.7, lon: -122.4, label: 'US West' },
      { lat: 51.5, lon: -0.1, label: 'London' },
      { lat: 35.6, lon: 139.6, label: 'Tokyo' },
    ].map((h) => {
      const phi = (90 - h.lat) * (Math.PI / 180)
      const theta = (h.lon + 180) * (Math.PI / 180)
      return {
        x: -(Math.sin(phi) * Math.cos(theta)),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
        label: h.label,
      }
    })

    function checkIsLand(lat, lon) {
      // Approximate continent bounding regions
      // North America
      if (lat >= 15 && lat <= 70 && lon >= -160 && lon <= -55) return true
      // South America
      if (lat >= -55 && lat <= 12 && lon >= -80 && lon <= -35) return true
      // Europe
      if (lat >= 36 && lat <= 70 && lon >= -10 && lon <= 45) return true
      // Africa
      if (lat >= -35 && lat <= 36 && lon >= -18 && lon <= 50) return true
      // Asia
      if (lat >= 8 && lat <= 75 && lon >= 50 && lon <= 150) return true
      // Australia
      if (lat >= -45 && lat <= -10 && lon >= 110 && lon <= 155) return true
      // Filler pattern
      return (Math.sin(lat * 0.1) * Math.cos(lon * 0.1)) > -0.25
    }

    let pulse = 0

    const render = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const dpr = window.devicePixelRatio || 1

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr
        canvas.height = height * dpr
      }

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      const sphereRadius = Math.min(width, height) * 0.42

      if (!isDraggingRef.current) {
        rotationRef.current.y += autoRotateSpeed
      }

      const rotX = rotationRef.current.x
      const rotY = rotationRef.current.y

      // Ambient radial glow behind globe
      const glowGrad = ctx.createRadialGradient(cx, cy, sphereRadius * 0.2, cx, cy, sphereRadius * 1.35)
      glowGrad.addColorStop(0, 'rgba(0, 117, 255, 0.25)')
      glowGrad.addColorStop(0.5, 'rgba(0, 180, 255, 0.12)')
      glowGrad.addColorStop(0.85, 'rgba(0, 117, 255, 0.04)')
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(cx, cy, sphereRadius * 1.35, 0, Math.PI * 2)
      ctx.fill()

      // Outer delicate neon orbit ring
      ctx.strokeStyle = 'rgba(0, 180, 255, 0.15)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, sphereRadius * 1.08, 0, Math.PI * 2)
      ctx.stroke()

      // Atmospheric latitude guide rings (tilted)
      ctx.strokeStyle = 'rgba(0, 117, 255, 0.12)'
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.ellipse(cx, cy, sphereRadius, sphereRadius * 0.32, rotX, 0, Math.PI * 2)
      ctx.stroke()

      pulse = (pulse + 0.04) % (Math.PI * 2)

      // Transform and sort points by Z depth
      const projected = []

      for (let i = 0; i < points.length; i++) {
        const p = points[i]

        // Rotation around Y
        const cosY = Math.cos(rotY)
        const sinY = Math.sin(rotY)
        const x1 = p.x * cosY - p.z * sinY
        const z1 = p.x * sinY + p.z * cosY

        // Rotation around X
        const cosX = Math.cos(rotX)
        const sinX = Math.sin(rotX)
        const y2 = p.y * cosX - z1 * sinX
        const z2 = p.y * sinX + z1 * cosX

        projected.push({
          x: cx + x1 * sphereRadius,
          y: cy + y2 * sphereRadius,
          z: z2,
          isLand: p.isLand,
          baseSize: p.baseSize,
        })
      }

      // Sort back-to-front
      projected.sort((a, b) => a.z - b.z)

      // Render dots
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i]
        const isFront = p.z > 0
        const depthFactor = (p.z + 1) / 2 // 0 to 1

        let alpha
        let radius

        if (isFront) {
          alpha = p.isLand ? 0.3 + depthFactor * 0.7 : 0.15 + depthFactor * 0.35
          radius = p.isLand ? p.baseSize * (0.8 + depthFactor * 0.7) : p.baseSize * 0.8
          ctx.fillStyle = p.isLand
            ? `rgba(0, 212, 255, ${alpha})`
            : `rgba(0, 117, 255, ${alpha * 0.8})`
        } else {
          alpha = (1 - Math.abs(p.z)) * 0.12
          radius = p.baseSize * 0.65
          ctx.fillStyle = `rgba(0, 117, 255, ${alpha})`
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.6, radius), 0, Math.PI * 2)
        ctx.fill()
      }

      // Project and draw pulsating hotspots
      for (let i = 0; i < hotspots.length; i++) {
        const h = hotspots[i]

        const cosY = Math.cos(rotY)
        const sinY = Math.sin(rotY)
        const x1 = h.x * cosY - h.z * sinY
        const z1 = h.x * sinY + h.z * cosY

        const cosX = Math.cos(rotX)
        const sinX = Math.sin(rotX)
        const y2 = h.y * cosX - z1 * sinX
        const z2 = h.y * sinX + z1 * cosX

        if (z2 > 0) {
          const px = cx + x1 * sphereRadius
          const py = cy + y2 * sphereRadius
          const depthAlpha = z2

          // Outer glowing pulse ring
          const pulseSize = 4 + Math.sin(pulse) * 4
          ctx.strokeStyle = `rgba(0, 230, 255, ${depthAlpha * 0.6})`
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.arc(px, py, pulseSize + 2, 0, Math.PI * 2)
          ctx.stroke()

          // Inner solid glowing dot
          ctx.fillStyle = '#00f0ff'
          ctx.shadowColor = '#00e5ff'
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(px, py, 2.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      ctx.restore()
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const handleMouseDown = (e) => {
    isDraggingRef.current = true
    lastMousePosRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return
    const deltaX = e.clientX - lastMousePosRef.current.x
    const deltaY = e.clientY - lastMousePosRef.current.y

    rotationRef.current.y += deltaX * 0.008
    rotationRef.current.x = Math.max(-0.8, Math.min(0.8, rotationRef.current.x - deltaY * 0.006))

    lastMousePosRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={(e) => {
        isDraggingRef.current = true
        lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }}
      onTouchMove={(e) => {
        if (!isDraggingRef.current) return
        const deltaX = e.touches[0].clientX - lastMousePosRef.current.x
        const deltaY = e.touches[0].clientY - lastMousePosRef.current.y
        rotationRef.current.y += deltaX * 0.008
        rotationRef.current.x = Math.max(-0.8, Math.min(0.8, rotationRef.current.x - deltaY * 0.006))
        lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }}
      onTouchEnd={() => {
        isDraggingRef.current = false
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ minHeight: '260px' }}
      />
      {/* Floating subtle helper label */}
      <div className="absolute bottom-3 right-3 pointer-events-none px-2.5 py-1 rounded-full bg-navy-900/60 border border-white/10 text-[10px] text-cyan-400 font-mono tracking-wider backdrop-blur-md">
        GLOBAL NODES • LIVE
      </div>
    </div>
  )
}
