import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useTypedSelector } from '../hooks/useTypedSelector'

const RequireAuth = ({ children }: { children: React.ReactElement }) => {
    const userData = useTypedSelector((state) => state.authorization.userData)
    const location = useLocation()

    if (!userData || !userData.isActivated) {
        return <Navigate to={'/authorization/login'} state={{ from: location }} />
    }

    return children
}

export default RequireAuth
