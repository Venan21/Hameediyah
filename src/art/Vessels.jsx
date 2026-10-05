import { useSvgId } from '../lib/svg'

// Resting spots in basket-local space (origin = centre of the basket rim).
export const STACK = {
  tiers: [
    { x: -106, y: -58 },
    { x: -106, y: -104 },
    { x: -106, y: -150 },
  ],
  pot: { x: 34, y: -102 },
  lid: { x: 80, y: -100 },
}

export function Basket() {
  const id = useSvgId('basket')
  return (
    <g>
      <defs>
        <pattern id={`${id}-weave`} width="20" height="14" patternUnits="userSpaceOnUse">
          <rect width="20" height="14" fill="#7A4A1C" />
          <rect x="1" y="1" width="8" height="5" rx="2.5" fill="#D8A458" />
          <rect x="11" y="1" width="8" height="5" rx="2.5" fill="#C78D3E" />
          <rect x="-4" y="8" width="8" height="5" rx="2.5" fill="#C78D3E" />
          <rect x="6" y="8" width="8" height="5" rx="2.5" fill="#D8A458" />
          <rect x="16" y="8" width="8" height="5" rx="2.5" fill="#C78D3E" />
          <rect x="2" y="1.6" width="5" height="1.4" rx=".7" fill="#F2CF8E" opacity=".8" />
          <rect x="7" y="8.6" width="5" height="1.4" rx=".7" fill="#F2CF8E" opacity=".8" />
        </pattern>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2B1405" stopOpacity=".55" />
          <stop offset=".3" stopColor="#2B1405" stopOpacity="0" />
          <stop offset=".7" stopColor="#2B1405" stopOpacity="0" />
          <stop offset="1" stopColor="#2B1405" stopOpacity=".6" />
        </linearGradient>
        <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8C5A2E" />
          <stop offset="1" stopColor="#5A3418" />
        </linearGradient>
      </defs>
      <path d="M-150 0 L-118 130 A118 24 0 0 0 118 130 L150 0 A150 30 0 0 1 -150 0Z" fill={`url(#${id}-weave)`} />
      <path d="M-150 0 L-118 130 A118 24 0 0 0 118 130 L150 0 A150 30 0 0 1 -150 0Z" fill={`url(#${id}-shade)`} />
      <path d="M-118 130 A118 24 0 0 0 118 130" fill="none" stroke="#5A3212" strokeWidth="8" />
      <ellipse cx="0" cy="0" rx="150" ry="30" fill="none" stroke="#A8702F" strokeWidth="13" />
      <ellipse cx="0" cy="0" rx="150" ry="30" fill="none" stroke="#E0B067" strokeWidth="4" strokeDasharray="9 7" />
      <ellipse cx="0" cy="-2" rx="142" ry="28" fill="#4A2A12" />
      <ellipse cx="0" cy="-8" rx="142" ry="28" fill={`url(#${id}-wood)`} />
      <ellipse cx="0" cy="-10" rx="136" ry="25" fill="#9C6838" />
      <g fill="none" stroke="#7A4A22" strokeWidth="1.4" opacity=".6">
        <ellipse cx="0" cy="-10" rx="100" ry="17" />
        <ellipse cx="0" cy="-10" rx="60" ry="10" />
      </g>
    </g>
  )
}

const TIER_FILLS = {
  rice: (
    <g>
      <path d="M8 2 C14 -14 78 -14 84 2Z" fill="#FBF8EE" />
      <g fill="#fff" stroke="#D6CFBA" strokeWidth=".5">
        <ellipse cx="30" cy="-4" rx="4" ry="1.5" transform="rotate(-20 30 -4)" />
        <ellipse cx="50" cy="-7" rx="4" ry="1.5" transform="rotate(14 50 -7)" />
        <ellipse cx="64" cy="-2" rx="4" ry="1.5" transform="rotate(-36 64 -2)" />
        <ellipse cx="42" cy="0" rx="4" ry="1.5" />
      </g>
    </g>
  ),
  okra: (
    <g>
      <ellipse cx="46" cy="1" rx="40" ry="8" fill="#2F6E1E" />
      <g fill="#7DBB45">
        <ellipse cx="30" cy="-1" rx="7" ry="3" /><ellipse cx="52" cy="2" rx="8" ry="3" /><ellipse cx="66" cy="-1" rx="6" ry="2.6" />
      </g>
      <g fill="#D6E9A4"><circle cx="40" cy="-2" r="2.6" /><circle cx="60" cy="3" r="2.4" /></g>
    </g>
  ),
  gravy: (
    <g>
      <ellipse cx="46" cy="1" rx="41" ry="8.4" fill="#9C3A12" />
      <ellipse cx="36" cy="-1" rx="12" ry="2.4" fill="#E39A3A" opacity=".7" />
    </g>
  ),
}

export function TiffinTier({ fill = 'rice' }) {
  const id = useSvgId('tier')
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7C8384" />
          <stop offset=".22" stopColor="#E9EDEC" />
          <stop offset=".34" stopColor="#FFFFFF" />
          <stop offset=".6" stopColor="#B5BCBC" />
          <stop offset="1" stopColor="#62696A" />
        </linearGradient>
      </defs>
      <path d="M0 0 L0 46 A46 11 0 0 0 92 46 L92 0 A46 11 0 0 1 0 0Z" fill={`url(#${id}-steel)`} />
      <g fill="none" strokeWidth="1.6">
        <path d="M0 8 A46 11 0 0 0 92 8" stroke="#8A9192" />
        <path d="M0 10 A46 11 0 0 0 92 10" stroke="#FFFFFF" opacity=".7" />
        <path d="M0 38 A46 11 0 0 0 92 38" stroke="#8A9192" />
      </g>
      <rect x="-5" y="16" width="7" height="16" rx="2" fill="#9AA1A1" />
      <rect x="90" y="16" width="7" height="16" rx="2" fill="#6F7677" />
      <ellipse cx="46" cy="0" rx="46" ry="11" fill="#D9DEDD" stroke="#868D8E" strokeWidth="1.4" />
      <ellipse cx="46" cy="1" rx="41" ry="8.6" fill="#59605F" />
      {TIER_FILLS[fill]}
    </g>
  )
}

export function TiffinFrame() {
  return (
    <g fill="none" strokeLinecap="round">
      <path d="M-110 -6 L-110 -168 M-10 -6 L-10 -168" stroke="#7E8586" strokeWidth="5" />
      <path d="M-110 -168 C-110 -214 -10 -214 -10 -168" stroke="#A3AAAA" strokeWidth="6" />
      <path d="M-84 -201 L-36 -201" stroke="#1F2421" strokeWidth="11" />
    </g>
  )
}

export function ClayPot() {
  const id = useSvgId('pot')
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-clay`} cx="35%" cy="35%" r="75%">
          <stop offset="0" stopColor="#DE8A4C" />
          <stop offset=".5" stopColor="#A9501F" />
          <stop offset="1" stopColor="#64270C" />
        </radialGradient>
      </defs>
      <path d="M4 6 C-2 14 -18 26 -18 50 C-18 78 12 92 46 92 C80 92 110 78 110 50 C110 26 94 14 88 6Z" fill={`url(#${id}-clay)`} />
      <path d="M-14 38 C20 50 72 50 106 38" fill="none" stroke="#6E2C10" strokeWidth="2" opacity=".55" />
      <path d="M-12 44 C20 56 72 56 104 44" fill="none" stroke="#F0B07A" strokeWidth="1.2" strokeDasharray="2 5" opacity=".7" />
      <path d="M-4 30 C2 20 10 14 18 12" fill="none" stroke="#FFD2A8" strokeWidth="5" strokeLinecap="round" opacity=".45" />
      <ellipse cx="46" cy="2" rx="48" ry="10" fill="#B85C2A" stroke="#7A3314" strokeWidth="1.6" />
      <ellipse cx="46" cy="3" rx="40" ry="7" fill="#3A1408" />
    </g>
  )
}

export function ClayLid() {
  const id = useSvgId('lid')
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-clay`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D9844A" />
          <stop offset="1" stopColor="#7A3314" />
        </linearGradient>
      </defs>
      <path d="M-50 2 C-40 -8 -20 -26 -6 -30 L6 -30 C20 -26 40 -8 50 2 C30 10 -30 10 -50 2Z" fill={`url(#${id}-clay)`} />
      <ellipse cx="0" cy="-32" rx="10" ry="6" fill="#8E3E18" />
      <path d="M-34 -6 C-24 -16 -14 -22 -6 -24" fill="none" stroke="#FFD2A8" strokeWidth="3" strokeLinecap="round" opacity=".5" />
    </g>
  )
}

export function VesselStack() {
  return (
    <g>
      <Basket />
      <TiffinFrame />
      {STACK.tiers.map((t, i) => (
        <g key={i} transform={`translate(${t.x} ${t.y})`}>
          <TiffinTier fill={['gravy', 'okra', 'rice'][i]} />
        </g>
      ))}
      <g transform={`translate(${STACK.pot.x} ${STACK.pot.y})`}>
        <ClayPot />
      </g>
      <g transform={`translate(${STACK.lid.x} ${STACK.lid.y})`}>
        <ClayLid />
      </g>
    </g>
  )
}
