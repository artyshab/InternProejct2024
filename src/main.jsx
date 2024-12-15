import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './design/Global.scss'
import App from './App.jsx'
import './i18n.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
