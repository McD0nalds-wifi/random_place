import { EnumsRedux } from 'types'

/**
 * Function checks internet access
 *
 * @returns {boolean} is internet connected
 */
export const checkInternetConnected = (): boolean => {
    return window.navigator.onLine
}

/**
 * Function translation category from cyrillic to latin
 *
 * @param {string[]} categoryList category list in cyrillic
 *
 * @returns {EnumsRedux.CategoryType[]} category list in latin
 */
export const getConvertCategoryList = (categoryList: string[]): EnumsRedux.CategoryType[] => {
    const latinCategoryList: EnumsRedux.CategoryType[] = []

    categoryList.forEach((categoryItem) => {
        switch (categoryItem) {
            case 'Кафе':
                latinCategoryList.push('Cafe')
                break
            case 'Бары':
                latinCategoryList.push('Bars')
                break
            case 'Рестораны':
                latinCategoryList.push('Restaurants')
                break
            case 'Парки':
                latinCategoryList.push('Parks')
                break
            default:
                break
        }
    })

    return latinCategoryList
}
