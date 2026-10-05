import { useSvgId, mulberry32 } from '../lib/svg'

const RICE_TONES = {
  white: { base: '#FBF8EE', grain: '#FFFFFF', edge: '#D6CFBA', alt: '#F3EEDD' },
  biryani: { base: '#E9A92E', grain: '#F7C752', edge: '#C0821A', alt: '#FFF4D6' },
}

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

export function RiceMound({ w = 135, h = 135, tone = 'white', seed = 7 }) {
  const id = useSvgId('rice')
  const c = RICE_TONES[tone]
  const d = domePath(w, h, seed)
  return (
    <g>
      <defs>
        <pattern id={`${id}-grain`} width="30" height="17" patternUnits="userSpaceOnUse">
          <rect width="30" height="17" fill={c.base} />
          <g fill={c.grain} stroke={c.edge} strokeWidth=".6">
            <ellipse cx="6" cy="4" rx="5.6" ry="2" transform="rotate(-24 6 4)" />
            <ellipse cx="19" cy="5" rx="5.4" ry="1.9" transform="rotate(32 19 5)" />
            <ellipse cx="12" cy="11" rx="5.6" ry="2" transform="rotate(8 12 11)" />
            <ellipse cx="25" cy="13" rx="5" ry="1.9" transform="rotate(-50 25 13)" />
            <ellipse cx="2" cy="14" rx="4.6" ry="1.8" transform="rotate(60 2 14)" />
          </g>
          <ellipse cx="27" cy="2" rx="4" ry="1.6" fill={c.alt} transform="rotate(14 27 2)" />
        </pattern>
        <radialGradient id={`${id}-shade`} cx="38%" cy="22%" r="85%">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".55" />
          <stop offset=".5" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#5C4A1A" stopOpacity=".38" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-30%" y="-100%" width="160%" height="300%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <ellipse cx="8" cy="10" rx={w * 0.98} ry={h * 0.2} fill="#6b4c06" opacity=".35" filter={`url(#${id}-blur)`} />
      <path d={d} fill={`url(#${id}-grain)`} />
      <path d={d} fill={`url(#${id}-shade)`} />
    </g>
  )
}

export function RiceGrain({ tone = 'white' }) {
  const c = RICE_TONES[tone]
  return <ellipse rx="4.8" ry="1.8" fill={c.grain} stroke={c.edge} strokeWidth=".6" />
}

export function GravyOnRice({ w = 135, h = 135, seed = 7, clipHeight }) {
  const id = useSvgId('gravy')
  return (
    <g>
      <defs>
        <clipPath id={`${id}-dome`}>
          <path d={domePath(w, h, seed)} />
        </clipPath>
        <clipPath id={`${id}-pour`}>
          <rect className="gravy-reveal" x={-w - 10} y={-h - 12} width={w * 2 + 20} height={clipHeight ?? h + 50} />
        </clipPath>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C9581F" />
          <stop offset=".6" stopColor="#A43E14" />
          <stop offset="1" stopColor="#7C260C" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${id}-pour)`}>
        <g clipPath={`url(#${id}-dome)`}>
          <path
            d="M-70 -150 C-10 -160 70 -150 110 -100 C130 -70 140 -30 140 10 L118 10 C114 -10 108 -24 100 -30 C98 -6 94 6 88 14 L76 14 C74 -6 70 -24 62 -36 C46 -48 28 -54 12 -54 C4 -36 -4 -28 -12 -24 C-18 -38 -26 -48 -34 -56 C-52 -66 -72 -84 -84 -104 C-92 -124 -86 -146 -70 -150Z"
            fill={`url(#${id}-fill)`}
          />
          <g fill="#E9A33C" opacity=".85">
            <ellipse cx="20" cy="-110" rx="7" ry="2.6" />
            <ellipse cx="62" cy="-86" rx="5" ry="2" />
            <ellipse cx="-28" cy="-96" rx="4" ry="1.6" />
            <ellipse cx="96" cy="-52" rx="4" ry="1.6" />
          </g>
          <g fill="#5E1C08">
            <circle cx="-8" cy="-104" r="3" />
            <circle cx="44" cy="-118" r="2.4" />
            <circle cx="80" cy="-70" r="2.8" />
            <circle cx="30" cy="-78" r="2" />
          </g>
          <path d="M-46 -124 C-10 -136 40 -132 74 -108" fill="none" stroke="#FFE2B8" strokeWidth="4" strokeLinecap="round" opacity=".55" />
        </g>
      </g>
    </g>
  )
}

export function GravyPool() {
  const id = useSvgId('pool')
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-fill`} cx="45%" cy="40%" r="70%">
          <stop offset="0" stopColor="#C2501B" />
          <stop offset="1" stopColor="#86300F" />
        </radialGradient>
      </defs>
      <path
        d="M-150 -4 C-160 20 -96 38 -24 36 C40 42 124 38 156 14 C176 -2 146 -26 92 -24 C40 -32 -42 -28 -104 -24 C-130 -22 -144 -14 -150 -4Z"
        fill={`url(#${id}-fill)`}
      />
      <g fill="#EBA43F" opacity=".8">
        <ellipse cx="-60" cy="14" rx="9" ry="2.6" />
        <ellipse cx="40" cy="20" rx="7" ry="2.2" />
        <ellipse cx="110" cy="6" rx="5" ry="1.8" />
      </g>
      <path d="M-110 8 C-60 22 20 26 90 18" fill="none" stroke="#FFE0B0" strokeWidth="3" strokeLinecap="round" opacity=".5" />
    </g>
  )
}

export function LambShank() {
  const id = useSvgId('lamb')
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-meat`} cx="40%" cy="30%" r="75%">
          <stop offset="0" stopColor="#C2682F" />
          <stop offset=".45" stopColor="#8A3615" />
          <stop offset="1" stopColor="#4A170A" />
        </radialGradient>
        <linearGradient id={`${id}-bone`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBF4E4" />
          <stop offset="1" stopColor="#D5C29A" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <ellipse cx="-4" cy="44" rx="92" ry="16" fill="#3a1d05" opacity=".4" filter={`url(#${id}-shadow)`} />
      <path d="M46 -24 C78 -32 108 -36 126 -38 L132 -14 C112 -10 84 -4 52 8Z" fill={`url(#${id}-bone)`} stroke="#BFA77A" strokeWidth="1.2" />
      <circle cx="136" cy="-36" r="15" fill={`url(#${id}-bone)`} stroke="#BFA77A" strokeWidth="1.2" />
      <circle cx="140" cy="-12" r="13" fill={`url(#${id}-bone)`} stroke="#BFA77A" strokeWidth="1.2" />
      <ellipse cx="146" cy="-24" rx="5" ry="11" fill="#E8D7B4" opacity=".9" />
      <path
        d="M-88 4 C-92 -42 -48 -66 2 -60 C40 -56 62 -40 66 -22 C70 -6 66 14 54 26 C30 46 -10 52 -44 46 C-74 40 -86 26 -88 4Z"
        fill={`url(#${id}-meat)`}
      />
      <path d="M40 -46 C58 -36 70 -22 70 -6 C66 4 60 10 54 14 C58 -4 56 -24 40 -46Z" fill="#D9925A" opacity=".55" />
      <g fill="none" stroke="#3A1006" strokeWidth="2.2" strokeLinecap="round" opacity=".55">
        <path d="M-70 -14 C-50 -30 -20 -38 10 -36" />
        <path d="M-74 10 C-50 -4 -10 -12 28 -10" />
        <path d="M-60 30 C-30 22 6 18 40 8" />
        <path d="M-30 -48 C-10 -52 14 -50 34 -42" />
      </g>
      <g fill="none" stroke="#FFE6C8" strokeLinecap="round" opacity=".6">
        <path d="M-60 -26 C-40 -44 -12 -52 18 -48" strokeWidth="5" />
        <path d="M-20 -30 C0 -34 18 -32 30 -28" strokeWidth="3" />
      </g>
      <path d="M-80 22 C-70 40 -40 48 -6 48 C-10 54 -20 60 -28 60 C-46 58 -70 50 -80 22Z" fill="#7C260C" opacity=".85" />
      <g fill="#3D7A2B">
        <path d="M-16 -54 c6 -8 16 -6 16 2 c-6 6 -12 6 -16 -2z" />
        <path d="M6 -56 c8 -4 14 2 12 8 c-8 2 -12 -2 -12 -8z" />
      </g>
      <g fill="#C27A2E">
        <path d="M-40 -40 q6 -4 10 0 q-5 3 -10 0z" />
        <path d="M-2 -44 q6 -4 10 0 q-5 3 -10 0z" />
        <path d="M24 -36 q5 -4 9 0 q-4 3 -9 0z" />
      </g>
    </g>
  )
}

export function OkraPiece({ tip = false }) {
  const id = useSvgId('okra')
  const body = tip
    ? 'M-24 0 C-20 -8 -10 -10 -4 -10 L14 -9 C18 -8 18 8 14 9 L-4 10 C-10 10 -20 8 -24 0Z'
    : 'M-18 -8 C-20 -10 -14 -10 -10 -10 L14 -9 C18 -8 18 8 14 9 L-10 10 C-14 10 -20 10 -18 8 C-21 4 -21 -4 -18 -8Z'
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-skin`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6FB33A" />
          <stop offset=".5" stopColor="#3E8C27" />
          <stop offset="1" stopColor="#235D18" />
        </linearGradient>
      </defs>
      <path d={body} fill={`url(#${id}-skin)`} />
      <g fill="none" strokeLinecap="round">
        <path d="M-16 -4 L13 -4" stroke="#2A6A1C" strokeWidth="1.2" />
        <path d="M-17 3 L13 3" stroke="#2A6A1C" strokeWidth="1.2" />
        <path d="M-12 -7 L10 -7" stroke="#A6D86A" strokeWidth="1.4" opacity=".7" />
      </g>
      <ellipse cx="15" cy="0" rx="6" ry="9.5" fill="#D6E9A4" stroke="#3B7E25" strokeWidth="1.4" />
      <g stroke="#9DC46A" strokeWidth=".8">
        <path d="M15 0 L15 -7 M15 0 L20 -2 M15 0 L18 6 M15 0 L12 6 M15 0 L10 -2" />
      </g>
      <g fill="#FAFCEF">
        <circle cx="15" cy="-5.2" r="1.4" />
        <circle cx="18.6" cy="-1.6" r="1.4" />
        <circle cx="17.6" cy="3.6" r="1.4" />
        <circle cx="12.4" cy="3.6" r="1.4" />
        <circle cx="11.4" cy="-1.6" r="1.4" />
      </g>
      <g fill="#B7341A">
        <circle cx="-8" cy="-2" r="1.3" />
        <circle cx="4" cy="5" r="1.1" />
        <circle cx="-2" cy="-6" r="1" />
      </g>
      <circle cx="6" cy="-3" r="1.1" fill="#2B1A0A" />
    </g>
  )
}

export function CurryLeaf() {
  return (
    <g>
      <path d="M-16 0 C-10 -9 6 -10 16 0 C6 10 -10 9 -16 0Z" fill="#2C5A1B" />
      <path d="M-15 0 L15 0" stroke="#7FA145" strokeWidth="1" />
      <path d="M-8 -5 C-2 -8 6 -7 12 -2" fill="none" stroke="#9BC160" strokeWidth="1.4" opacity=".5" />
    </g>
  )
}

export function DriedChili() {
  return (
    <g>
      <path d="M-26 2 C-20 -8 4 -10 22 -4 C26 -2 26 4 22 5 C4 8 -16 8 -26 2Z" fill="#8E1B10" />
      <path d="M-18 -2 C-6 -7 8 -7 18 -3" fill="none" stroke="#E0654A" strokeWidth="2" strokeLinecap="round" opacity=".7" />
      <path d="M22 0 C28 -2 32 -6 34 -10" fill="none" stroke="#5B5A22" strokeWidth="2.6" strokeLinecap="round" />
    </g>
  )
}

export function ChiliFlake({ variant = 0 }) {
  const shapes = ['M-2 -2 L3 -1 L1 3 Z', 'M-2 -1 L2 -2 L2 2 L-1 2 Z', 'M-1 -2 L3 1 L-2 2 Z']
  return <path d={shapes[variant % 3]} fill={variant % 2 ? '#B92F17' : '#D4471F'} />
}

export function FriedChicken() {
  const id = useSvgId('fc')
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-crust`} cx="40%" cy="30%" r="75%">
          <stop offset="0" stopColor="#C2462A" />
          <stop offset=".5" stopColor="#8E2414" />
          <stop offset="1" stopColor="#4F1109" />
        </radialGradient>
      </defs>
      <path
        d="M-62 6 C-70 -30 -40 -56 -4 -54 C30 -56 60 -36 64 -8 C68 18 46 40 10 42 C-30 44 -58 34 -62 6Z"
        fill={`url(#${id}-crust)`}
      />
      <g fill="#5A1208" opacity=".7">
        <circle cx="-30" cy="-30" r="5" /><circle cx="10" cy="-36" r="4" /><circle cx="36" cy="-10" r="6" />
        <circle cx="-40" cy="10" r="5" /><circle cx="0" cy="20" r="4" /><circle cx="26" cy="22" r="3" />
      </g>
      <g fill="#E2754A" opacity=".55">
        <circle cx="-18" cy="-40" r="3" /><circle cx="20" cy="-24" r="2.4" /><circle cx="-46" cy="-12" r="2.6" />
      </g>
      <path d="M-20 -48 l6 -14 l4 12z M14 -46 l8 -12 l2 13z" fill="#2E5A1B" />
    </g>
  )
}

export function ChickenLeg({ tone = '#C77A3A' }) {
  const id = useSvgId('leg')
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-skin`} cx="40%" cy="30%" r="75%">
          <stop offset="0" stopColor="#F0B572" />
          <stop offset=".55" stopColor={tone} />
          <stop offset="1" stopColor="#7A3A14" />
        </radialGradient>
      </defs>
      <path d="M30 -10 L74 -26 L78 -12 L36 6Z" fill="#F2E6CC" stroke="#C9B48A" />
      <circle cx="80" cy="-24" r="9" fill="#F2E6CC" stroke="#C9B48A" />
      <circle cx="82" cy="-10" r="8" fill="#F2E6CC" stroke="#C9B48A" />
      <path
        d="M-70 4 C-74 -30 -40 -50 -6 -44 C22 -40 40 -24 42 -6 C44 14 24 34 -10 36 C-44 38 -66 28 -70 4Z"
        fill={`url(#${id}-skin)`}
      />
      <path d="M-50 -24 C-30 -38 -6 -40 16 -32" fill="none" stroke="#FFE8C4" strokeWidth="5" strokeLinecap="round" opacity=".55" />
      <path d="M-20 -8 l20 -4 M-30 12 l26 -6" stroke="#6A2E0E" strokeWidth="2.4" strokeLinecap="round" opacity=".55" />
    </g>
  )
}

export function RendangChunks() {
  const chunks = [
    [-40, -6, -8], [0, -14, 10], [38, -4, -16], [-18, 16, 20], [22, 18, 4], [-56, 18, 12],
  ]
  return (
    <g>
      <path d="M-80 10 C-80 -20 80 -26 80 6 C82 34 -78 40 -80 10Z" fill="#6B2C0E" opacity=".8" />
      {chunks.map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d="M-18 -10 L14 -14 L20 8 L-14 14Z" fill="#4A1C08" />
          <path d="M-18 -10 L14 -14 L12 -6 L-14 -2Z" fill="#7C3612" />
          <path d="M-12 -8 L8 -11" stroke="#C9874A" strokeWidth="2" strokeLinecap="round" opacity=".6" />
        </g>
      ))}
      <g fill="#C79A5A" opacity=".8">
        <circle cx="-26" cy="4" r="2" /><circle cx="12" cy="0" r="1.6" /><circle cx="48" cy="12" r="2" /><circle cx="-4" cy="26" r="1.6" />
      </g>
    </g>
  )
}

export function Murtabak() {
  const id = useSvgId('mtb')
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-crust`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2C46A" />
          <stop offset="1" stopColor="#C77E24" />
        </linearGradient>
      </defs>
      {[[-50, 4, -6], [24, -10, 8], [4, 26, 2]].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d="M-46 -22 L42 -26 L48 18 L-42 22Z" fill="#9A5A18" />
          <path d="M-46 -26 L42 -30 L46 12 L-42 16Z" fill={`url(#${id}-crust)`} />
          <path d="M-46 12 L46 8 L46 14 L-42 18Z" fill="#E7D9A8" />
          <g fill="#7A3A12"><circle cx="-20" cy="13" r="2" /><circle cx="6" cy="12" r="2.2" /><circle cx="28" cy="11" r="1.8" /></g>
          <g fill="#8E4A12" opacity=".5"><circle cx="-24" cy="-12" r="5" /><circle cx="12" cy="-4" r="6" /><circle cx="30" cy="-18" r="4" /></g>
        </g>
      ))}
    </g>
  )
}

export function KurmaPool() {
  return (
    <g>
      <path d="M-90 0 C-96 -26 -40 -36 10 -34 C60 -34 98 -20 94 4 C92 28 40 36 -10 34 C-60 32 -88 22 -90 0Z" fill="#E7C27A" />
      <path d="M-70 -10 C-30 -26 30 -26 70 -12" fill="none" stroke="#FFF2CC" strokeWidth="5" strokeLinecap="round" opacity=".6" />
      {[[-40, 0], [6, -8], [44, 6], [-8, 16]].map(([x, y], i) => (
        <path key={i} transform={`translate(${x} ${y})`} d="M-16 -8 C-8 -16 12 -14 16 -4 C18 8 4 12 -6 10 C-16 8 -20 2 -16 -8Z" fill="#9A5A2A" />
      ))}
      <g fill="#F4A23A"><circle cx="-60" cy="10" r="3" /><circle cx="70" cy="-6" r="2.4" /></g>
    </g>
  )
}
