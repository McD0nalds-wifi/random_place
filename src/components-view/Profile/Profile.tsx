import React from 'react'
import { useNavigate } from 'react-router-dom'
import { shallowEqual } from 'react-redux'

import style from './Profile.module.scss'

import { EnumsView } from 'types'

import { Button } from 'components-ui'

import * as authorizationThunk from '../../redux/thunks/authorization-thunk'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'

/* START - View Profile additional imports and module code. */

const Profile: React.FC = () => {
    /* START - Get store values. */
    const reducerState = useTypedSelector((state) => state.authorization, shallowEqual)
    /* END - Get store values. */

    /* START - Tracking side-effects. */
    const dispatch = useTypedDispatch()

    const navigate = useNavigate()
    /* END - Tracking side-effects. */

    /* START - View Authorization content. */

    return <div>Profile</div>
}

export default Profile
