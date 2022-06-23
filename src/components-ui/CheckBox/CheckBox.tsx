import React from 'react'

import style from './CheckBox.module.scss'

import { ModelsUI } from 'types'

/* START - CheckBox additional imports and module code. */
import { Icon } from '../index'

const CheckBox: React.FC<ModelsUI.ICheckboxProps> = ({ isChecked, title, onChange }) => {
    return (
        <label className={style.checkbox}>
            {title ? title : ''}
            <input type={'checkbox'} checked={isChecked} onChange={onChange} />
            <span className={style.checkmark}>{isChecked ? <Icon type={'Check'} /> : null}</span>
        </label>
    )
}

export default React.memo(CheckBox)
