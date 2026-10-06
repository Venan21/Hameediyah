import { useEffect, useState } from 'react'
import Signboard from '../art/Signboard'
import { PHOTO } from '../art/photos'
import { FACTS, NAV } from '../content'
import './top.css'

export function Nav() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`nav${solid ? ' nav--solid' : ''}`}>
      <div className="wrap nav-row">
        <a className="nav-logo" href="#top" aria-label="Hameediyah, back to top">
          <Signboard compact title="Hameediyah" />
        </a>
        <nav aria-label="Main">
          <ul className="nav-links">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-green nav-cta" href="#visit">Visit us</a>
      </div>
    </header>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-place">Lebuh Campbell, George Town, Penang</p>
          <h1>Penang's nasi kandar, since 1907.</h1>
          <p className="hero-lead">
            Malaysia's oldest nasi kandar restaurant. One family, seven generations, and recipes still poured over rice the
            way they were more than a century ago.
          </p>
          <div className="hero-cta">
            <a className="btn btn-sign" href="#menu">See the menu</a>
            <a className="btn btn-outline" href="#story">Read our story</a>
          </div>
        </div>
        <figure className="hero-mural">
          <div className="hero-photo">
            <img
              src={PHOTO.muralHero}
              width="1500"
              height="1130"
              fetchPriority="high"
              alt="The Hameediyah wall mural: a white-bearded nasi kandar seller in a yellow shirt and songkok gives a thumbs up behind a real black bicycle, its rack carrying a rattan basket, a tiffin carrier and clay pots"
            />
            <svg className="hero-script" viewBox="0 0 1500 1130" aria-hidden="true">
              <path id="hero-script-path" d="M30 700 C110 470 330 250 690 130" fill="none" />
              <text className="mural-script" fontSize="70" fill="#1B2A1E">
                <textPath href="#hero-script-path">Pi mai, pi mai, Hameediyah jugak</textPath>
              </text>
            </svg>
          </div>
          <figcaption>Go here, go there, it's still Hameediyah.</figcaption>
        </figure>
      </div>
      <p className="hero-scroll" aria-hidden="true">Scroll to serve a plate</p>
    </section>
  )
}

export function Facts() {
  return (
    <div className="facts">
      <ul className="wrap facts-row">
        {FACTS.map((f) => (
          <li key={f.big}>
            <strong>{f.big}</strong>
            <span>{f.small}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
