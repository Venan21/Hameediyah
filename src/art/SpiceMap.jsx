import { forwardRef } from 'react'
import { useSvgId, smoothPath } from '../lib/svg'

const INDIA = [
  [170, 72], [190, 90], [200, 118], [226, 140], [258, 152], [290, 160], [306, 150], [336, 140], [346, 156],
  [330, 176], [318, 196], [304, 186], [296, 200], [284, 214], [270, 232], [252, 250], [236, 272], [222, 300],
  [212, 330], [206, 360], [196, 392], [184, 420], [176, 432], [166, 414], [158, 384], [150, 350], [142, 312],
  [134, 276], [126, 246], [118, 226], [104, 214], [90, 206], [78, 196], [84, 182], [98, 176], [110, 160],
  [126, 138], [140, 116], [150, 96],
]

const PENINSULA = [
  [470, 150], [486, 156], [492, 190], [496, 226], [512, 252], [530, 272], [548, 300], [566, 334], [584, 372],
  [598, 410], [600, 440], [586, 452], [566, 444], [546, 420], [528, 392], [510, 356], [494, 320], [486, 290],
  [482, 262], [474, 232], [466, 200], [462, 170],
]

export const ROUTE_D = 'M200 396 C262 410 320 388 376 344 C410 316 440 288 468 270'

const SpiceMap = forwardRef(function SpiceMap({ className }, ref) {
  const id = useSvgId('map')
  return (
    <svg ref={ref} className={className} viewBox="0 0 640 560" role="img" aria-label="Hand-drawn map on a flatbread tracing a route from Chittarkottai in India, past the steamer SS Rajula, to Penang">
      <defs>
        <linearGradient id={`${id}-bread`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F1D394" />
          <stop offset=".6" stopColor="#E4B76C" />
          <stop offset="1" stopColor="#D29C4F" />
        </linearGradient>
        <filter id={`${id}-toast`}>
          <feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="4" seed="11" />
          <feColorMatrix values="0 0 0 0 .55  0 0 0 0 .3  0 0 0 0 .1  0 0 0 -2.4 1.25" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <filter id={`${id}-crust`} x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={`${id}-ink`}>
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2" />
        </filter>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#2B3A12" floodOpacity=".28" />
        </filter>
        <clipPath id={`${id}-shape`}>
          <path d="M40 30 C200 18 440 22 600 34 C616 140 618 340 606 468 C440 480 200 482 36 470 C24 340 22 150 40 30Z" />
        </clipPath>
        <mask id={`${id}-route`}>
          <path className="route-reveal" d={ROUTE_D} pathLength="1" fill="none" stroke="#fff" strokeWidth="14" strokeDasharray="1 1" strokeDashoffset="1" />
        </mask>
      </defs>

      <rect x="309" y="470" width="22" height="86" rx="4" fill="#9AA09E" />
      <rect x="313" y="470" width="5" height="86" fill="#E6E9E7" opacity=".7" />

      <g filter={`url(#${id}-shadow)`}>
        <path d="M40 30 C200 18 440 22 600 34 C616 140 618 340 606 468 C440 480 200 482 36 470 C24 340 22 150 40 30Z" fill={`url(#${id}-bread)`} />
      </g>
      <g clipPath={`url(#${id}-shape)`}>
        <rect width="640" height="500" filter={`url(#${id}-toast)`} opacity=".75" />
        <path d="M40 30 C200 18 440 22 600 34 C616 140 618 340 606 468 C440 480 200 482 36 470 C24 340 22 150 40 30Z" fill="none" stroke="#A8662A" strokeWidth="26" opacity=".5" filter={`url(#${id}-crust)`} />
        <g fill="#5C6B2A" opacity=".55">
          {[[90, 60], [210, 120], [330, 220], [520, 90], [420, 420], [120, 450], [560, 300], [260, 300], [380, 120], [480, 380], [70, 330], [300, 450]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 ? 1.6 : 2.4} />
          ))}
        </g>
      </g>

      <g filter={`url(#${id}-ink)`} fill="none" stroke="#4B2A74" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d={smoothPath(INDIA, true)} />
        <path d={smoothPath(PENINSULA, true)} />
        <path d="M468 268 c-6 -10 6 -18 12 -8 c4 8 -6 14 -12 8z" fill="#4B2A74" />
        <path d="M404 46 L436 66 L436 126 L404 146 L372 126 L372 66Z" />
        <path d="M390 74 V118 M418 74 V118 M390 96 H418" strokeWidth="5" />
        <g strokeWidth="2.6" opacity=".7">
          <path d="M300 432 q8 -6 16 0 t16 0" />
          <path d="M390 408 q8 -6 16 0 t16 0" />
          <path d="M240 446 q8 -6 16 0 t16 0" />
        </g>
        <path d={ROUTE_D} strokeDasharray="12 10" mask={`url(#${id}-route)`} />
        <circle cx="200" cy="396" r="5" fill="#4B2A74" />
      </g>

      <g className="map-ship" fill="none" stroke="#4B2A74" strokeWidth="3.4" strokeLinejoin="round">
        <g transform="rotate(-22)">
          <path d="M-46 0 L46 0 L36 14 L-38 14Z" fill="#E9C27C" />
          <path d="M-28 0 V-12 H16 V0" />
          <path d="M-6 -12 V-26 H4 V-12" />
          <path d="M-20 -6 h4 M-10 -6 h4 M0 -6 h4" strokeWidth="2.6" />
          <path d="M-40 7 h76" strokeWidth="2" />
          <text x="-44" y="44" stroke="none" fill="#4B2A74" fontFamily="Caveat Variable, cursive" fontWeight="600" fontSize="25">SS Rajula</text>
        </g>
      </g>

      <g className="map-label" fontFamily="Caveat Variable, cursive" fontWeight="600" fill="#4B2A74">
        <text x="128" y="292" fontSize="27" transform="rotate(-8 128 292)">Chittarkottai</text>
        <text x="470" y="136" fontSize="34" transform="rotate(-6 470 136)">Penang</text>
      </g>
    </svg>
  )
})

export default SpiceMap
