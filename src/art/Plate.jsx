import { useSvgId } from '../lib/svg'

const SPECKS = [
  [-210, -40], [-150, 70], [-60, -95], [40, 88], [150, -70], [230, 30], [-250, 20], [95, -100],
  [-30, 102], [200, 80], [-180, -78], [270, -20], [-110, 95], [60, -60], [-90, 40], [130, 30],
]

export default function Plate({ x = 0, y = 0, scale = 1 }) {
  const id = useSvgId('plate')
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <defs>
        <radialGradient id={`${id}-glaze`} cx="40%" cy="30%" r="80%">
          <stop offset="0" stopColor="#FBE46A" />
          <stop offset=".55" stopColor="#F3CF34" />
          <stop offset="1" stopColor="#DDAE17" />
        </radialGradient>
        <linearGradient id={`${id}-well`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9A514" />
          <stop offset=".35" stopColor="#F0C92E" />
          <stop offset="1" stopColor="#F9DE58" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3FA14F" />
          <stop offset=".5" stopColor="#23773A" />
          <stop offset="1" stopColor="#124A27" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={`${id}-shine`}>
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <ellipse cx="10" cy="40" rx="340" ry="118" fill="#2c3a1e" opacity=".22" filter={`url(#${id}-soft)`} />
      <ellipse cx="0" cy="16" rx="330" ry="125" fill="#0E3F21" />
      <ellipse cx="0" cy="0" rx="330" ry="125" fill={`url(#${id}-rim)`} />
      <ellipse cx="0" cy="0" rx="317" ry="119" fill={`url(#${id}-glaze)`} />
      <ellipse cx="0" cy="2" rx="300" ry="111" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity=".9" />
      <ellipse cx="0" cy="8" rx="248" ry="90" fill={`url(#${id}-well)`} />
      <path d="M-248 8 A248 90 0 0 1 248 8 A248 84 0 0 0 -248 8Z" fill="#A87A0A" opacity=".28" />
      <g fill="#8a6a0c" opacity=".35">
        {SPECKS.map(([sx, sy], i) => (
          <circle key={i} cx={sx} cy={sy} r={i % 3 === 0 ? 1.6 : 1} />
        ))}
      </g>
      <path
        d="M-262 -52 C-200 -100 -90 -116 10 -116"
        fill="none"
        stroke="#FFFBE0"
        strokeWidth="9"
        strokeLinecap="round"
        opacity=".75"
        filter={`url(#${id}-shine)`}
      />
      <path d="M214 74 C250 58 276 38 290 18" fill="none" stroke="#FFFBE0" strokeWidth="5" strokeLinecap="round" opacity=".5" filter={`url(#${id}-shine)`} />
    </g>
  )
}
