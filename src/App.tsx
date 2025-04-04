import React from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import Terminal from './components/Terminal'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  padding: 20px;
`

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Terminal />
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
