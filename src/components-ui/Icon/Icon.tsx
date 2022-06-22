import React from 'react'

import style from './Icon.module.scss'

import { ModelsUI, EnumsUI } from 'types'

/* START - Icon additional imports and module code. */
import bowlImage from '../../assets/bowl.png'
import coffeeImage from '../../assets/coffee.png'
import treeImage from '../../assets/tree.png'
import tropicalDrinkImage from '../../assets/tropical_drink.png'
import checkImage from '../../assets/check.svg'
import rateImage from '../../assets/rate.svg'
import loaderImage from '../../assets/loader.svg'
import mapImage from '../../assets/map.png'
import errorImage from '../../assets/error.png'
import sadImage from '../../assets/sad.png'
import openEyeImage from '../../assets/open_eye.svg'
import closeEyeImage from '../../assets/close_eye.svg'
import emailImage from '../../assets/email.svg'
import avatarImage from '../../assets/avatar.png'
import logoutImage from '../../assets/logout.svg'
import backImage from '../../assets/back.svg'
import arrowImage from '../../assets/arrow.svg'

const getIcon = (type: EnumsUI.IconType): string => {
    switch (type) {
        case 'Bowl':
            return bowlImage
        case 'Coffee':
            return coffeeImage
        case 'Tree':
            return treeImage
        case 'TropicalDrink':
            return tropicalDrinkImage
        case 'Check':
            return checkImage
        case 'Rate':
            return rateImage
        case 'Loader':
            return loaderImage
        case 'Map':
            return mapImage
        case 'Error':
            return errorImage
        case 'Sad':
            return sadImage
        case 'OpenEye':
            return openEyeImage
        case 'CloseEye':
            return closeEyeImage
        case 'Email':
            return emailImage
        case 'Avatar':
            return avatarImage
        case 'Logout':
            return logoutImage
        case 'Back':
            return backImage
        case 'ArrowTop':
            return arrowImage
        case 'ArrowBottom':
            return arrowImage
        default:
            return ''
    }
}

const Icon: React.FC<ModelsUI.IIconProps> = ({ type, onClick }) => {
    const icon = getIcon(type)

    const handleIconClick = () => {
        if (onClick) {
            onClick()
        }
    }

    return <img src={icon} className={style[type.toLocaleLowerCase()]} alt={`Icon ${type}`} onClick={handleIconClick} />
}

export default React.memo(Icon)
