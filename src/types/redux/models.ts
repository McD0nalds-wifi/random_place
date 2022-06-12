import * as Enums from './enums'

export interface IError {
    message: string
    code: number
}

export interface IServerError {
    message: string
}

export interface IDistrictItem {
    id: number
    title: string
    isChecked: boolean
}

export interface IRandomPlaceRequest {
    category: Enums.CategoryType[]
    district: string[]
    isAllDistrictsSelected: boolean
    averageCheckMinValue: number
    averageCheckMaxValue: number
}

export interface IRandomPlaceResponse {
    id: number
    category: string
    name: string
    description: string
    metroList: string[]
    address: string
    rating: number
    district: string
    imagesList: string[]
    latitude: number
    longitude: number
    averageCheck: number
    workingHoursList: string[]
    phoneNumber: string
    kitchenList: string[]
}

export interface IRandomPlaceData extends IRandomPlaceResponse {
    id: number
}

export interface IAddPlaceRequest {
    category: Enums.CategoryType
    name: string
    description: string
    metroList: string[]
    address: string
    rating: number
    district: string
    imagesList: string[]
    latitude: number
    longitude: number
    averageCheck: number
    workingHoursList: string[]
    phoneNumber: string
    kitchenList: string[]
}

export interface IAddPlaceResponse extends IRandomPlaceResponse {
    id: number
}
