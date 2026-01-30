import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// BrowserRouter - it allows your app to update the URl and display different pages without loading the whole page 
import { BrowserRouter } from "react-router";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// wrapping the App component ensure that routing functionality is available to App