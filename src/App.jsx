import { Facts, Hero, Nav } from './sections/Top'
import ServeScene from './sections/ServeScene'
import Story from './sections/Story'
import { Dishes, Footer, Heritage, Locations, Today, Visit } from './sections/Rest'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Facts />
        <ServeScene />
        <Story />
        <Heritage />
        <Today />
        <Dishes />
        <Locations />
        <Visit />
      </main>
      <Footer />
    </>
  )
}
