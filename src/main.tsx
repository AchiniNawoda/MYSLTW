
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import theme from './assets/Themes/Theme.ts'

createRoot(document.getElementById('root')!).render(

    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
,
)
