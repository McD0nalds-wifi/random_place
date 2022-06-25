import React from 'react'

import style from './Input.module.scss'

import { ModelsUI } from 'types'

/* START - Input additional imports and module code. */
import { Icon } from 'components-ui'

const Input: React.FC<ModelsUI.IInputProps> = ({
    type,
    value,
    label,
    placeholder,
    errorMessage,
    isBlock = false,
    icon,
    onChange,
    onBlur = () => null,
}) => {
    const [isPasswordEyeOpen, setPasswordEyeOpen] = React.useState(false)

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    const handleBlurInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        onBlur(event.target.value)
    }

    const handleChangePasswordEye = () => {
        setPasswordEyeOpen((prev) => !prev)
    }

    return (
        <div className={`${style.wrapper} ${errorMessage ? style.wrapper_error : ''}`}>
            {label ? <div className={style.label}>{label}</div> : null}

            <input
                className={`${style.input} ${errorMessage ? style.input_error : ''} ${
                    type === 'Password' || icon ? style.input_offset : ''
                }`}
                style={{ width: isBlock ? '100%' : 'fit-content' }}
                type={type === 'Password' && !isPasswordEyeOpen ? 'password' : 'text'}
                value={value}
                placeholder={placeholder}
                onChange={handleChangeInput}
                onBlur={handleBlurInput}
            />

            {type === 'Password' ? (
                <div className={style.passwordEye} onClick={handleChangePasswordEye}>
                    <Icon type={isPasswordEyeOpen ? 'OpenEye' : 'CloseEye'} height={'32px'} width={'32px'} />
                </div>
            ) : icon ? (
                <div className={style.icon}>
                    <Icon type={icon} height={'32px'} width={'32px'} />
                </div>
            ) : null}

            <div className={`${style.error} ${errorMessage ? style.error_show : style.error_hide}`}>
                <div>{errorMessage || ''}</div>
            </div>
        </div>
    )
}

export default Input
