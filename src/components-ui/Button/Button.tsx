import React from 'react'

import style from './Button.module.scss'

import { ModelsUI } from 'types'

/* START - Button additional imports and module code. */
import { Icon } from 'components-ui'

const Button: React.FC<ModelsUI.IButtonProps> = ({ type, size, children, isDisabled = false, icon, onClick }) => {
    return (
        <button
            className={`${style[type.toLocaleLowerCase()]} ${style[size.toLocaleLowerCase()]}`}
            disabled={isDisabled}
            onClick={onClick}
        >
            {icon ? <Icon type={icon} /> : null}
            {children}
        </button>
    )
}

export default Button
