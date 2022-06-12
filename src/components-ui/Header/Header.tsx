import React from 'react'

import style from './Header.module.scss'

/* START - Header additional imports and module code. */
import { Button, Modal } from 'components-ui'

const Header: React.FC = () => {
    const [isModalOpen, setModalOpen] = React.useState(false)

    const handleModalOpen = () => {
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    return (
        <div className={style.container}>
            <div className={style.logo}>Random Place</div>
            <Button type={'Primary'} size={'Medium'} onClick={handleModalOpen}>
                Войти
            </Button>

            <Modal isOpen={isModalOpen} title={'Авторизация'} onClose={handleModalClose}>
                <div className={style.modal}>Данный функционал временно недоступен</div>
            </Modal>
        </div>
    )
}

export default Header
