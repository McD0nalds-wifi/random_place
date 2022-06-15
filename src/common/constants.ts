import { ModelsRedux, ModelsUI } from 'types'

export const isDevMode = true // TODO

export const districtList: ModelsRedux.IDistrictItem[] = [
    { id: 1, title: 'Адмиралтейский', isChecked: true },
    { id: 2, title: 'Василеостровский', isChecked: true },
    { id: 3, title: 'Выборгский', isChecked: true },
    { id: 4, title: 'Калининский', isChecked: true },
    { id: 5, title: 'Кировский', isChecked: true },
    { id: 6, title: 'Колпинский', isChecked: true },
    { id: 7, title: 'Красногвардейский', isChecked: true },
    { id: 8, title: 'Красносельский', isChecked: true },
    { id: 9, title: 'Кронштадтский', isChecked: true },
    { id: 10, title: 'Курортный', isChecked: true },
    { id: 11, title: 'Московский', isChecked: true },
    { id: 12, title: 'Невский', isChecked: true },
    { id: 13, title: 'Петроградский', isChecked: true },
    { id: 14, title: 'Петродворцовый', isChecked: true },
    { id: 15, title: 'Приморский', isChecked: true },
    { id: 16, title: 'Пушкинский', isChecked: true },
    { id: 17, title: 'Фрунзенский', isChecked: true },
    { id: 18, title: 'Центральный', isChecked: true },
]

export const categoryItemsList: ModelsUI.IButtonGroupItem[] = [
    { id: '1', title: 'Кафе', isActive: true, icon: 'Coffee' },
    { id: '2', title: 'Бары', isActive: false, icon: 'TropicalDrink' },
    { id: '3', title: 'Рестораны', isActive: false, icon: 'Bowl' },
    { id: '4', title: 'Парки', isActive: false, icon: 'Tree' },
]

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
