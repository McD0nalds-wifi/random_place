import { ModelsRedux, EnumsRedux } from 'types'

/* START - Main additional imports and module code. */
import * as constants from '../../common/constants'

export const mainState = {
    currentCategoryList: ['Кафе'] as string[],
    districtList: constants.districtList as ModelsRedux.IDistrictItem[],
    isAllDistrictsChecked: true as boolean,
    rangeMinValue: 0 as number,
    rangeMaxValue: 2000 as number,
    addPlaceData: null as ModelsRedux.IAddPlaceResponse | null,
    addPlacePhase: 'Never' as EnumsRedux.ThunkChainPhase,
    addPlaceError: null as ModelsRedux.IError | null,
    addPlaceImageData: null as ModelsRedux.IAddPlaceResponse | null,
    addPlaceImagePhase: 'Never' as EnumsRedux.ThunkChainPhase,
    addPlaceImageError: null as ModelsRedux.IError | null,
    randomPlaceData: null as ModelsRedux.IRandomPlaceData | null,
    randomPlacePhase: 'Never' as EnumsRedux.ThunkChainPhase,
    randomPlaceError: null as ModelsRedux.IError | null,
}
