import Signboard from '../art/Signboard'
import { PHOTO } from '../art/photos'
import { CONTACT, DISHES, FEATURES, LOCATIONS, TIMELINE } from '../content'
import './rest.css'

export function Heritage() {
  return (
    <section className="section heritage" id="heritage">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Heritage</p>
          <h2>More than a century on Lebuh Campbell</h2>
        </div>
        <ol className="tl">
          {TIMELINE.map((t, i) => (
            <li key={i} className="tl-item">
              <span className="tl-year">{t.year}</span>
              <div>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Today() {
  return (
    <section className="section today" id="today">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Hameediyah today</p>
          <h2>The same recipes, served today.</h2>
          <p>
            Step in from the five-foot way and you'll find what has always been here: the counter, the big aluminium
            pots, and the smell of curry that reaches the street before you do.
          </p>
        </div>
        <div className="today-grid">
          <figure className="today-figure">
            <img
              className="today-art"
              src={PHOTO.queue}
              width="1400"
              height="1049"
              loading="lazy"
              alt="Diners queueing on Lebuh Campbell under the Hameediyah signboard"
            />
            <figcaption>Lunchtime on Lebuh Campbell.</figcaption>
          </figure>
          <ul className="today-list">
            {FEATURES.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Dishes() {
  return (
    <section className="section dishes" id="menu">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Signature dishes</p>
          <h2>Dishes Penang comes back for</h2>
          <p>
            Our curries are well spiced rather than fiery: layered, aromatic and made to be poured over rice. Ask us about
            the spice level, and we'll help you build the perfect plate.
          </p>
        </div>
        {/* VERIFY: add the full menu with current prices from the restaurant. */}
        <ul className="dish-grid">
          {DISHES.map((d) => (
            <li key={d.name} className="dish">
              <div className="dish-art">
                <img src={PHOTO.dishes[d.art]} width="1000" height="750" loading="lazy" alt={d.alt} />
              </div>
              <h3>{d.name}</h3>
              <p>{d.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Locations() {
  const [flagship, ...branches] = LOCATIONS
  return (
    <section className="section locations" id="locations">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Locations</p>
          <h2>Find a Hameediyah near you</h2>
        </div>
        <div className="loc-grid">
          <article className="loc-flagship">
            <img
              className="loc-photo"
              src={PHOTO.storefront}
              width="825"
              height="1100"
              loading="lazy"
              alt="The yellow Hameediyah shophouse on Lebuh Campbell with its green signboards"
            />
            <p className="loc-region">{flagship.region}</p>
            <h3>{flagship.name}</h3>
            <p>{flagship.body}</p>
            {flagship.extra.map((e) => (
              <p key={e}>{e}</p>
            ))}
          </article>
          <ul className="loc-list">
            {branches.map((b) => (
              <li key={b.name}>
                <h3>{b.name}</h3>
                <p className="loc-region">{b.region}</p>
                <p>{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Visit() {
  return (
    <section className="visit" id="visit">
      <div className="visit-photo">
        <img
          src={PHOTO.street}
          width="1600"
          height="1200"
          loading="lazy"
          alt="Lebuh Campbell in George Town, with diners queueing outside Hameediyah"
        />
      </div>
      <div className="wrap visit-inner">
        <p className="kicker">Come hungry</p>
        <h2>The pots are on.</h2>
        <p className="visit-lead">Join more than a century of diners on Lebuh Campbell. Dine in, take away, or call us for catering.</p>
        <dl className="visit-info">
          <div>
            <dt>Address</dt>
            <dd>{CONTACT.address}</dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>{CONTACT.hours}</dd>
          </div>
          <div>
            <dt>Call</dt>
            <dd>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </dd>
          </div>
        </dl>
        <div className="visit-cta">
          <a className="btn btn-green" href={CONTACT.maps} target="_blank" rel="noopener noreferrer">Get directions</a>
          <a className="btn btn-outline" href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <Signboard className="footer-sign" />
        <div>
          <p>© Hameediyah Restaurant Sdn Bhd. Serving Penang since 1907.</p>
          <p>164A Lebuh Campbell, George Town, Penang. {CONTACT.phone}</p>
        </div>
      </div>
    </footer>
  )
}
