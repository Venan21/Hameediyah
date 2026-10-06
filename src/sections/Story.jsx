import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PHOTO } from '../art/photos'
import SpiceMap, { ROUTE_D } from '../art/SpiceMap'
import { svgRig } from '../lib/svg'
import { MURAL_LINE } from '../content'
import './story.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// The steamer stops mid-sea; the dashed route finishes drawing to George Town as it gets there.
const SHIP_STOP = 0.4

function useMapVoyage(mapRef) {
  useGSAP(
    () => {
      const svg = mapRef.current
      const reveal = svg.querySelector('.route-reveal')
      const ship = svg.querySelector('.map-ship')
      const route = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      route.setAttribute('d', ROUTE_D)
      const len = route.getTotalLength()
      const shipRig = svgRig(ship, {})
      const voyage = { t: SHIP_STOP }
      const place = () => {
        const pt = route.getPointAtLength(len * voyage.t)
        shipRig.p.x = pt.x
        shipRig.p.y = pt.y - 10
        shipRig.apply()
        reveal.style.strokeDashoffset = 1 - Math.min(1, voyage.t / SHIP_STOP)
      }

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        voyage.t = 0
        place()
        gsap.to(voyage, {
          t: SHIP_STOP,
          ease: 'none',
          onUpdate: place,
          scrollTrigger: { trigger: svg, start: 'top 80%', end: 'center 45%', scrub: 0.6 },
        })
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        voyage.t = SHIP_STOP
        place()
        reveal.style.strokeDashoffset = 0
      })
    },
    { scope: mapRef },
  )
}

export default function Story() {
  const mapRef = useRef(null)
  useMapVoyage(mapRef)
  return (
    <section className="section story" id="story">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Our story</p>
          <h2>It began with a pole and two pots.</h2>
          <p>Before nasi kandar had a home, it had a shoulder to rest on.</p>
        </div>

        <div className="story-row">
          <figure className="story-figure story-figure--archive">
            <img
              className="story-photo"
              src={PHOTO.hawkers}
              width="1600"
              height="1016"
              loading="lazy"
              alt="Two street vendors in Penang in 1928, seated beside baskets and pots hung from carrying poles"
            />
            <figcaption>Street vendors with shoulder-pole baskets, Penang, 1928.</figcaption>
          </figure>
          <div className="story-text">
            <h3>The kandar</h3>
            <p>
              <strong>Nasi kandar was born on the streets of Penang.</strong> Hawkers balanced a wooden pole, the{' '}
              <em>kandar</em>, across their shoulders, with rice hanging from one end and pots of curry from the other,
              and walked the town selling meals to workers and traders.
            </p>
            <p>
              In <strong>1907</strong>, Hameediyah gave that tradition a permanent home at <strong>Lebuh Campbell</strong>,
              in the heart of George Town. The pole came off the shoulder, the pots went on the counter, and the curries
              started being poured generously over steaming rice, as they still are today.
            </p>
            <blockquote className="story-quote">Over a hundred years. Seven generations. One family recipe.</blockquote>
          </div>
        </div>

        <div className="story-row story-row--flip">
          <figure className="story-figure story-figure--portrait">
            <img
              className="story-photo"
              src={PHOTO.muralPortrait}
              width="947"
              height="1100"
              loading="lazy"
              alt="Close-up of the mural: a smiling seller with a white beard, songkok and towel over his shoulders, giving a thumbs up beside a tiffin carrier"
            />
            <figcaption>The man on our wall, painted at Hameediyah.</figcaption>
          </figure>
          <div className="story-text">
            <h3>The man on our wall</h3>
            <p>
              Painted on our wall is a figure every regular knows: a white-bearded seller in a songkok and a yellow
              shirt, towel over his shoulders, thumb up. His old black bicycle carries a rattan basket with a tiffin
              carrier and clay pots, the way nasi kandar travelled before it had a counter.
            </p>
            <p>
              Above him, in Penang Malay: <span className="story-hand">{MURAL_LINE.ms}.</span> No matter
              where you go or what you do, you'll always end up back at Hameediyah.
            </p>
          </div>
        </div>

        <div className="story-row">
          <figure className="story-figure story-figure--map">
            <SpiceMap ref={mapRef} className="story-art" />
            <figcaption>Drawn by hand at our table: Chittarkottai, Tamil Nadu, the SS Rajula, Penang.</figcaption>
          </figure>
          <div className="story-text">
            <h3>The family</h3>
            {/* VERIFY: confirm the map's Chittarkottai connection with the family before launch. */}
            <p>
              The map at our table traces a route from Chittarkottai, Tamil Nadu, on India's southeast coast, across the Bay of
              Bengal to Penang.
            </p>
            <p>
              <strong>The restaurant has never left the family.</strong> The kitchen has passed from parent to child for
              seven generations, and with it the spice blends, the slow-cooked gravies and the habit of treating every
              guest like a regular.
            </p>
            <p>
              Today Hameediyah is led by <strong>Ahamed Seeni Pakir Abdul Shukor</strong>, who carries the same recipes
              forward on the same street where they began. Over the decades the doors on Lebuh Campbell have welcomed
              neighbourhood regulars, travellers from around the world, actors, ministers and royalty, including the{' '}
              <strong>Yang di-Pertuan Agong</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
