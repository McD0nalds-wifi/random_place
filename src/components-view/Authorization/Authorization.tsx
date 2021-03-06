import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { shallowEqual } from 'react-redux'

import style from './Authorization.module.scss'

import { ModelsView, EnumsView } from 'types'

import { Button, Icon, Input, Loader } from 'components-ui'

import * as authorizationThunk from '../../redux/thunks/authorization-thunk'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'

/* START - View Authorization additional imports and module code. */
// import saintPetersburgVideo from '../../assets/saint_petersburg.MP4'

const Authorization: React.FC = () => {
    /* START - Get store values. */
    const reducerState = useTypedSelector((state) => state.authorization, shallowEqual)
    /* END - Get store values. */

    /* START - Tracking side-effects. */
    const dispatch = useTypedDispatch()

    const navigate = useNavigate()
    const location = useLocation()
    const { page } = useParams<{ page: EnumsView.AuthorizationPageType }>()

    React.useEffect(() => {
        if (
            (reducerState.loginPhase === 'Success' || reducerState.checkAuthPhase === 'Success') &&
            reducerState.userData &&
            reducerState.userData.isActivated
        ) {
            if (location.state) {
                const locationState = location.state as ModelsView.ILocationState
                navigate(locationState.from.pathname)
            } else {
                navigate('/profile')
            }
        }
    }, [reducerState.loginPhase, reducerState.checkAuthPhase])

    const keyDownHandler = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                if (page === 'login') {
                    dispatch(authorizationThunk.performLoginFormSubmit())
                } else {
                    dispatch(authorizationThunk.performRegistrationFormSubmit())
                }
            }
        },
        [page],
    )

    React.useEffect(() => {
        document.addEventListener('keydown', keyDownHandler)

        return () => {
            document.removeEventListener('keydown', keyDownHandler)
        }
    }, [keyDownHandler])
    /* END - Tracking side-effects. */

    /* START - View Authorization content. */
    if (!page) {
        navigate('/authorization/login')
    }

    const isRegistrationButtonDisabled =
        reducerState.registrationEmailFieldError !== null ||
        reducerState.registrationPasswordFieldError !== null ||
        reducerState.registrationRepeatPasswordFieldError !== null ||
        reducerState.registrationPhase === 'InProgress'

    const isLoginButtonDisabled =
        reducerState.loginEmailFieldError !== null ||
        reducerState.loginPasswordFieldError !== null ||
        reducerState.loginPhase === 'InProgress'

    const handlePageParamChange = () => {
        navigate(`/authorization/${page === 'registration' ? 'login' : 'registration'}`)
    }

    const handleEmailFieldChange = (value: string) => {
        if (page === 'login') {
            dispatch(authorizationThunk.performInputLoginEmailField(value))
        } else {
            dispatch(authorizationThunk.performInputRegistrationEmailField(value))
        }
    }

    const handleEmailFieldBlur = (value: string) => {
        if (page === 'login') {
            dispatch(authorizationThunk.performInputLoginEmailFieldError(value))
        } else {
            dispatch(authorizationThunk.performInputRegistrationEmailFieldError(value))
        }
    }

    const handlePasswordFieldChange = (value: string) => {
        if (page === 'login') {
            dispatch(authorizationThunk.performInputLoginPasswordField(value))
        } else {
            dispatch(authorizationThunk.performInputRegistrationPasswordField(value))
        }
    }

    const handlePasswordFieldBlur = (value: string) => {
        if (page === 'login') {
            dispatch(authorizationThunk.performInputLoginPasswordFieldError(value))
        } else {
            dispatch(authorizationThunk.performInputRegistrationPasswordFieldError(value))
        }
    }

    const handleRepeatPasswordFieldChange = (value: string) => {
        if (page === 'registration') {
            dispatch(authorizationThunk.performInputRegistrationRepeatPasswordField(value))
        }
    }

    const handleRepeatPasswordFieldBlur = (value: string) => {
        if (page === 'registration') {
            dispatch(authorizationThunk.performInputRegistrationRepeatPasswordFieldError(value))
        }
    }

    const handleFormSubmit = () => {
        if (page === 'login') {
            dispatch(authorizationThunk.performLoginFormSubmit())
        } else {
            dispatch(authorizationThunk.performRegistrationFormSubmit())
        }
    }

    const handleBackClick = () => {
        navigate('/')
    }

    return (
        <div className={style.container}>
            <div className={style.image} />
            <div className={style.form}>
                <div className={style.form__wrapper}>
                    <div className={style.back}>
                        <Icon type={'ArrowLeft'} height={'56px'} onClick={handleBackClick} />
                    </div>

                    {page === 'login' ? (
                        <React.Fragment>
                            <h2 className={style.form__title}>??????????????????????</h2>
                            <Input
                                type={'Default'}
                                value={reducerState.loginEmailField}
                                label={'Email'}
                                placeholder={'example@mail.ru'}
                                icon={'Email'}
                                errorMessage={reducerState.loginEmailFieldError || undefined}
                                isBlock
                                onChange={handleEmailFieldChange}
                                onBlur={handleEmailFieldBlur}
                            />
                            <Input
                                type={'Password'}
                                value={reducerState.loginPasswordField}
                                label={'????????????'}
                                placeholder={'????????????????????????????????????'}
                                errorMessage={reducerState.loginPasswordFieldError || undefined}
                                isBlock
                                onChange={handlePasswordFieldChange}
                                onBlur={handlePasswordFieldBlur}
                            />

                            <Button
                                type={'Primary'}
                                size={'Medium'}
                                isDisabled={isLoginButtonDisabled}
                                onClick={handleFormSubmit}
                            >
                                ??????????
                            </Button>

                            <div className={style.form__footer}>
                                ?????? ?????????????????{' '}
                                <Button type={'Link'} size={'Medium'} onClick={handlePageParamChange}>
                                    ????????????????????????????????????
                                </Button>
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <h2 className={style.form__title}>??????????????????????</h2>
                            <Input
                                type={'Default'}
                                value={reducerState.registrationEmailField}
                                label={'Email'}
                                placeholder={'example@mail.ru'}
                                icon={'Email'}
                                errorMessage={reducerState.registrationEmailFieldError || undefined}
                                isBlock
                                onChange={handleEmailFieldChange}
                                onBlur={handleEmailFieldBlur}
                            />
                            <Input
                                type={'Password'}
                                value={reducerState.registrationPasswordField}
                                label={'????????????'}
                                placeholder={'????????????????????????????????????'}
                                errorMessage={reducerState.registrationPasswordFieldError || undefined}
                                isBlock
                                onChange={handlePasswordFieldChange}
                                onBlur={handlePasswordFieldBlur}
                            />
                            <Input
                                type={'Password'}
                                value={reducerState.registrationRepeatPasswordField}
                                label={'?????????????????? ????????????'}
                                placeholder={'????????????????????????????????????'}
                                errorMessage={reducerState.registrationRepeatPasswordFieldError || undefined}
                                isBlock
                                onChange={handleRepeatPasswordFieldChange}
                                onBlur={handleRepeatPasswordFieldBlur}
                            />

                            <Button
                                type={'Primary'}
                                size={'Medium'}
                                isDisabled={isRegistrationButtonDisabled}
                                onClick={handleFormSubmit}
                            >
                                ????????????????????????????????????
                            </Button>

                            <div className={style.form__footer}>
                                ???????? ???????????????{' '}
                                <Button type={'Link'} size={'Medium'} onClick={handlePageParamChange}>
                                    ??????????
                                </Button>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>

            <Loader
                isLoading={reducerState.registrationPhase === 'InProgress' || reducerState.loginPhase === 'InProgress'}
            />
        </div>
    )
}

export default Authorization
