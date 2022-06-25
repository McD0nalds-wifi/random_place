import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import style from './Header.module.scss'

import { Button, Icon } from 'components-ui'

import * as authorizationThunk from '../../redux/thunks/authorization-thunk'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'

/* START - View Header additional imports and module code. */
import logoImage from '../../assets/logo.png'

const Header: React.FC = () => {
    /* START - Get store values. */
    const userData = useTypedSelector((state) => state.authorization.userData)
    /* END - Get store values. */

    /* START - Tracking side-effects. */
    const dispatch = useTypedDispatch()

    const navigate = useNavigate()
    const location = useLocation()
    /* END - Tracking side-effects. */

    /* START - View Header content. */
    if (location.pathname === '/authorization/login' || location.pathname === '/authorization/registration') {
        return null
    }

    const handleLoginClick = () => {
        navigate('/authorization/login')
    }

    const handleLogoClick = () => {
        navigate('/')
    }

    const handleUserIconClick = () => {
        navigate('/profile')
    }

    const handleLogoutIconClick = () => {
        dispatch(authorizationThunk.callPostLogout())
    }

    return (
        <div className={style.container}>
            <img src={logoImage} alt={'Logo'} className={style.logo} onClick={handleLogoClick} />

            {userData && userData.isActivated ? (
                <div className={style.ifno}>
                    <Icon type={'Avatar'} height={'34px'} onClick={handleUserIconClick} />
                    <Icon type={'Logout'} height={'34px'} onClick={handleLogoutIconClick} />
                </div>
            ) : (
                <Button type={'Primary'} size={'Large'} onClick={handleLoginClick}>
                    Войти
                </Button>
            )}
        </div>
    )
}

export default Header
