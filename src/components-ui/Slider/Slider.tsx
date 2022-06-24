import React from 'react'

import style from './Slider.module.scss'

import { ModelsUI } from 'types'

/* START - Slider additional imports and module code. */

const Slider: React.FC<ModelsUI.ISliderProps> = ({
    minValue,
    maxValue,
    rangeMinValue,
    rangeMaxValue,
    onRangeMinValueChange,
    onRangeMaxValueChange,
}) => {
    const progressRef = React.useRef<HTMLDivElement | null>(null)
    const minValueRef = React.useRef<HTMLInputElement | null>(null)
    const maxValueRef = React.useRef<HTMLInputElement | null>(null)

    const rangeGap = Math.floor(maxValue * 0.2)

    React.useEffect(() => {
        handleMinRangeChange()
        handleMaxRangeChange()
    }, [])

    const handleMinRangeChange = () => {
        if (progressRef.current && minValueRef.current) {
            if (rangeMaxValue - +minValueRef.current.value < rangeGap) {
                onRangeMinValueChange(rangeMaxValue - rangeGap)
            } else {
                const percent = (+minValueRef.current.value / +minValueRef.current.max) * 100
                progressRef.current.style.left = `${percent}%`

                onRangeMinValueChange(+minValueRef.current.value)
            }
        }
    }

    const handleMaxRangeChange = () => {
        if (progressRef.current && maxValueRef.current) {
            if (+maxValueRef.current.value - rangeMinValue < rangeGap) {
                onRangeMaxValueChange(rangeMinValue + rangeGap)
            } else {
                const percent = 100 - (+maxValueRef.current.value / +maxValueRef.current.max) * 100
                progressRef.current.style.right = `${percent}%`

                onRangeMaxValueChange(+maxValueRef.current.value)
            }
        }
    }

    return (
        <div>
            <div className={style.slider}>
                <div className={style.slider__progress} ref={progressRef} />
            </div>
            <div className={style.range}>
                <label>
                    <input
                        type={'range'}
                        className={style.range__min}
                        onChange={handleMinRangeChange}
                        min={minValue}
                        max={maxValue}
                        value={rangeMinValue}
                        step={100}
                        ref={minValueRef}
                    />
                </label>
                <label>
                    <input
                        type={'range'}
                        className={style.range__max}
                        onChange={handleMaxRangeChange}
                        min={minValue}
                        max={maxValue}
                        value={rangeMaxValue}
                        step={100}
                        ref={maxValueRef}
                    />
                </label>
            </div>
        </div>
    )
}

export default React.memo(Slider)
