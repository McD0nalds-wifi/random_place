import React from 'react'
import { createRoot } from 'react-dom/client'

// import ReactDOM from 'react-dom'

import App from './App'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(<App />)

// HMR (работает только в дев режиме)
// if (module && module.hot) module.hot.accept()
