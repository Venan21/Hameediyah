import { useSvgId } from '../lib/svg'

const CURRIES = ['#B5491F', '#7A3B12', '#E0A12A', '#8F2214', '#C96A24', '#5B3A1A']
const TRAYS = [
  ['#F7F4EA', '#FFFFFF'],
  ['#C87A2B', '#E9A24C'],
  ['#3D7A35', '#6AA553'],
  ['#A33C1A', '#D4652E'],
  ['#E9C56A', '#F6DC8E'],
]

export default function Counter({ className }) {
  const id = useSvgId('counter')
  return (
    <svg className={className} viewBox="0 0 640 440" role="img" aria-label="The Hameediyah counter with a row of steaming curry pots and trays of sides">
      <defs>
        <linearGradient id={`${id}-pot`} x1="0" x2="1">
          <stop offset="0" stopColor="#8D8F8C" />
          <stop offset=".45" stopColor="#EEF0EC" />
          <stop offset="1" stopColor="#7D7F7B" />
        </linearGradient>
        <pattern id={`${id}-tiles`} width="44" height="44" patternUnits="userSpaceOnUse">
          <rect width="44" height="44" fill="#FFFFFF" />
          <path d="M22 4 L40 22 L22 40 L4 22Z" fill="#2E8B3E" opacity=".9" />
          <path d="M22 12 L32 22 L22 32 L12 22Z" fill="#F6D31C" />
          <circle cx="22" cy="22" r="3" fill="#14532D" />
          <path d="M0 0 h44 v44" fill="none" stroke="#DCE8D2" strokeWidth="1.4" />
        </pattern>
      </defs>
      <rect width="640" height="440" fill={`url(#${id}-tiles)`} />
      <rect width="640" height="74" fill="#14532D" />
      <rect y="70" width="640" height="6" fill="#F6D31C" />
      <text x="320" y="49" textAnchor="middle" fontFamily="Zilla Slab, Georgia, serif" fontWeight="700" fontSize="30" letterSpacing="5" fill="#F6D31C">
        NASI KANDAR
      </text>
      <rect y="246" width="640" height="194" fill="#1F3A24" />
      <rect y="240" width="640" height="14" fill="#C9D9A8" />
      {CURRIES.map((c, i) => {
        const x = 58 + i * 105
        return (
          <g key={i}>
            <rect x={x - 42} y="150" width="84" height="96" fill={`url(#${id}-pot)`} />
            <ellipse cx={x} cy="150" rx="42" ry="12" fill="#D6D7D3" />
            <ellipse cx={x} cy="152" rx="36" ry="9" fill={c} />
            <ellipse cx={x - 10} cy="150" rx="10" ry="2.4" fill="#F3B256" opacity=".6" />
            <g className="steam" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity=".85">
              <path d={`M${x - 8} 140 q-7 -12 0 -24 q7 -12 0 -24`} />
              <path d={`M${x + 8} 140 q7 -12 0 -24 q-7 -12 0 -24`} />
            </g>
          </g>
        )
      })}
      {TRAYS.map(([base, dot], i) => {
        const x = 36 + i * 122
        return (
          <g key={i}>
            <rect x={x} y="290" width="104" height="50" rx="6" fill="#C2C3BF" />
            <rect x={x + 6} y="294" width="92" height="38" rx="4" fill={base} />
            {Array.from({ length: 6 }, (_, k) => (
              <circle key={k} cx={x + 18 + k * 14} cy={304 + (k % 2) * 14} r="7" fill={dot} />
            ))}
          </g>
        )
      })}
      <rect y="400" width="640" height="40" fill="#142A19" />
    </svg>
  )
}
