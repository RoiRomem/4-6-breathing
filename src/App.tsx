import './App.css'
import Breathing from './components/breathing/breathing'

function App() {
  const footerStyles: React.CSSProperties = {
    paddingLeft: "0.5%",
    fontFamily: "system-ui, sans-serif",
  }

  return (
    <>
      <div id="breath">
        <Breathing></Breathing>
      </div>
      <footer
        style={footerStyles}
        >© 2025 Roi Romem
      </footer>
    </>
  )
}

export default App
