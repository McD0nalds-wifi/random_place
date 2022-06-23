import React from 'react'

import Header from './Header/Header'
import Main from './Main/Main'

const Activate = React.lazy(() => import('./Activate/Activate'))
const Authorization = React.lazy(() => import('./Authorization/Authorization'))
const PlaceRedactor = React.lazy(() => import('./PlaceRedactor/PlaceRedactor'))
const Profile = React.lazy(() => import('./Profile/Profile'))

export { Activate, Authorization, Header, Main, PlaceRedactor, Profile }
