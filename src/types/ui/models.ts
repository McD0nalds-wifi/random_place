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
    title: string
    isActive: boolean
    icon: Enums.IconType
}

export interface IIconProps {
    type: Enums.IconType
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