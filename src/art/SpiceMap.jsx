import { forwardRef } from 'react'
import { useSvgId, smoothPath } from '../lib/svg'

const INDIA = [
  [170, 72], [190, 90], [200, 118], [226, 140], [258, 152], [290, 160], [306, 150], [336, 140], [346, 156],
  [330, 176], [318, 196], [304, 186], [296, 200], [284, 214], [270, 232], [252, 250], [236, 272], [222, 300],
  [212, 330], [206, 360], [196, 392], [184, 420], [176, 432], [166, 414], [158, 384], [150, 350], [142, 312],
  [134, 276], [126, 246], [118, 226], [104, 214], [90, 206], [78, 196], [84, 182], [98, 176], [110, 160],
  [126, 138], [140, 116], [150, 96],
]

// Penang Island, traced from a reference map; George Town is the north-east tip.
const PENANG = [
  [432, 237], [438, 236], [444, 239], [452, 245], [460, 250], [468, 249], [477, 248], [485, 247], [492, 243],
  [499, 237], [506, 234], [510, 235], [516, 242], [522, 247], [529, 250], [539, 252], [546, 253], [552, 257],
  [556, 263], [562, 269], [570, 273], [579, 279], [585, 288], [581, 294], [576, 299], [571, 306], [566, 314],
  [562, 323], [560, 334], [559, 344], [556, 355], [553, 364], [549, 376], [544, 386], [539, 397], [535, 405],
  [532, 413], [528, 421], [524, 429], [520, 433], [516, 430], [512, 424], [508, 419], [502, 416], [494, 415],
  [485, 415], [480, 413], [475, 417], [466, 419], [458, 419], [450, 420], [445, 423], [441, 424], [438, 421],
  [436, 415], [436, 407], [436, 400], [438, 393], [441, 384], [444, 376], [446, 365], [448, 355], [448, 342],
  [448, 328], [447, 313], [447, 298], [446, 288], [441, 284], [435, 282], [431, 279], [430, 271], [431, 260],
  [431, 250], [431, 242],
]

export const ROUTE_D = 'M200 396 C276 412 338 350 380 290 C410 240 470 205 528 210 C560 213 576 246 580 280'

const SpiceMap = forwardRef(function SpiceMap({ className }, ref) {
  const id = useSvgId('map')
  return (
    <svg ref={ref} className={className} viewBox="0 0 640 560" role="img" aria-label="Hand-drawn map on a flatbread tracing a route from Chittarkottai, Tamil Nadu, in India, past the steamer SS Rajula, to Penang">
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
        <path d={smoothPath(PENANG, true)} />
        <circle cx="580" cy="286" r="5.5" fill="#4B2A74" />
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
          <text x="-52" y="-34" stroke="none" fill="#4B2A74" fontFamily="Caveat Variable, cursive" fontWeight="600" fontSize="25">SS Rajula</text>
        </g>
      </g>

      <g className="map-label" fontFamily="Caveat Variable, cursive" fontWeight="600" fill="#4B2A74">
        <text fontSize="27" transform="rotate(-8 148 300)">
          <tspan x="146" y="300">Chittarkottai,</tspan>
          <tspan x="158" y="328">Tamil Nadu</tspan>
        </text>
        <text x="458" y="356" fontSize="30" transform="rotate(-6 458 356)">Penang</text>
      </g>
    </svg>
  )
})

export default SpiceMap
