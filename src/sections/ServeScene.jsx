import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Plate from '../art/Plate'
import { Basket, ClayLid, ClayPot, STACK, TiffinFrame, TiffinTier } from '../art/Vessels'
import {
  ChiliFlake, CurryLeaf, DriedChili, GravyOnRice, GravyPool, LambShank, OkraPiece, RiceGrain, RiceMound,
  domeSurfacePoint,
} from '../art/food'
import { mulberry32, svgRig } from '../lib/svg'
import { SERVE_NOTES } from '../content'
import './serve.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const W = 1200
const H = 900
const BASKET = { x: 960, y: 430 }
const RICE = { x: 540, y: 630, w: 135, h: 135, seed: 7 }
const POOL = { x: 600, y: 668 }
const SHANK = { x: 705, y: 600, r: -18 }
const POUR = {
  rice: { x: 520, y: 410, r: -115 },
  lamb: { x: 660, y: 455, r: -100 },
  okra: { x: 420, y: 470, r: -115 },
  gravy: { x: 540, y: 402, r: -105 },
}
const NARROW_QUERY = '(max-width: 760px)'
const NARROW_VIEW = '220 190 910 610'
const STREAM_D = 'M540 404 C536 440 548 470 546 508'
const TIER_FILL = ['gravy', 'okra', 'rice']

const toBasket = ({ x, y, r }) => ({ x: x - BASKET.x, y: y - BASKET.y, r })

const OKRA = [
  [352, 668, -20, true], [378, 648, 15], [405, 662, -40], [432, 676, 10], [372, 684, 35],
  [400, 694, -8], [352, 680, 60], [425, 702, -25, true], [455, 690, 20], [388, 670, 80],
]

const OKRA_SCALE = 1.35

const LEAVES = [[500, 522, 20], [566, 518, -30], [470, 566, 60], [626, 566, -10], [532, 604, 40], [728, 574, 15]]
const CHILIES = [[592, 536, 24], [482, 602, -30]]

function buildFood() {
  const rand = mulberry32(1907)
  const grains = []
  for (let i = 0; i < 82; i++) {
    const p = domeSurfacePoint(RICE.w, RICE.h, 0.06 + rand() * 0.88, rand() * 0.55)
    grains.push({ x: RICE.x + p.x, y: RICE.y + p.y, r: rand() * 180, sprinkle: false })
  }
  let guard = 0
  while (grains.length < 118 && guard++ < 2000) {
    const a = rand() * Math.PI * 2
    const k = 0.55 + rand() * 0.37
    const x = 560 + Math.cos(a) * 240 * k
    const y = 648 + Math.sin(a) * 86 * k
    const behindMound = y < 646 && Math.abs(x - RICE.x) < 150
    const underShank = x > 620 && x < 820 && y < 660
    if (behindMound || underShank) continue
    grains.push({ x, y, r: rand() * 180, sprinkle: true })
  }
  const flakes = []
  for (let i = 0; i < 26; i++) {
    if (i < 16) {
      const p = domeSurfacePoint(RICE.w, RICE.h, 0.3 + rand() * 0.6, 0.15 + rand() * 0.6)
      flakes.push({ x: RICE.x + p.x, y: RICE.y + p.y, r: rand() * 360 })
    } else {
      flakes.push({ x: POOL.x - 100 + rand() * 220, y: POOL.y - 4 + rand() * 30, r: rand() * 360 })
    }
  }
  return { grains, flakes, jitter: Array.from({ length: 200 }, () => rand()) }
}

export default function ServeScene() {
  const section = useRef(null)
  const food = useMemo(() => buildFood(), [])
  const [narrowView, setNarrowView] = useState(() => window.matchMedia(NARROW_QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(NARROW_QUERY)
    const onChange = () => setNarrowView(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useGSAP(
    () => {
      const q = gsap.utils.selector(section)
      const one = (sel) => q(sel)[0]
      const mm = gsap.matchMedia()

      mm.add(
        {
          wide: '(min-width: 761px)',
          narrow: NARROW_QUERY,
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { narrow, reduce } = ctx.conditions
          const rig = svgRig
          const tl = gsap.timeline({
            defaults: { ease: 'power1.inOut' },
            scrollTrigger: reduce
              ? undefined
              : {
                  trigger: section.current,
                  start: 'top top',
                  end: () => `+=${window.innerHeight * (narrow ? 5 : 5.5)}`,
                  scrub: 0.7,
                  pin: true,
                  anticipatePin: 1,
                },
          })
          const move = (r, vars, at) =>
            tl.to(r.p, { ...vars, onUpdate: r.apply }, at)

          const basket = rig(one('[data-rig="basket"]'), { x: 720, y: -720, r: 14, px: BASKET.x, py: BASKET.y })
          const tiers = q('[data-tier]').map((el, i) => rig(el, { ...STACK.tiers[i], o: 1 }))
          const pot = rig(one('[data-rig="pot"]'), { ...STACK.pot })
          const lid = rig(one('[data-rig="lid"]'), { ...STACK.lid })
          const mound = rig(one('[data-rig="mound"]'), { x: RICE.x, y: RICE.y, sx: 0.4, sy: 0 })
          const pool = rig(one('[data-rig="pool"]'), { x: POOL.x, y: POOL.y, sx: 0.15, sy: 0.15, o: 0 })
          const shank = rig(one('[data-rig="shank"]'), { x: POUR.lamb.x, y: POUR.lamb.y, r: -95, sx: 0.7, sy: 0.7, o: 0 })
          const steam = one('[data-steam]')
          const gravyReveal = one('.gravy-reveal')
          const stream = one('[data-stream]')

          gsap.set(gravyReveal, { attr: { height: 0 } })
          gsap.set(stream, { strokeDashoffset: 1 })
          gsap.set(steam, { opacity: 0 })
          gsap.set(q('[data-note-mask]'), { strokeDashoffset: 1 })
          gsap.set(q('[data-note-dot]'), { opacity: 0 })

          // basket arrives
          move(basket, { x: 0, y: 0, r: 0, duration: 1.4, ease: 'power2.out' }, 0)
          move(basket, { r: -2.4, duration: 0.25, ease: 'sine.out' }, 1.4)
          move(basket, { r: 0, duration: 0.35, ease: 'sine.inOut' }, 1.65)
          tl.to(one('[data-intro]'), { autoAlpha: 0, y: -16, duration: 0.4 }, 1.7)

          const note = (i, at) => {
            tl.to(q(`[data-note-mask="${i}"]`), { strokeDashoffset: 0, duration: 0.6, ease: 'none' }, at)
            tl.to(q(`[data-note-dot="${i}"]`), { opacity: 1, duration: 0.15 }, at)
            tl.fromTo(
              q(`[data-note="${i}"]`),
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
              at + 0.35,
            )
          }
          const hideNoteOnNarrow = (i, at) => {
            if (narrow) tl.to(q(`[data-note="${i}"]`), { autoAlpha: 0, y: -10, duration: 0.3 }, at)
          }

          // 1. rice
          const tierRice = tiers[2]
          move(tierRice, { y: STACK.tiers[2].y - 70, duration: 0.4 }, 1.8)
          move(tierRice, { ...toBasket(POUR.rice), duration: 0.8 }, 2.2)
          q('[data-grain]').forEach((el, i) => {
            const g = food.grains[i]
            const j = food.jitter
            const r = rig(el, { x: POUR.rice.x + (j[i] - 0.5) * 14, y: POUR.rice.y + j[i + 1] * 8, r: j[i + 2] * 360, o: 0 })
            const at = 2.9 + (i / food.grains.length) * 1.8
            move(r, { o: 1, duration: 0.05 }, at)
            if (g.sprinkle) {
              move(r, { x: g.x, y: g.y - 12, r: g.r + 220, duration: 0.42, ease: 'power2.in' }, at)
              move(r, { y: g.y, duration: 0.18, ease: 'bounce.out' }, at + 0.42)
            } else {
              move(r, { x: g.x, y: g.y, r: g.r + 200, duration: 0.45, ease: 'power2.in' }, at)
            }
          })
          move(mound, { sx: 1, sy: 1, duration: 1.7, ease: 'power1.out' }, 2.95)
          move(tierRice, { x: -300, y: -420, r: -40, o: 0, duration: 0.6 }, 4.8)
          note(0, 4.6)
          hideNoteOnNarrow(0, 5.6)

          // 2. lamb shank
          move(lid, { y: STACK.lid.y - 75, r: -8, duration: 0.35 }, 5.6)
          move(lid, { x: 190, y: -200, r: 20, duration: 0.4 }, 5.95)
          move(pot, { y: STACK.pot.y - 58, duration: 0.35 }, 6.2)
          move(pot, { ...toBasket(POUR.lamb), duration: 0.7 }, 6.55)
          move(shank, { o: 1, duration: 0.05 }, 7.2)
          move(shank, { x: SHANK.x, y: SHANK.y + 6, r: SHANK.r + 4, sx: 1, sy: 1, duration: 0.55, ease: 'power2.in' }, 7.2)
          move(shank, { y: SHANK.y, r: SHANK.r, duration: 0.25, ease: 'power1.out' }, 7.75)
          move(pot, { ...STACK.pot, r: 0, duration: 0.7 }, 8.0)
          move(lid, { ...STACK.lid, r: 0, duration: 0.4 }, 8.6)
          note(1, 8.0)
          hideNoteOnNarrow(1, 9.1)

          // 3. okra
          const tierOkra = tiers[1]
          move(tierOkra, { y: STACK.tiers[1].y - 96, duration: 0.35 }, 9.1)
          move(tierOkra, { ...toBasket(POUR.okra), duration: 0.7 }, 9.45)
          q('[data-okra]').forEach((el, i) => {
            const [x, y, r] = OKRA[i]
            const piece = rig(el, { x: POUR.okra.x + (i % 3) * 4, y: POUR.okra.y, r: r - 160, sx: OKRA_SCALE, sy: OKRA_SCALE, o: 0 })
            const at = 10.1 + i * 0.12
            move(piece, { o: 1, duration: 0.05 }, at)
            move(piece, { x, y: y - 10, r: r + 12, duration: 0.42, ease: 'power2.in' }, at)
            move(piece, { y, r, duration: 0.2, ease: 'bounce.out' }, at + 0.42)
          })
          move(tierOkra, { x: -360, y: -440, r: -50, o: 0, duration: 0.6 }, 11.6)
          note(2, 11.4)
          hideNoteOnNarrow(2, 12.4)

          // 4. gravy and spices
          const tierGravy = tiers[0]
          move(tierGravy, { y: STACK.tiers[0].y - 102, duration: 0.35 }, 12.4)
          move(tierGravy, { ...toBasket(POUR.gravy), duration: 0.7 }, 12.75)
          tl.to(stream, { strokeDashoffset: 0, duration: 0.3, ease: 'none' }, 13.45)
          tl.to(gravyReveal, { attr: { height: RICE.h + 60 }, duration: 1.3, ease: 'power1.out' }, 13.6)
          move(pool, { sx: 1, sy: 1, o: 1, duration: 1.1, ease: 'power2.out' }, 13.9)
          tl.to(stream, { strokeDashoffset: -1, duration: 0.3, ease: 'none' }, 15.0)
          move(tierGravy, { x: -280, y: -460, r: -30, o: 0, duration: 0.6 }, 15.3)
          q('[data-spice]').forEach((el, i) => {
            const t = el.dataset.spice.split(',').map(Number)
            const r = rig(el, { x: t[0] + (food.jitter[i + 40] - 0.5) * 80, y: 40, r: t[2] - 300, o: 0 })
            const at = 15.0 + i * 0.035
            move(r, { o: 1, duration: 0.1 }, at)
            move(r, { x: t[0], y: t[1], r: t[2], duration: 0.55, ease: 'power2.in' }, at)
          })
          note(3, 15.6)
          hideNoteOnNarrow(3, 16.6)

          // served
          move(basket, { x: 820, y: -160, r: 10, duration: 1.0, ease: 'power2.in' }, 16.6)
          tl.to(steam, { opacity: 1, duration: 0.6 }, 16.9)
          tl.fromTo(one('[data-outro]'), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 17.2)
          tl.to({}, { duration: 1.2 }, 17.7)

          if (reduce) tl.progress(1)
        },
      )
    },
    { scope: section, dependencies: [food] },
  )

  return (
    <section className="serve" id="serve" ref={section} aria-labelledby="serve-title">
      <div className="serve-box">
        <svg className="serve-svg" viewBox={narrowView ? NARROW_VIEW : `0 0 ${W} ${H}`} role="img" aria-label="A basket of tiffin tiers and a clay pot serves rice, lamb shank, okra and gravy onto a yellow plate">
          <Plate x={560} y={640} />
          <g data-rig="pool" transform={`translate(${POOL.x} ${POOL.y})`}>
            <GravyPool />
          </g>
          <g data-rig="mound" transform={`translate(${RICE.x} ${RICE.y})`}>
            <RiceMound w={RICE.w} h={RICE.h} seed={RICE.seed} />
          </g>
          <g className="serve-grains">
            {food.grains.map((g, i) => (
              <g key={i} data-grain={i} transform={`translate(${g.x} ${g.y}) rotate(${g.r})`}>
                <RiceGrain />
              </g>
            ))}
          </g>
          <g transform={`translate(${RICE.x} ${RICE.y})`}>
            <GravyOnRice w={RICE.w} h={RICE.h} seed={RICE.seed} />
          </g>
          {OKRA.map(([x, y, r, tip], i) => (
            <g key={i} data-okra={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${OKRA_SCALE})`}>
              <OkraPiece tip={tip} />
            </g>
          ))}
          <g data-rig="shank" transform={`translate(${SHANK.x} ${SHANK.y}) rotate(${SHANK.r})`}>
            <LambShank />
          </g>
          {LEAVES.map(([x, y, r]) => (
            <g key={`l${x}`} data-spice={`${x},${y},${r}`} transform={`translate(${x} ${y}) rotate(${r})`}>
              <CurryLeaf />
            </g>
          ))}
          {CHILIES.map(([x, y, r]) => (
            <g key={`c${x}`} data-spice={`${x},${y},${r}`} transform={`translate(${x} ${y}) rotate(${r})`}>
              <DriedChili />
            </g>
          ))}
          {food.flakes.map((f, i) => (
            <g key={`f${i}`} data-spice={`${f.x.toFixed(1)},${f.y.toFixed(1)},${f.r.toFixed(0)}`} transform={`translate(${f.x} ${f.y}) rotate(${f.r})`}>
              <ChiliFlake variant={i} />
            </g>
          ))}

          <g data-steam className="serve-steam" fill="none" stroke="#9BB59A" strokeWidth="4" strokeLinecap="round">
            <path d="M500 470 q-14 -26 0 -52 q14 -26 0 -52" />
            <path d="M560 460 q14 -26 0 -52 q-14 -26 0 -52" />
            <path d="M690 520 q-14 -26 0 -52 q14 -26 0 -52" />
          </g>

          <path data-stream d={STREAM_D} pathLength="1" fill="none" stroke="#A8401A" strokeWidth="13" strokeLinecap="round" strokeDasharray="1 1" />

          <defs>
            {SERVE_NOTES.map((n, i) => (
              <mask key={n.key} id={`serve-note-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
                <path data-note-mask={i} d={n.line} pathLength="1" fill="none" stroke="#fff" strokeWidth="10" strokeDasharray="1 1" strokeDashoffset="0" />
              </mask>
            ))}
          </defs>
          <g className="serve-notes">
            {SERVE_NOTES.map((n, i) => (
              <g key={n.key}>
                <path d={n.line} mask={`url(#serve-note-${i})`} fill="none" stroke="#1E6B35" strokeWidth="3.4" strokeLinecap="round" strokeDasharray="0.1 9" />
                <g data-note-dot={i}>
                  <circle cx={n.dot[0]} cy={n.dot[1]} r="9" fill="none" stroke="#1E6B35" strokeWidth="2" strokeDasharray="2 3" />
                  <circle cx={n.dot[0]} cy={n.dot[1]} r="3.5" fill="#1E6B35" />
                </g>
              </g>
            ))}
          </g>

          <g data-rig="basket">
            <g transform={`translate(${BASKET.x} ${BASKET.y})`}>
              <Basket />
              <TiffinFrame />
              {STACK.tiers.map((t, i) => (
                <g key={i} data-tier={i} transform={`translate(${t.x} ${t.y})`}>
                  <TiffinTier fill={TIER_FILL[i]} />
                </g>
              ))}
              <g data-rig="pot" transform={`translate(${STACK.pot.x} ${STACK.pot.y})`}>
                <ClayPot />
              </g>
              <g data-rig="lid" transform={`translate(${STACK.lid.x} ${STACK.lid.y})`}>
                <ClayLid />
              </g>
            </g>
          </g>
        </svg>

        <div className="serve-intro" data-intro>
          <h2 id="serve-title">From the basket to your plate</h2>
          <p>Keep scrolling. Each vessel serves its part, the way it's done at our counter.</p>
        </div>

        {SERVE_NOTES.map((n, i) => (
          <div
            key={n.key}
            className="serve-note"
            data-note={i}
            style={{
              left: `${(n.box.x / W) * 100}%`,
              top: `${(n.box.y / H) * 100}%`,
              width: `${(n.box.w / W) * 100}%`,
            }}
          >
            <h3>{n.title}</h3>
            <p>{n.body}</p>
          </div>
        ))}

        <div className="serve-outro" data-outro>
          <p className="serve-outro-title">One plate, served the way it has been since 1907.</p>
          <a className="btn btn-green" href="#menu">See the menu</a>
        </div>
      </div>
    </section>
  )
}
