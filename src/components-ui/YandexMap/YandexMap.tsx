import React from 'react'

import { YMaps, Map, Placemark } from 'react-yandex-maps'

import style from './YandexMap.module.scss'

import { ModelsUI } from 'types'

/* START - YandexMap additional imports and module code. */
import { Button, Modal } from 'components-ui'

import rateImage from '../../assets/rate.svg'
import geoImage from '../../assets/geo.svg'

const renderBalloonContent = (
    name: string,
    address: string,
    description: string,
    rating: number,
    imagesList: string[],
    metroList: string[],
    isPlacemarkLoaded: boolean,
) => `
    <div style="width: 230px">
        <div style="
            background-image: url(${imagesList.length > 0 ? imagesList[0] : ''});
            background-repeat: no-repeat;
            background-position: center center;
            background-attachment: fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            height: 120px;
            border-radius: 10px;"
        ></div>

        <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-top: 14px;">
            <div style="font-size: 20px; font-weight: bold; color: #282828;">${name}</div>
            
            <div style="display: flex; gap: 6px; align-items: center;">
                <img style="height: 20px;" src="${rateImage}" />
                <div style="font-size: 20px; font-weight: bold; color: #282828;">${rating}</div>
            </div>
        </div>

        <div style="display: flex; gap: 6px; align-items: baseline;">
            <img style="height: 14px; filter: invert(86%) sepia(9%) saturate(176%) hue-rotate(201deg) brightness(85%) contrast(85%);" src="${geoImage}" />
            <div style="font-size: 14px; color: #b4b4bc; margin-top: 14px;">${address}</div>
        </div>
    
        <div style="display: flex; justify-content: center; margin-top: 10px">
            <button
                id="yandexMap_button_id"
                style="
                    outline: none;
                    border: none;
                    font-size: 14px;
                    font-weight: 600;
                    border-radius: 10px;
                    transition: 0.2s;
                    cursor: ${!isPlacemarkLoaded ? 'progress' : 'pointer'};
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 20px;
                    background-color: #ffffff;
                    color: #000000;
                    box-shadow: inset 0 0 0 1.5px #efeff1;
                    transition: 0.2s;
                    opacity: ${!isPlacemarkLoaded ? '0.5' : '1'};"
                onMouseOver="this.style.opacity = ${!isPlacemarkLoaded ? '1' : '0.8'}"
                onMouseOut="this.style.opacity = '1'" 
                onMouseDown="this.style.backgroundColor = '#efeff1'" 
                onMouseUp="this.style.backgroundColor = '#ffffff'"
            >Подробнее</button>
        </div>
    </div>`

const YandexMap: React.FC<ModelsUI.IYandexMapProps> = ({
    name,
    description,
    metroList,
    address,
    rating,
    imagesList,
    latitude,
    longitude,
    workingHoursList,
    averageCheck,
    phoneNumber,
    kitchenList,
}) => {
    const [isModalOpen, setModalOpen] = React.useState(false)
    const [isPlacemarkLoaded, setPlacemarkLoaded] = React.useState(false)

    const handleYandexMapButtonClick = () => {
        setModalOpen(true)
    }

    React.useEffect(() => {
        if (isPlacemarkLoaded) {
            const yandexMapButton = document.getElementById('yandexMap_button_id')

            if (yandexMapButton) {
                yandexMapButton.addEventListener('click', handleYandexMapButtonClick)

                return () => {
                    yandexMapButton.removeEventListener('click', handleYandexMapButtonClick)
                }
            }
        }
    }, [handleYandexMapButtonClick, isPlacemarkLoaded])

    const handleModalClose = () => {
        setModalOpen(false)
    }

    const handlePlacemarkLoad = () => {
        // TODO костыль
        setTimeout(() => {
            setPlacemarkLoaded(true)
        }, 1000)
    }

    const handlePhoneNumberCall = () => {
        window.open(`tel:${phoneNumber}`, '_self')
    }

    return (
        <React.Fragment>
            <YMaps>
                <Map
                    height={'100%'}
                    width={'100%'}
                    defaultState={{
                        center: [latitude, longitude],
                        zoom: 15,
                    }}
                >
                    <Placemark
                        onLoad={handlePlacemarkLoad}
                        geometry={[latitude, longitude]}
                        options={{
                            openEmptyBalloon: true,
                            hideIconOnBalloonOpen: false,
                            balloonCloseButton: false,
                        }}
                        properties={{
                            balloonContentBody: renderBalloonContent(
                                name,
                                address,
                                description,
                                rating,
                                imagesList,
                                metroList,
                                isPlacemarkLoaded,
                            ),
                        }}
                        modules={['geoObject.addon.balloon']}
                        instanceRef={(ref: any) => {
                            ref && ref.balloon.open()
                        }}
                    />
                </Map>
            </YMaps>

            <Modal isOpen={isModalOpen} title={name} onClose={handleModalClose}>
                <div className={style.modal}>
                    <div
                        className={style.modal__image}
                        style={{
                            backgroundImage: `url(${imagesList.length > 0 ? imagesList[0] : ''})`,
                        }}
                    />

                    <div className={style.modal__info}>
                        <div>
                            <div className={style.info__title}>Адрес</div>
                            <div className={style.info__text}>{address}</div>
                        </div>
                        <div>
                            <div className={style.info__title}>Время работы</div>
                            <div className={style.info__text}>
                                {workingHoursList.map(
                                    (item, index): JSX.Element => (
                                        <div key={index}>{item}</div>
                                    ),
                                )}
                            </div>
                        </div>
                        <div>
                            <div className={style.info__title}>Средний чек</div>
                            <div className={style.info__text}>{averageCheck} ₽</div>
                        </div>
                        <div>
                            <div className={style.info__title}>Кухня</div>
                            <div className={style.info__text}>{kitchenList.join(', ')}</div>
                        </div>

                        {phoneNumber.trim().length > 1 ? (
                            <div>
                                <div className={style.info__title}>Телефон заведения</div>
                                <div className={style.info__text}>{phoneNumber}</div>
                            </div>
                        ) : null}

                        {phoneNumber.trim().length > 1 ? (
                            <Button type={'Primary'} size={'Medium'} onClick={handlePhoneNumberCall}>
                                Позвонить
                            </Button>
                        ) : null}
                    </div>
                </div>
                <div style={{ marginTop: '30px' }}>{description}</div>
            </Modal>
        </React.Fragment>
    )
}

export default YandexMap
