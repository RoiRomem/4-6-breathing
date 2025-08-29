import './App.css'
import Breathing from './components/breathing/breathing'

function App() {
  return (
    <>
      <nav id="navbar">
        <span id="logo" className='neon-sign'>Mindfulness</span>
      </nav>
      <main id="breath">
        <Breathing />
      </main>
      <footer>© 2025 Roi Romem</footer>
    </>
  )
}

export default App