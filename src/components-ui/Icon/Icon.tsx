import React from 'react'

import style from './Icon.module.scss'

import { ModelsUI, EnumsUI } from 'types'

/* START - Icon additional imports and module code. */
import foodImage from '../../assets/food.svg'
import coffeeImage from '../../assets/coffee.svg'
import treeImage from '../../assets/tree.svg'
import barImage from '../../assets/bar.svg'
import checkImage from '../../assets/check.svg'
import loaderImage from '../../assets/loader.svg'
import mapImage from '../../assets/map.svg'
import errorImage from '../../assets/error.png'
import emptyImage from '../../assets/empty.svg'
import openEyeImage from '../../assets/open_eye.svg'
import closeEyeImage from '../../assets/close_eye.svg'
import emailImage from '../../assets/email.svg'
import avatarImage from '../../assets/avatar.png'
import logoutImage from '../../assets/logout.svg'
import backImage from '../../assets/back.svg'
import arrowImage from '../../assets/arrow.svg'
import arrowLeft from '../../assets/arrow_left.svg'

const getIcon = (type: EnumsUI.IconType): string => {
    switch (type) {
        case 'FoodLight':
        case 'FoodDark':
            return foodImage
        case 'CoffeeLight':
        case 'CoffeeDark':
            return coffeeImage
        case 'TreeLight':
        case 'TreeDark':
            return treeImage
        case 'BarLight':
        case 'BarDark':
            return barImage
        case 'Check':
            return checkImage
        case 'Loader':
            return loaderImage
        case 'Map':
            return mapImage
        case 'Error':
            return errorImage
        case 'Empty':
            return emptyImage
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
        case 'ArrowLeft':
            return arrowLeft
        default:
            return ''
    }
}

const Icon: React.FC<ModelsUI.IIconProps> = ({ type, height = '100%', width = '100%', onClick }) => {
    const icon = getIcon(type)

    const handleIconClick = () => {
        if (onClick) {
            onClick()
        }
    }

    return (
        <img
            src={icon}
            className={style[type]}
            height={height}
            width={width}
            alt={`Icon ${type}`}
            onClick={handleIconClick}
        />
    )
}

export default React.memo(Icon)
