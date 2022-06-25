import React from 'react'

import style from './Modal.module.scss'

import { ModelsUI } from 'types'

/* START - Modal additional imports and module code. */
import { Icon } from 'components-ui'

const Modal: React.FC<ModelsUI.IModalProps> = ({ isOpen, title, isOverlayBlocked = false, onClose, children }) => {
    return (
        <div
            className={isOpen ? `${style.wrapper} ${style.active}` : style.wrapper}
            onClick={isOverlayBlocked ? () => null : () => onClose()}
        >
            <div
                className={isOpen ? `${style.content} ${style.active}` : style.content}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={style.header}>
                    <div className={style.header_title}>{title}</div>
                    <Icon type={'Close'} onClick={onClose} height={'32px'} width={'32px'} />
                </div>
                <div className={style.body}>{children}</div>
            </div>
        </div>
    )
}

export default Modal
