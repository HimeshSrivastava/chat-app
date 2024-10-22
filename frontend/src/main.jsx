import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContexProvider } from './components/contex/AuthContex.jsx'
import { SocketContexProvider } from './components/contex/SoketContex.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContexProvider>
    <SocketContexProvider>
    <App />
    </SocketContexProvider>
    </AuthContexProvider>
    </BrowserRouter>
  </StrictMode>,
)

