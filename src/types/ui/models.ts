import { EnumsRedux, ModelsRedux } from 'types'

import * as Enums from './enums'

export interface IButtonProps {
    type: Enums.ButtonType
    size: Enums.ButtonSizeType
    children: React.ReactNode
    isDisabled?: boolean
    icon?: Enums.IconType
    onClick: () => void
}

export interface ITitleProps {
    level: Enums.TitleLevelType
    children: React.ReactNode
}

export interface IButtonGroupProps {
    itemsList: IButtonGroupItem[]
    onChange: (buttonItem: IButtonGroupItem) => void
}

export interface IButtonGroupItem {
    id: string
    title: EnumsRedux.CategoryCyrillicType
    isActive: boolean
    icon: Enums.IconType
}

export interface IIconProps {
    type: Enums.IconType
    onClick?: () => void
}

export interface ICheckboxProps {
    isChecked: boolean
    title?: string
    onChange: () => void
}

export interface ISliderProps {
    minValue: number
    maxValue: number
    rangeMinValue: number
    rangeMaxValue: number
    onRangeMinValueChange: (value: number) => void
    onRangeMaxValueChange: (value: number) => void
}

export interface ILoaderProps {
    isLoading: boolean
}

export interface IYandexMapProps {
    name: string
    category: EnumsRedux.CategoryType
    description: string
    metroList: string[]
    address: string
    rating: number
    imagesList: string[]
    latitude: number
    longitude: number
    workingHoursList: string[]
    averageCheck: number
    phoneNumber: string
    kitchenList: string[]
}

export interface IModalProps {
    isOpen: boolean
    title: string
    children: React.ReactNode
    isOverlayBlocked?: boolean
    onClose: () => void
}

export interface ISliderMenuProps {
    children: React.ReactNode
}

export interface IInputProps {
    type: Enums.InputType
    value: string
    label?: string
    placeholder?: string
    errorMessage?: string
    isBlock?: boolean
    icon?: Enums.IconType
    onChange: (value: string) => void
    onBlur?: (value: string) => void
}

export interface ISelectProps {
    value: string | null
    itemList: string[]
    placeholder?: string
    label?: string
    errorMessage?: string
    isDisabled?: boolean
    numberOfLines?: number
    onChange: (value: string) => void
}

export interface IInputFileProps {
    onChange: (file: File) => void
}
