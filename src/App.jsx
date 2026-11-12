import Hero from './components/Hero.jsx'
import Vibes from './components/Vibes.jsx'
import Gallery from './components/Gallery.jsx'
import Join from './components/Join.jsx'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Vibes />
        <Gallery />
        <Join />
      </main>
      <footer className="footer">
        <p>Made with love, rhythm &amp; recycled wood ☮ © {new Date().getFullYear()} Lil Dude</p>
      </footer>
    </>
  )
}
