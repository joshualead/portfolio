import { useState } from 'react'
import Terminal from './components/Terminal'
import styled from 'styled-components'
import { theme } from './styles/theme'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.sans};
`

function App() {
  const [showTerminal, setShowTerminal] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  const handleTerminalComplete = () => {
    setIsComplete(true)
    // Don't hide the terminal immediately
    // Instead, we can add a fade-out animation after a delay
    setTimeout(() => {
      setShowTerminal(false)
    }, 2000) // 2 second delay before hiding
  }

  return (
    <AppContainer>
      {showTerminal && <Terminal onComplete={handleTerminalComplete} />}
    </AppContainer>
  )
}

export default App
