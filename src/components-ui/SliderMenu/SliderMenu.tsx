import React from 'react'

import style from './SliderMenu.module.scss'

import { ModelsUI } from 'types'

/* START - SliderMenu additional imports and module code. */

const sliderMinHeight = 104
const sliderMaxHeight = window.innerHeight - Math.round(window.innerHeight * 0.25)

const SliderMenu: React.FC<ModelsUI.ISliderMenuProps> = ({ children }) => {
    const [sliderHeight, setSliderHeight] = React.useState(sliderMinHeight)
    const [sliderPreviousHeight, setSliderPreviousHeight] = React.useState(sliderMinHeight)
    const sliderRef = React.useRef<HTMLDivElement | null>(null)

    const handleSliderTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        if (sliderRef.current && sliderRef.current.style.transition !== 'none 0s ease 0s') {
            sliderRef.current.style.transition = 'none'
        }

        if (
            window.innerHeight - event.changedTouches[0].clientY > sliderMinHeight &&
            window.innerHeight - event.changedTouches[0].clientY < sliderMaxHeight
        ) {
            setSliderPreviousHeight(sliderHeight)
            setSliderHeight(window.innerHeight - event.changedTouches[0].clientY)
        }
    }

    const handleSliderTouchEnd = () => {
        if (sliderRef.current) {
            sliderRef.current.style.transition = '0.6s'
            sliderRef.current.style.overflow = sliderHeight > sliderPreviousHeight ? 'auto' : 'hidden'

            setSliderHeight(sliderHeight > sliderPreviousHeight ? sliderMaxHeight : sliderMinHeight)
        }
    }

    return (
        <div
            className={style.container}
            style={{
                height: sliderHeight,
            }}
            ref={sliderRef}
        >
            <div onTouchMove={handleSliderTouchMove} onTouchEnd={handleSliderTouchEnd} className={style.lineWrapper}>
                <div className={style.line} />
            </div>

            <div>{children}</div>
        </div>
    )
}

export default SliderMenu
