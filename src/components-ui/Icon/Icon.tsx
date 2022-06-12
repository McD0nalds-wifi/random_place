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
        default:
            return ''
    }
}

const Icon: React.FC<ModelsUI.IIconProps> = ({ type }) => {
    const icon = getIcon(type)

    return <img src={icon} className={style[type.toLocaleLowerCase()]} alt={`Icon ${type}`} />
}

export default React.memo(Icon)
