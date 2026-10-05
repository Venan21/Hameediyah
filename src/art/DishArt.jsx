import Plate from './Plate'
import {
  ChickenLeg, CurryLeaf, DriedChili, FriedChicken, GravyOnRice, GravyPool, KurmaPool, Murtabak, OkraPiece,
  RendangChunks, RiceMound,
} from './food'

const at = (x, y, s = 1, r = 0) => `translate(${x} ${y}) rotate(${r}) scale(${s})`

function SideRice({ x = 250, y = 214 }) {
  return (
    <g transform={at(x, y)}>
      <RiceMound w={92} h={82} seed={3} />
    </g>
  )
}

const DISHES = {
  kandar: (
    <>
      <g transform={at(405, 228, 0.75)}><GravyPool /></g>
      <g transform={at(320, 205)}>
        <RiceMound w={112} h={104} seed={11} />
        <GravyOnRice w={112} h={104} seed={11} />
      </g>
      <g transform={at(470, 192, 0.9)}><FriedChicken /></g>
      {[[218, 226, 20], [244, 240, -30], [206, 246, 70], [262, 222, -10], [232, 256, 40]].map(([x, y, r], i) => (
        <g key={i} transform={at(x, y, 0.9, r)}><OkraPiece tip={i === 2} /></g>
      ))}
      <g transform={at(330, 132, 0.8, 20)}><CurryLeaf /></g>
    </>
  ),
  biryani: (
    <>
      <g transform={at(320, 220)}><RiceMound w={150} h={100} tone="biryani" seed={5} /></g>
      <g transform={at(440, 196, 1, -12)}><ChickenLeg /></g>
      <g transform={at(260, 150, 0.7, -20)}><CurryLeaf /></g>
      <g transform={at(360, 140, 0.6, 30)}><DriedChili /></g>
    </>
  ),
  murtabak: (
    <>
      <g transform={at(340, 206, 1.25)}><Murtabak /></g>
      <g transform={at(470, 240, 0.45)}><KurmaPool /></g>
    </>
  ),
  kapitan: (
    <>
      <g transform={at(410, 224, 0.75)}><GravyPool /></g>
      <SideRice />
      <g transform={at(420, 204, 0.95, -6)}><ChickenLeg tone="#B5562A" /></g>
      <g transform={at(370, 240, 0.7, 40)}><CurryLeaf /></g>
    </>
  ),
  rendang: (
    <>
      <SideRice />
      <g transform={at(420, 214)}><RendangChunks /></g>
      <g transform={at(330, 160, 0.6, -10)}><CurryLeaf /></g>
    </>
  ),
  kurma: (
    <>
      <SideRice />
      <g transform={at(420, 214)}><KurmaPool /></g>
    </>
  ),
}

export default function DishArt({ dish, label }) {
  return (
    <svg viewBox="10 40 680 320" role="img" aria-label={label}>
      <Plate x={350} y={200} />
      <g transform="translate(350 205) scale(1.45) translate(-350 -205)">{DISHES[dish]}</g>
    </svg>
  )
}
