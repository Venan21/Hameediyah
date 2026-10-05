import { useSvgId } from '../lib/svg'
import { VesselStack } from './Vessels'

function Wheel({ cx, cy, id }) {
  const spokes = Array.from({ length: 32 }, (_, i) => {
    const a = (i / 32) * Math.PI * 2
    const off = i % 2 ? 0.18 : -0.18
    return (
      <line
        key={i}
        x1={cx + Math.cos(a + off) * 7}
        y1={cy + Math.sin(a + off) * 7}
        x2={cx + Math.cos(a) * 88}
        y2={cy + Math.sin(a) * 88}
      />
    )
  })
  return (
    <g>
      <g stroke="#8E9492" strokeWidth=".9">{spokes}</g>
      <circle cx={cx} cy={cy} r="91" fill="none" stroke={`url(#${id}-chrome)`} strokeWidth="4" />
      <circle cx={cx} cy={cy} r="98" fill="none" stroke="#151715" strokeWidth="10" />
      <circle cx={cx} cy={cy} r="102" fill="none" stroke="#2C302D" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="9" fill="#5E6462" stroke="#2A2D2B" strokeWidth="2" />
    </g>
  )
}

const arc = (cx, cy, r, a0, a1) => {
  const p = (a) => [cx + Math.cos((a * Math.PI) / 180) * r, cy + Math.sin((a * Math.PI) / 180) * r]
  const [x0, y0] = p(a0)
  const [x1, y1] = p(a1)
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`
}

export default function OldManMural({ withScript = true, viewBox = '0 0 640 740', className, title }) {
  const id = useSvgId('mural')
  const F = [140, 615]
  const R = [490, 615]
  const B = [320, 622]
  return (
    <svg className={className} viewBox={viewBox} role="img" aria-label={title}>
      <defs>
        <linearGradient id={`${id}-shirt`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE04A" />
          <stop offset=".55" stopColor="#F4C21C" />
          <stop offset="1" stopColor="#D49A0E" />
        </linearGradient>
        <radialGradient id={`${id}-skin`} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#B07445" />
          <stop offset=".7" stopColor="#87502B" />
          <stop offset="1" stopColor="#5E351B" />
        </radialGradient>
        <linearGradient id={`${id}-arm`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6E3F21" />
          <stop offset=".5" stopColor="#A06737" />
          <stop offset="1" stopColor="#6E3F21" />
        </linearGradient>
        <linearGradient id={`${id}-chrome`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4F6F5" />
          <stop offset=".5" stopColor="#9DA3A1" />
          <stop offset="1" stopColor="#E3E6E4" />
        </linearGradient>
        <pattern id={`${id}-sarong`} width="38" height="44" patternUnits="userSpaceOnUse">
          <rect width="38" height="44" fill="#F7F4EC" />
          <rect y="0" width="38" height="11" fill="#2E8B3E" />
          <rect y="14" width="38" height="6" fill="#C2407A" />
          <rect y="23" width="38" height="11" fill="#5FB84A" />
          <rect y="37" width="38" height="4" fill="#C2407A" />
          <rect x="16" width="3" height="44" fill="#1E5E2C" opacity=".35" />
          <rect x="33" width="2" height="44" fill="#C2407A" opacity=".35" />
        </pattern>
        <linearGradient id={`${id}-fold`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1A2A16" stopOpacity=".35" />
          <stop offset=".3" stopColor="#1A2A16" stopOpacity="0" />
          <stop offset=".75" stopColor="#1A2A16" stopOpacity=".05" />
          <stop offset="1" stopColor="#1A2A16" stopOpacity=".4" />
        </linearGradient>
        <filter id={`${id}-paint`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
        </filter>
        <filter id={`${id}-shadow`} x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <path id={`${id}-script`} d="M14 300 C60 170 180 70 630 26" />
      </defs>

      <ellipse cx="330" cy="716" rx="300" ry="14" fill="#1E3A1E" opacity=".14" filter={`url(#${id}-shadow)`} />

      {withScript && (
        <text className="mural-script" fontSize="46" fill="#1B2A1E">
          <textPath href={`#${id}-script`} startOffset="2%">
            Pi mai, pi mai, Hameediyah jugak
          </textPath>
        </text>
      )}

      <g filter={`url(#${id}-paint)`}>
        {/* man */}
        <path d="M234 412 C260 418 340 418 366 412 L384 662 C340 672 260 672 218 662Z" fill={`url(#${id}-sarong)`} />
        <path d="M234 412 C260 418 340 418 366 412 L384 662 C340 672 260 672 218 662Z" fill={`url(#${id}-fold)`} />
        <path d="M300 430 C296 500 304 580 298 664 M262 440 C252 520 246 600 240 664" stroke="#1A2A16" strokeWidth="2" opacity=".18" fill="none" />
        <g fill="#7A4626">
          <ellipse cx="262" cy="676" rx="20" ry="8" />
          <ellipse cx="340" cy="676" rx="20" ry="8" />
        </g>
        <path d="M244 674 h36 M322 674 h36" stroke="#2A1A0E" strokeWidth="4" />

        <path
          d="M228 236 C250 222 270 218 300 220 C330 218 352 222 372 236 L394 292 L370 302 L364 282 L366 402 L234 402 L236 282 L230 302 L206 292Z"
          fill={`url(#${id}-shirt)`}
        />
        <path d="M246 300 C250 340 248 370 242 398 M352 300 C350 340 352 370 358 398" stroke="#B9850C" strokeWidth="2.4" opacity=".5" fill="none" />
        <path d="M232 392 C260 398 340 398 368 392 L368 414 C340 420 260 420 232 414Z" fill="#1E7A38" />
        <g fill="#F6D31C">
          {[248, 268, 288, 312, 332, 352].map((x) => (
            <rect key={x} x={x} y="400" width="8" height="5" rx="1" />
          ))}
        </g>

        <path d="M276 222 C270 252 266 292 268 334 L286 336 C285 298 287 258 292 226Z" fill="#F5F6F1" />
        <path d="M312 222 C324 252 332 302 332 352 L350 350 C350 300 342 250 328 222Z" fill="#EDEFE9" />
        <path d="M270 330 h16 M334 346 h16" stroke="#C7CBC3" strokeWidth="3" />

        <rect x="288" y="200" width="24" height="26" fill="#7A4626" />
        <ellipse cx="268" cy="172" rx="6" ry="10" fill="#7A4626" />
        <ellipse cx="332" cy="172" rx="6" ry="10" fill="#7A4626" />
        <ellipse cx="300" cy="170" rx="31" ry="38" fill={`url(#${id}-skin)`} />
        <path d="M268 146 L271 110 C286 104 314 104 329 110 L332 146 C316 140 284 140 268 146Z" fill="#262A27" />
        <path d="M275 116 C290 111 310 111 324 116" stroke="#4E5550" strokeWidth="3" fill="none" />
        <path d="M280 157 q8 -5 15 0 M305 157 q8 -5 15 0" stroke="#F2F2EC" strokeWidth="4" strokeLinecap="round" fill="none" />
        <ellipse cx="288" cy="166" rx="3.2" ry="2.3" fill="#1C120C" />
        <ellipse cx="312" cy="166" rx="3.2" ry="2.3" fill="#1C120C" />
        <path d="M280 170 q4 3 8 2 M312 172 q4 1 8 -2" stroke="#5A3018" strokeWidth="1.4" fill="none" />
        <path d="M300 166 C298 176 294 182 297 186 C301 189 306 187 306 183" stroke="#5A3018" strokeWidth="2" fill="none" />
        <path
          d="M268 172 C266 200 272 230 286 252 C292 262 298 272 300 280 C302 272 310 262 316 252 C330 230 336 200 332 172 C326 190 318 196 312 196 C306 190 294 190 288 196 C282 196 274 190 268 172Z"
          fill="#F3F3EE"
        />
        <g stroke="#C6CAC2" strokeWidth="1.3" fill="none" opacity=".9">
          <path d="M280 206 C284 226 290 244 298 262" />
          <path d="M320 206 C316 226 310 244 302 262" />
          <path d="M290 212 C292 230 296 246 300 270" />
          <path d="M272 186 C274 200 278 212 284 222" />
          <path d="M328 186 C326 200 322 212 316 222" />
        </g>
        <path d="M284 194 C290 188 298 190 300 192 C302 190 310 188 316 194 C310 200 304 198 300 196 C296 198 290 200 284 194Z" fill="#FFFFFF" />
        <path d="M292 200 q8 7 16 0 q-8 3 -16 0Z" fill="#5A2414" />

        <path d="M218 290 C212 330 226 380 246 410" stroke={`url(#${id}-arm)`} strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M382 292 C390 330 390 356 378 364 C362 360 348 342 340 330" stroke={`url(#${id}-arm)`} strokeWidth="22" strokeLinecap="round" fill="none" />
        <ellipse cx="336" cy="322" rx="14" ry="12" fill="#8C552E" />
        <rect x="329" y="292" width="10" height="26" rx="5" fill="#9A6034" />
        <path d="M326 318 h20 M326 325 h20" stroke="#5E351B" strokeWidth="1.4" />

        {/* bicycle */}
        <path d={arc(F[0], F[1], 108, 200, 330)} stroke="#121412" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d={arc(R[0], R[1], 108, 190, 350)} stroke="#121412" strokeWidth="9" fill="none" strokeLinecap="round" />
        <Wheel cx={F[0]} cy={F[1]} id={id} />
        <Wheel cx={R[0]} cy={R[1]} id={id} />
        <g stroke="#151816" strokeLinecap="round" fill="none">
          <path d="M205 458 L405 478" strokeWidth="10" />
          <path d="M197 488 L320 622" strokeWidth="11" />
          <path d="M320 622 L414 452" strokeWidth="10" />
          <path d="M410 476 L490 615" strokeWidth="6" />
          <path d="M320 622 L490 615" strokeWidth="6" />
          <path d="M195 492 C186 530 170 570 140 615" strokeWidth="8" />
          <path d="M207 448 L192 496" strokeWidth="12" />
          <path d="M207 448 L209 424 C214 410 236 408 254 416" strokeWidth="6" stroke={`url(#${id}-chrome)`} />
        </g>
        <path d="M222 470 L380 486" stroke="#D8B04A" strokeWidth="1.6" />
        <path d="M320 606 L490 600 L494 626 L322 640 C312 636 310 612 320 606Z" fill="#141614" />
        <path d="M332 618 L486 612" stroke="#D8B04A" strokeWidth="1.6" />
        <circle cx={B[0]} cy={B[1]} r="22" fill="none" stroke="#2A2D2B" strokeWidth="5" />
        <path d="M320 622 L344 664" stroke="#9DA3A1" strokeWidth="7" strokeLinecap="round" />
        <rect x="330" y="660" width="30" height="9" rx="2" fill="#1A1C1A" />
        <path d="M490 615 L470 706" stroke="#9DA3A1" strokeWidth="5" strokeLinecap="round" />
        <path d="M380 452 C392 440 430 440 446 448 C442 458 420 460 402 458 C394 462 384 460 380 452Z" fill="#141614" />
        <path d="M392 446 C404 442 422 442 434 446" stroke="#5A605C" strokeWidth="2" fill="none" />
        <path d="M394 460 v14 M430 460 v14" stroke="#9DA3A1" strokeWidth="5" strokeDasharray="2 2" />
        <circle cx="222" cy="426" r="7" fill={`url(#${id}-chrome)`} stroke="#6E7472" />
        <ellipse cx="186" cy="460" rx="9" ry="12" fill={`url(#${id}-chrome)`} stroke="#6E7472" />
        <rect x="240" y="408" width="36" height="14" rx="7" fill="#1E8A4E" />
        <rect x="244" y="410" width="20" height="3" rx="1.5" fill="#6CCB8A" opacity=".7" />
        <ellipse cx="250" cy="417" rx="14" ry="11" fill="#8C552E" />
        <path d="M240 414 h20 M241 420 h18" stroke="#5E351B" strokeWidth="1.4" />

        <g stroke="#2A2D2B" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M412 490 L596 490" />
          <path d="M596 490 L490 615 M548 490 L490 615 M412 490 L412 476" />
        </g>
        <g transform="translate(505 398) scale(.6)">
          <VesselStack />
        </g>
      </g>
    </svg>
  )
}
