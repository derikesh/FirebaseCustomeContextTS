import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FireBaseContent } from './Context/Firebase.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FireBaseContent>
    <App />
   </FireBaseContent>
  </React.StrictMode>,
)
