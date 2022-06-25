import React from 'react'

import { YMaps, Map, Placemark } from 'react-yandex-maps'

import style from './YandexMap.module.scss'
import './Balloon.css'

import { ModelsUI } from 'types'

/* START - YandexMap additional imports and module code. */
import { Button, Icon, Modal } from 'components-ui'

import starImage from '../../assets/star.svg'
import locationImage from '../../assets/location.svg'

const renderBalloonContent = (
    name: string,
    address: string,
    rating: number,
    imagesList: string[],
    isPlacemarkLoaded: boolean,
) => `
    <div class='container'>
        <div class='placeImage' style="background-image: url(${imagesList.length > 0 ? imagesList[0] : ''});"></div>

        <div class='header'>
            <div class='header__title'>${name}</div>
            <div class='header__likeIcon'></div>
        </div>

        <div class='info'>
            <div class='info__address'>
                <img height='20px' width='20px' src='${locationImage}' alt='location' />
                <div class='address__title'>${address}</div>
            </div>

            <div class='info__rate'>
                <img height='17px' width='17px' src='${starImage}' alt='rate' />
                <div class='rate__title'>${rating}</div>
            </div>
        </div>
    
        <div class='footer'>
            <button
                id="yandexMap_button_id"
                class='button'
                style="
                    cursor: ${!isPlacemarkLoaded ? 'progress' : 'pointer'};
                    opacity: ${!isPlacemarkLoaded ? '0.5' : '1'};"
                onMouseOver="this.style.opacity = ${!isPlacemarkLoaded ? '1' : '0.8'}"
            >Подробнее</button>
        </div>
    </div>`

const YandexMap: React.FC<ModelsUI.IYandexMapProps> = ({
    name,
    category,
    description,
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
                                rating,
                                imagesList,
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
                            <div className={style.info__title}>
                                {category === 'Parks' ? 'Стоимость входа' : 'Средний чек'}
                            </div>
                            <div className={style.info__text}>
                                {averageCheck === 0 ? 'бесплатно' : `${averageCheck} ₽`}
                            </div>
                        </div>

                        {category !== 'Parks' ? (
                            <div>
                                <div className={style.info__title}>Кухня</div>
                                <div className={style.info__text}>{kitchenList.join(', ')}</div>
                            </div>
                        ) : null}

                        {phoneNumber.trim().length > 1 ? (
                            <div>
                                <div className={style.info__title}>Телефон заведения</div>
                                <div className={style.info__text}>{phoneNumber}</div>
                            </div>
                        ) : null}

                        <div className={style.info__icons}>
                            {phoneNumber.trim().length > 1 ? (
                                <Icon
                                    type={'CircledPhone'}
                                    height={'40px'}
                                    width={'40px'}
                                    onClick={handlePhoneNumberCall}
                                />
                            ) : null}
                            <Icon type={'CircledHeart'} height={'40px'} width={'40px'} />
                        </div>
                    </div>
                </div>
                <div className={style.info__description}>{description}</div>
            </Modal>
        </React.Fragment>
    )
}

export default YandexMap
