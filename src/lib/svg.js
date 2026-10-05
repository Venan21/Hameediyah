import { useId } from 'react'

export function useSvgId(prefix) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
}

export function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function smoothPath(points, closed = false) {
  const n = points.length
  const at = (i) => (closed ? points[(i + n) % n] : points[Math.max(0, Math.min(n - 1, i))])
  let d = `M${points[0][0]} ${points[0][1]}`
  const last = closed ? n : n - 1
  for (let i = 0; i < last; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return closed ? `${d}Z` : d
}

// GSAP's SVG transform-origin handling is bbox-relative; driving the attribute directly
// keeps pivots (vessel lips, plate bases) exactly where the artwork defines them.
export function svgRig(el, init) {
  const p = { x: 0, y: 0, r: 0, px: 0, py: 0, sx: 1, sy: 1, ...init }
  const apply = () => {
    el.setAttribute(
      'transform',
      `translate(${p.x} ${p.y}) rotate(${p.r} ${p.px} ${p.py}) scale(${p.sx} ${p.sy})`,
    )
    if ('o' in p) el.style.opacity = p.o
  }
  apply()
  return { p, apply }
}
