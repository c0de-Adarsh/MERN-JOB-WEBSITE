import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from "@mantine/core";
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './Store.jsx'
import { BrowserRouter as Router } from 'react-router';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <Provider store={store}>
     <Router>
    <App />
    </Router>
    </Provider>
    </MantineProvider>
  </StrictMode>,
)
