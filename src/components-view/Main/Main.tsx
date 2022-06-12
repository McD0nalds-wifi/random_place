import React from 'react'

import { shallowEqual, useDispatch } from 'react-redux'

import style from './Main.module.scss'

import { ModelsUI } from 'types'

import {
    Button,
    ButtonGroup,
    CheckBox,
    Header,
    Icon,
    Loader,
    Slider,
    SliderMenu,
    Title,
    YandexMap,
} from 'components-ui'

import * as mainThunk from '../../redux/thunks/main-thunk'

import { useTypedSelector } from '../../hooks/useTypedSelector'

/* START - View Main additional imports and module code. */
import * as constants from '../../common/constants'

import { MainStateType } from '../../redux/reducers/main-reducer'

const renderMenuContent = (reducerState: MainStateType, dispatch: any) => {
    const blurredBackgroundTopRef = React.useRef<HTMLDivElement | null>(null)
    const blurredBackgroundBottomRef = React.useRef<HTMLDivElement | null>(null)

    const handleButtonGroupChange = (buttonItem: ModelsUI.IButtonGroupItem) => {
        if (!buttonItem.isActive) {
            dispatch(mainThunk.performInputAddCategoryItem(buttonItem.title))
        } else {
            dispatch(mainThunk.performInputDeleteCategoryItem(buttonItem.title))
        }
    }

    const handleDistrictBlockScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if (blurredBackgroundTopRef.current && blurredBackgroundBottomRef.current) {
            if (event.currentTarget.scrollTop > 10 && event.currentTarget.scrollTop < 640) {
                blurredBackgroundTopRef.current.style.opacity = '1'
                blurredBackgroundBottomRef.current.style.opacity = '1'
                blurredBackgroundTopRef.current.style.zIndex = '2'
                blurredBackgroundBottomRef.current.style.zIndex = '2'
            } else if (event.currentTarget.scrollTop <= 10) {
                blurredBackgroundTopRef.current.style.opacity = '0'
                blurredBackgroundTopRef.current.style.zIndex = '0'
            } else {
                blurredBackgroundBottomRef.current.style.opacity = '0'
                blurredBackgroundBottomRef.current.style.zIndex = '0'
            }
        }
    }

    const handleAllDistrictsChange = () => {
        dispatch(mainThunk.performInputAllDistrictsChecked())
    }

    const handleDistrictChange = (districtItemId: number) => {
        dispatch(mainThunk.performInputDistrictChecked(districtItemId))
    }

    const handleRangeMinValueChange = (value: number) => {
        dispatch(mainThunk.performInputRangeMinValueChange(value))
    }

    const handleRangeMaxValueChange = (value: number) => {
        dispatch(mainThunk.performInputRangeMaxValueChange(value))
    }

    return (
        <React.Fragment>
            <Title level={2}>Категория</Title>

            <div className={style.menu__offset}>
                <ButtonGroup itemsList={constants.categoryItemsList} onChange={handleButtonGroupChange} />
            </div>

            <Title level={2}>Район</Title>

            <div className={style.menu__block} onScroll={handleDistrictBlockScroll}>
                <div className={style.blurredBackground_top} ref={blurredBackgroundTopRef} />

                <div className={style.district}>
                    <div className={style.district__title}>Все</div>
                    <CheckBox isChecked={reducerState.isAllDistrictsChecked} onChange={handleAllDistrictsChange} />
                </div>

                {reducerState.districtList.map(
                    (districtItem): JSX.Element => (
                        <div className={style.district} key={`DistrictItem-${districtItem.id}`}>
                            <div className={style.district__title}>{districtItem.title}</div>
                            <CheckBox
                                isChecked={districtItem.isChecked}
                                onChange={() => handleDistrictChange(districtItem.id)}
                            />
                        </div>
                    ),
                )}
                <div className={style.blurredBackground_bottom} ref={blurredBackgroundBottomRef} />
            </div>

            <Title level={2}>Средний чек</Title>

            <div className={style.menu__offset}>
                <div className={style.menu__slider}>
                    <Slider
                        minValue={0}
                        maxValue={10000}
                        rangeMinValue={reducerState.rangeMinValue}
                        rangeMaxValue={reducerState.rangeMaxValue}
                        onRangeMinValueChange={handleRangeMinValueChange}
                        onRangeMaxValueChange={handleRangeMaxValueChange}
                    />
                </div>

                <div className={style.sliderContent__title}>
                    {reducerState.rangeMinValue} - {reducerState.rangeMaxValue} ₽
                </div>
            </div>
        </React.Fragment>
    )
}

const Main: React.FC = () => {
    /* START - Get store values. */
    const reducerState = useTypedSelector((state) => state.main, shallowEqual)
    /* END - Get store values. */

    /* START - Tracking side-effects. */
    const dispatch = useDispatch<any>()
    /* END - Tracking side-effects. */

    /* START - View MainApp content. */
    const handleSearchPlaceClick = () => {
        dispatch(mainThunk.callPostRandomPlace())
    }

    return (
        <div>
            <Header />

            <div className={style.divider} />

            <div className={style.container}>
                <div className={style.menu}>
                    {renderMenuContent(reducerState, dispatch)}

                    <div className={style.menu__button}>
                        <Button type={'Primary'} size={'Medium'} onClick={handleSearchPlaceClick}>
                            Поиск места
                        </Button>
                    </div>
                </div>
                <div className={style.map}>
                    {(reducerState.randomPlacePhase === 'Success' || reducerState.randomPlacePhase === 'InProgress') &&
                    reducerState.randomPlaceData ? (
                        <YandexMap
                            name={reducerState.randomPlaceData.name}
                            description={reducerState.randomPlaceData.description}
                            metroList={reducerState.randomPlaceData.metroList}
                            address={reducerState.randomPlaceData.address}
                            rating={reducerState.randomPlaceData.rating}
                            imagesList={reducerState.randomPlaceData.imagesList}
                            latitude={reducerState.randomPlaceData.latitude}
                            longitude={reducerState.randomPlaceData.longitude}
                            workingHoursList={reducerState.randomPlaceData.workingHoursList}
                            averageCheck={reducerState.randomPlaceData.averageCheck}
                            phoneNumber={reducerState.randomPlaceData.phoneNumber}
                            kitchenList={reducerState.randomPlaceData.kitchenList}
                        />
                    ) : reducerState.randomPlacePhase === 'Success' && !reducerState.randomPlaceData ? (
                        <div className={style.emptyMap}>
                            <Icon type={'Sad'} />

                            <div className={style.emptyMap__title}>К сожалению по вашему запросу ничего не найдено</div>
                        </div>
                    ) : reducerState.randomPlacePhase === 'Failure' ? (
                        <div className={style.errorMap}>
                            <Icon type={'Error'} />

                            <div className={style.emptyMap__title}>Произошла непредвиденная ошибка</div>
                            <div className={style.emptyMap__title}>Попробуйте повторить запрос чуть позже</div>
                        </div>
                    ) : (
                        <div className={style.emptyMap}>
                            <Icon type={'Map'} />

                            <div className={style.emptyMap__title}>Начните поиск места</div>
                        </div>
                    )}
                </div>

                <div className={style.mobileMenu}>
                    <SliderMenu>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                            <Button type={'Primary'} size={'Small'} onClick={handleSearchPlaceClick}>
                                Поиск места
                            </Button>
                        </div>

                        {renderMenuContent(reducerState, dispatch)}
                    </SliderMenu>
                </div>
            </div>

            <Loader isLoading={reducerState.randomPlacePhase === 'InProgress'} />
        </div>
    )
}

export default Main