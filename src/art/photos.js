import basketBack from '../assets/photos/cut-basket-back.webp'
import basketFront from '../assets/photos/cut-basket-front.webp'
import claypot from '../assets/photos/cut-claypot.webp'
import lamb from '../assets/photos/cut-lamb.webp'
import plate from '../assets/photos/cut-plate.webp'
import tiffinLid from '../assets/photos/cut-tiffin-lid.webp'
import tierA from '../assets/photos/cut-tiffin-tier-a.webp'
import tierB from '../assets/photos/cut-tiffin-tier-b.webp'
import tierC from '../assets/photos/cut-tiffin-tier-c.webp'
import okra0 from '../assets/photos/cut-okra-0.webp'
import okra1 from '../assets/photos/cut-okra-1.webp'
import okra2 from '../assets/photos/cut-okra-2.webp'
import okra3 from '../assets/photos/cut-okra-3.webp'
import leaf1 from '../assets/photos/cut-leaf-1.webp'
import leaf2 from '../assets/photos/cut-leaf-2.webp'
import leaf3 from '../assets/photos/cut-leaf-3.webp'
import leaf4 from '../assets/photos/cut-leaf-4.webp'
import chilli0 from '../assets/photos/cut-chilli-0.webp'
import chilli2 from '../assets/photos/cut-chilli-2.webp'
import texRice from '../assets/photos/tex-rice.webp'
import texCurry from '../assets/photos/tex-curry.webp'
import muralHero from '../assets/photos/mural-hero.webp'
import muralPortrait from '../assets/photos/mural-portrait.webp'
import hawkers from '../assets/photos/photo-hawkers-1928.webp'
import storefront from '../assets/photos/photo-storefront.webp'
import street from '../assets/photos/photo-street.webp'
import queue from '../assets/photos/photo-queue.webp'
import dishKandar from '../assets/photos/dish-nasi-kandar.webp'
import dishBiryani from '../assets/photos/dish-nasi-biryani.webp'
import dishMurtabak from '../assets/photos/dish-murtabak.webp'
import dishKapitan from '../assets/photos/dish-chicken-kapitan.webp'
import dishRendang from '../assets/photos/dish-beef-rendang.webp'
import dishKurma from '../assets/photos/dish-mutton-kurma.webp'

// Pixel sizes of the cutouts, so SVG <image> boxes keep each photo's aspect ratio.
export const CUT = {
  basketBack: { src: basketBack, w: 640, h: 426 },
  basketFront: { src: basketFront, w: 640, h: 426 },
  claypot: { src: claypot, w: 260, h: 318 },
  lamb: { src: lamb, w: 480, h: 312 },
  plate: { src: plate, w: 1320, h: 518 },
  tiffinLid: { src: tiffinLid, w: 260, h: 126 },
  tiers: [
    { src: tierC, w: 260, h: 95 },
    { src: tierB, w: 260, h: 74 },
    { src: tierA, w: 260, h: 79 },
  ],
  okra: [
    { src: okra0, w: 120, h: 127 },
    { src: okra1, w: 120, h: 146 },
    { src: okra2, w: 120, h: 148 },
    { src: okra3, w: 120, h: 137 },
  ],
  leaves: [
    { src: leaf1, w: 90, h: 37 },
    { src: leaf2, w: 90, h: 39 },
    { src: leaf3, w: 90, h: 37 },
    { src: leaf4, w: 90, h: 56 },
  ],
  chillies: [
    { src: chilli0, w: 150, h: 32 },
    { src: chilli2, w: 150, h: 43 },
  ],
}

export const TEX = { rice: texRice, curry: texCurry }

export const PHOTO = {
  muralHero,
  muralPortrait,
  hawkers,
  storefront,
  street,
  queue,
  dishes: {
    kandar: dishKandar,
    biryani: dishBiryani,
    murtabak: dishMurtabak,
    kapitan: dishKapitan,
    rendang: dishRendang,
    kurma: dishKurma,
  },
}

// Size a cutout to a target width in SVG units, centred on the origin unless anchored top-left.
export function fitCut(cut, width, { anchor = 'center' } = {}) {
  const height = (cut.h / cut.w) * width
  const x = anchor === 'center' ? -width / 2 : 0
  const y = anchor === 'center' ? -height / 2 : 0
  return { href: cut.src, x, y, width, height }
}
