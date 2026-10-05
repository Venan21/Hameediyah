import { useEffect, useState } from 'react'
import Signboard from '../art/Signboard'
import OldManMural from '../art/OldManMural'
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
          <OldManMural
            className="hero-mural-art"
            title="Mural of a white-bearded nasi kandar seller in a yellow shirt and songkok, giving a thumbs up beside a black bicycle loaded with a basket, a tiffin carrier and clay pots"
          />
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
