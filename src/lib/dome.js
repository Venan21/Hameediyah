import { mulberry32 } from './svg'

export function domePath(w, h, seed = 7, bump = 3) {
  const rand = mulberry32(seed)
  const pts = []
  const n = 34
  for (let i = 0; i <= n; i++) {
    const t = Math.PI - (i / n) * Math.PI
    const r = i === 0 || i === n ? 0 : (rand() - 0.3) * bump
    const x = (w + r) * Math.cos(t)
    const y = -(h + r) * Math.pow(Math.sin(t), 0.85)
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return `M${pts.join(' L')} A${w} ${h * 0.25} 0 0 1 ${-w} 0Z`
}

export function domeSurfacePoint(w, h, u, depth = 0) {
  const t = Math.PI - u * Math.PI
  return {
    x: w * Math.cos(t) * (1 - depth * 0.4),
    y: -h * Math.pow(Math.sin(t), 0.85) * (1 - depth) + depth * h * 0.18,
  }
}
