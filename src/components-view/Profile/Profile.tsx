import React from 'react'
import { useNavigate } from 'react-router-dom'
import { shallowEqual } from 'react-redux'

import style from './Profile.module.scss'

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

    /* START - View Profile content. */
    const handleCreatePlaceClick = () => {
        navigate('/placeRedactor')
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh',
            }}
        >
            <h2>Данная страница находиться в разработке</h2>

            {reducerState.userData && reducerState.userData.role === 'ADMIN' ? (
                <Button type={'Primary'} size={'Medium'} onClick={handleCreatePlaceClick}>
                    Создать место
                </Button>
            ) : null}
        </div>
    )
}

export default Profile
