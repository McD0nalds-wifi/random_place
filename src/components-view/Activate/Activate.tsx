import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { shallowEqual } from 'react-redux'

import { Loader } from 'components-ui'

import * as activateThunk from '../../redux/thunks/activate-thunk'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'

/* START - View Activate additional imports and module code. */

const Activate: React.FC = () => {
    /* START - Get store values. */
    const reducerState = useTypedSelector((state) => state.activate, shallowEqual)
    /* END - Get store values. */

    /* START - Tracking side-effects. */
    const dispatch = useTypedDispatch()

    const navigate = useNavigate()
    const { link } = useParams<{ link: string }>()

    React.useEffect(() => {
        if (link) {
            dispatch(activateThunk.callGetActivateAccount(link))
        } else {
            navigate('/')
        }
    }, [link])

    React.useEffect(() => {
        if (reducerState.activateAccountPhase === 'Success') {
            navigate('/profile')
        } else if (reducerState.activateAccountPhase === 'Failure') {
            navigate('/')
        }
    }, [reducerState.activateAccountPhase])
    /* END - Tracking side-effects. */

    /* START - View Activate content. */

    return <Loader isLoading={true} />
}

export default Activate
