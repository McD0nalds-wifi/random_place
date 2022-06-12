import React from 'react'
import { ToastContainer } from 'react-toastify'

import { Provider } from 'react-redux'

import './styles/base.scss'

import { Main } from 'components-view'

/* START - View App additional imports and module code. */
import store from './redux/redux-store'

import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Main />

            <ToastContainer />
        </Provider>
    )
}

export default App
