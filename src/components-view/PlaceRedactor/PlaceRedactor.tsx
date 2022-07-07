import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { shallowEqual } from 'react-redux'

import style from './PlaceRedactor.module.scss'

import { ModelsView } from 'types'

import { Button, Icon, Input, InputFile, Select } from 'components-ui'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'

/* START - View PlaceRedactor additional imports and module code. */
import * as constants from '../../common/constants'

const categoryList = constants.categoryItemsList.map((categoryItem) => categoryItem.title)

const PlaceRedactor: React.FC = () => {
    /* START - Get store values. */
    const reducerState = useTypedSelector((state) => state.authorization, shallowEqual)

    // TODO START - вынести redux
    const [category, setCategory] = React.useState('Кафе')
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [metro, setMetro] = React.useState('Девяткино')
    const [address, setAddress] = React.useState('')
    const [rating, setRating] = React.useState('')
    const [district, setDistrict] = React.useState('')
    const [image, setImage] = React.useState<File | null>(null)
    const [latitude, setLatitude] = React.useState('')
    const [longitude, setLongitude] = React.useState('')
    const [averageCheck, setAverageCheck] = React.useState('')
    const [openingHours, setOpeningHours] = React.useState('')
    const [telephone, setTelephone] = React.useState('')
    const [kitchen, setKitchen] = React.useState('')
    // TODO END - вынести redux
    /* END - Get store values. */

    /* START - Tracking side-effects. */
    const dispatch = useTypedDispatch()

    const navigate = useNavigate()
    const location = useLocation()
    /* END - Tracking side-effects. */

    /* START - View PlaceRedactor content. */
    if (!reducerState.userData || reducerState.userData.role !== 'ADMIN') {
        navigate('/profile')
    }

    const handleBackClick = () => {
        if (location.state) {
            const locationState = location.state as ModelsView.ILocationState
            navigate(locationState.from.pathname)
        } else {
            navigate('/profile')
        }
    }

    const handleCreatePlace = () => {
        // TODO
    }

    return (
        <div className={style.container}>
            <div className={style.title}>
                <Icon type={'Back'} height={'24px'} onClick={handleBackClick} />
                <h2>Создание места</h2>
            </div>

            <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <Select
                    value={category}
                    label={'Категория'}
                    itemList={categoryList}
                    onChange={(value) => setCategory(value)}
                />

                <Input label={'Название'} type={'Default'} value={name} onChange={(value) => setName(value)} />

                <Input
                    label={'Описание'}
                    type={'Default'}
                    value={description}
                    onChange={(value) => setDescription(value)}
                />

                <Select
                    value={metro}
                    label={'Метро'}
                    itemList={constants.metroList}
                    onChange={(value) => setMetro(value)}
                />

                <Input label={'Адрес'} type={'Default'} value={address} onChange={(value) => setAddress(value)} />

                <Input label={'Рейтинг'} type={'Default'} value={rating} onChange={(value) => setRating(value)} />

                <Input label={'Район'} type={'Default'} value={district} onChange={(value) => setDistrict(value)} />

                <InputFile onChange={(file) => setImage(file)} />

                <Input label={'Широта'} type={'Default'} value={latitude} onChange={(value) => setLatitude(value)} />

                <Input label={'Долгота'} type={'Default'} value={longitude} onChange={(value) => setLongitude(value)} />

                <Input
                    label={'Средний чек'}
                    type={'Default'}
                    value={averageCheck}
                    onChange={(value) => setAverageCheck(value)}
                />

                <Input
                    label={'Часы работы'}
                    type={'Default'}
                    value={openingHours}
                    onChange={(value) => setOpeningHours(value)}
                />

                <Input label={'Телефон'} type={'Default'} value={telephone} onChange={(value) => setTelephone(value)} />

                <Input label={'Кухня'} type={'Default'} value={kitchen} onChange={(value) => setKitchen(value)} />

                <Button type={'Primary'} size={'Medium'} onClick={handleCreatePlace}>
                    Создать
                </Button>
            </div>
        </div>
    )
}

export default PlaceRedactor
