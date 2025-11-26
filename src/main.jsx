import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Web3Provider from "./context/Web3Provider";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
   
<Web3Provider>
  <StrictMode>
    <App />
  </StrictMode>

</Web3Provider>
    
 
)
