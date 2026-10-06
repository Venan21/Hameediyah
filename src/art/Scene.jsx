import { useSvgId } from '../lib/svg'
import { domePath } from '../lib/dome'
import { TEX } from './photos'

export function PhotoRice({ w = 135, h = 135, seed = 7 }) {
  const id = useSvgId('rice')
  const d = domePath(w, h, seed)
  return (
    <g>
      <defs>
        <clipPath id={`${id}-dome`}>
          <path d={d} />
        </clipPath>
        <radialGradient id={`${id}-shade`} cx="40%" cy="20%" r="85%">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".18" />
          <stop offset=".6" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#4A3A12" stopOpacity=".28" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-30%" y="-100%" width="160%" height="300%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <ellipse cx="8" cy="10" rx={w * 0.98} ry={h * 0.2} fill="#5B4206" opacity=".35" filter={`url(#${id}-blur)`} />
      <g clipPath={`url(#${id}-dome)`}>
        <image href={TEX.rice} x={-w - 12} y={-h - 10} width={w * 2 + 24} height={h + 52} preserveAspectRatio="none" />
        <path d={d} fill={`url(#${id}-shade)`} />
      </g>
    </g>
  )
}

export function RiceGrain() {
  return <ellipse rx="4.8" ry="1.8" fill="#FFFDF6" stroke="#D3CCB6" strokeWidth=".6" />
}

const GRAVY_DRAPE =
  'M-70 -150 C-10 -160 70 -150 110 -100 C130 -70 140 -30 140 10 L118 10 C114 -10 108 -24 100 -30 C98 -6 94 6 88 14 L76 14 C74 -6 70 -24 62 -36 C46 -48 28 -54 12 -54 C4 -36 -4 -28 -12 -24 C-18 -38 -26 -48 -34 -56 C-52 -66 -72 -84 -84 -104 C-92 -124 -86 -146 -70 -150Z'

function SoftCurry({ id, d, box, edge = 2.5 }) {
  const [x, y, w, h] = box
  return (
    <g>
      <defs>
        <filter id={`${id}-edge`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation={edge} />
        </filter>
        <filter id={`${id}-rim`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x={x - 20} y={y - 20} width={w + 40} height={h + 40}>
          <path d={d} fill="#fff" filter={`url(#${id}-edge)`} />
        </mask>
        <clipPath id={`${id}-clip`}>
          <path d={d} />
        </clipPath>
      </defs>
      <g mask={`url(#${id}-mask)`}>
        <image href={TEX.curry} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" />
        <path d={d} fill="none" stroke="#4A1405" strokeWidth="14" opacity=".45" clipPath={`url(#${id}-clip)`} filter={`url(#${id}-rim)`} />
      </g>
    </g>
  )
}

export function PhotoGravyOnRice({ w = 135, h = 135, seed = 7 }) {
  const id = useSvgId('gravy')
  return (
    <g>
      <defs>
        <clipPath id={`${id}-dome`}>
          <path d={domePath(w, h, seed)} />
        </clipPath>
        <clipPath id={`${id}-pour`}>
          <rect className="gravy-reveal" x={-w - 10} y={-h - 12} width={w * 2 + 20} height={h + 50} />
        </clipPath>
        <radialGradient id={`${id}-shade`} cx="35%" cy="15%" r="90%">
          <stop offset="0" stopColor="#FFE9C8" stopOpacity=".22" />
          <stop offset=".55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#2A0C02" stopOpacity=".45" />
        </radialGradient>
      </defs>
      <g clipPath={`url(#${id}-pour)`}>
        <g clipPath={`url(#${id}-dome)`}>
          <SoftCurry id={`${id}-c`} d={GRAVY_DRAPE} box={[-90, -160, 235, 180]} />
          <path d={GRAVY_DRAPE} fill={`url(#${id}-shade)`} />
          <path d="M-46 -124 C-10 -136 40 -132 74 -108" fill="none" stroke="#FFE2B8" strokeWidth="3" strokeLinecap="round" opacity=".4" />
        </g>
      </g>
    </g>
  )
}

export function PhotoGravyPool() {
  const id = useSvgId('pool')
  const d = 'M-150 -4 C-160 20 -96 38 -24 36 C40 42 124 38 156 14 C176 -2 146 -26 92 -24 C40 -32 -42 -28 -104 -24 C-130 -22 -144 -14 -150 -4Z'
  return (
    <g>
      <SoftCurry id={id} d={d} box={[-160, -32, 340, 76]} edge={3.5} />
      <path d="M-110 8 C-60 22 20 26 90 18" fill="none" stroke="#FFE0B0" strokeWidth="2.4" strokeLinecap="round" opacity=".4" />
    </g>
  )
}

export function ChiliFlake({ variant = 0 }) {
  const shapes = ['M-2 -2 L3 -1 L1 3 Z', 'M-2 -1 L2 -2 L2 2 L-1 2 Z', 'M-1 -2 L3 1 L-2 2 Z']
  return <path d={shapes[variant % 3]} fill={variant % 2 ? '#B92F17' : '#D4471F'} />
}
