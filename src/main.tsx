import React from 'react'
import ReactDOM from 'react-dom/client'
import ChatInterface from './components/ChatInterface'
import './app/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChatInterface />
  </React.StrictMode>,
)
