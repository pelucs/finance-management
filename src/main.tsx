import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './contexts/AuthContext'
import { CountsContextProvider } from './contexts/CountsContext'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CountsContextProvider>
        <App />
      </CountsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
