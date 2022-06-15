import React from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Provider } from 'react-redux'

import './styles/base.scss'
import 'react-toastify/dist/ReactToastify.css'

import { Activate, Authorization, Header, Main, Profile } from 'components-view'

/* START - View App additional imports and module code. */
import store from './redux/redux-store'
import RequireAuth from './hoc/RequireAuth'
import { useTypedDispatch } from './hooks/useTypedDispatch'
import * as authorizationThunk from './redux/thunks/authorization-thunk'

const Routers: React.FC = () => {
    const dispatch = useTypedDispatch()

    React.useEffect(() => {
        dispatch(authorizationThunk.callGetCheckAuth())
    }, [])

    return (
        <Routes>
            <Route path={'/'} element={<Main />} />

            <Route path={'/authorization/:page'} element={<Authorization />} />

            <Route path={'/activate/:link'} element={<Activate />} />

            <Route
                path={'/profile'}
                element={
                    <RequireAuth>
                        <Profile />
                    </RequireAuth>
                }
            />

            <Route path={'*'} element={<div>404 error</div>} />
        </Routes>
    )
}

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Header />

                <Routers />

                <ToastContainer />
            </Provider>
        </BrowserRouter>
    )
}

export default App
