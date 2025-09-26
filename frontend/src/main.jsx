import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from './contexts/GlobalContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom';

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <Router>
      <Provider>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
)