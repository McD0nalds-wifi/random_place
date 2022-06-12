import { ModelsRedux, EnumsRedux } from 'types'

/* START - Main additional imports and module code. */
import * as constants from '../../common/constants'

export const mainState = {
    currentCategoryList: ['Кафе'] as string[],
    districtList: constants.districtList as ModelsRedux.IDistrictItem[],
    isAllDistrictsChecked: true as boolean,
    rangeMinValue: 1000 as number,
    rangeMaxValue: 3000 as number,
    addPlaceData: null as ModelsRedux.IAddPlaceResponse | null,
    addPlacePhase: 'Never' as EnumsRedux.ThunkChainPhase,
    addPlaceError: null as ModelsRedux.IError | null,
    randomPlaceData: null as ModelsRedux.IRandomPlaceData | null,
    randomPlacePhase: 'Never' as EnumsRedux.ThunkChainPhase,
    randomPlaceError: null as ModelsRedux.IError | null,
}
