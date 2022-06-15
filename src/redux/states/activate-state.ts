import { ModelsRedux, EnumsRedux } from 'types'

/* START - Activate additional imports and module code. */

export const activateState = {
    activateAccountPhase: 'Never' as EnumsRedux.ThunkChainPhase,
    activateAccountError: null as ModelsRedux.IError | null,
}
