import React from 'react'

import style from './Select.module.scss'

import { ModelsUI } from 'types'

/* START - Select additional imports and module code. */
import { Icon } from 'components-ui'

const DROPDOWN_OFFSET = 4
const DROPDOWN_ITEM_HEIGHT = 28
const INPUT_PADDING_RIGHT = 38

const Select: React.FC<ModelsUI.ISelectProps> = ({
    value,
    itemList,
    placeholder,
    label,
    errorMessage,
    isDisabled = false,
    numberOfLines = 5,
    onChange,
}) => {
    const [isInputFocused, setInputFocused] = React.useState<boolean>(false)
    const [isDropdownOpen, setDropdownOpen] = React.useState<boolean>(false)
    const [hoverItemIndex, setHoverItemIndex] = React.useState<number>(0)
    const dropdownRef = React.useRef<HTMLDivElement | null>(null)

    const dropdownMaxHeight: number = numberOfLines * DROPDOWN_ITEM_HEIGHT + DROPDOWN_OFFSET

    /* START - Tracking side-effects. */
    // слушатель открытия/закрытия списка
    React.useEffect(() => {
        // если в списке есть выбранное значение, то ставим hover на него
        // по дефолту hover стоит на первом элементе списка

        if (value && isDropdownOpen) {
            const activeItemIndex = itemList.findIndex((item: string) => item === value)
            setHoverItemIndex(activeItemIndex)
        }
    }, [isDropdownOpen])

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownRef])

    // обработчик нажатия клавиш
    const keyDownHandler = React.useCallback(
        (event: KeyboardEvent) => {
            switch (event.key) {
                case 'Enter':
                    if (isDropdownOpen) {
                        dropdownClickHandler(itemList[hoverItemIndex])
                    } else if (isInputFocused) {
                        setDropdownOpen(true)
                    }
                    break
                case 'ArrowDown':
                    if (isDropdownOpen) {
                        // блокируем скролл страницы
                        event.preventDefault()

                        const newHoverItemIndex = itemList.length === hoverItemIndex + 1 ? 0 : hoverItemIndex + 1
                        setHoverItemIndex(newHoverItemIndex)

                        scrollDropdownItems(newHoverItemIndex)
                    }
                    break
                case 'ArrowUp':
                    if (isDropdownOpen) {
                        // блокируем скролл страницы
                        event.preventDefault()

                        const newHoverItemIndex = hoverItemIndex === 0 ? itemList.length - 1 : hoverItemIndex - 1
                        setHoverItemIndex(newHoverItemIndex)

                        scrollDropdownItems(newHoverItemIndex)
                    }
                    break
                default:
                    break
            }
        },
        [hoverItemIndex, isDropdownOpen, isInputFocused],
    )

    // слушатель нажатия клавиш
    React.useEffect(() => {
        document.addEventListener('keydown', keyDownHandler)

        return () => {
            document.removeEventListener('keydown', keyDownHandler)
        }
    }, [keyDownHandler])
    /* END - Tracking side-effects. */

    // функция скролит выпадающий список, если элемент с классом hover выходит за рамки списка
    const scrollDropdownItems = (itemIndex: number) => {
        if (dropdownRef.current) {
            const currentElement = dropdownRef.current.children[itemIndex] as HTMLElement

            dropdownRef.current.scroll({
                top: currentElement.offsetTop - DROPDOWN_OFFSET,
                left: 0,
                behavior: 'smooth',
            })
        }
    }

    // обработчик кликов по элементам списка
    const dropdownClickHandler = (value: string) => {
        onChange(value)
        setDropdownOpen(false)
    }

    // обработчик кликов по инпуту
    const inputClickHandler = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        event.persist()

        // если клик был сделан мышкой
        if (event.nativeEvent.detail !== 0) {
            setDropdownOpen(true)
        }
    }

    return (
        <div className={style.wrapper}>
            {label ? <div className={style.label}>{label}</div> : null}
            {value === null ? <div className={style.placeholder}>{placeholder}</div> : null}
            <input
                className={`${style.input} ${errorMessage ? style.input_error : ''}`}
                style={{
                    paddingRight: INPUT_PADDING_RIGHT,
                }}
                type={'submit'}
                value={value ? value : ''}
                onClick={inputClickHandler}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                disabled={isDisabled}
            />
            <div className={style.icon} style={{ top: label ? '33px' : '13px' }}>
                <Icon type={isDropdownOpen ? 'ArrowTop' : 'ArrowBottom'} />
            </div>

            <div
                className={`${style.dropdown} ${isDropdownOpen ? style.dropdown_open : ''}`}
                ref={dropdownRef}
                style={{ maxHeight: dropdownMaxHeight }}
            >
                {itemList.length > 0
                    ? itemList.map((itemListItem: string, index: number): JSX.Element => {
                          const hoverClassName: string = hoverItemIndex === index ? style.dropdown__item_hover : ''
                          const activeClassName: string =
                              value && value === itemListItem ? style.dropdown__item_active : ''

                          return (
                              <div
                                  className={`${style.dropdown__item} ${hoverClassName} ${activeClassName}`}
                                  key={`Dropdown-Item-${itemListItem}`}
                                  onClick={() => dropdownClickHandler(itemListItem)}
                                  onMouseEnter={() => setHoverItemIndex(index)}
                              >
                                  <div className={style.dropdown__title}>{itemListItem}</div>
                              </div>
                          )
                      })
                    : null}
            </div>

            {errorMessage ? (
                <div className={style.errorMessage}>
                    <div className={style.errorMessage__title}>{errorMessage}</div>
                </div>
            ) : null}
        </div>
    )
}

export default Select
