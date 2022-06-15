import { ModelsRedux, EnumsRedux } from 'types'

/* START - Authorization additional imports and module code. */

export const authorizationState = {
    loginEmailField: '' as string,
    loginEmailFieldError: null as string | null,
    loginPasswordField: '' as string,
    loginPasswordFieldError: null as string | null,
    registrationEmailField: '' as string,
    registrationEmailFieldError: null as string | null,
    registrationPasswordField: '' as string,
    registrationPasswordFieldError: null as string | null,
    registrationRepeatPasswordField: '' as string,
    registrationRepeatPasswordFieldError: null as string | null,
    userData: null as ModelsRedux.IUserData | null,
    registrationPhase: 'Never' as EnumsRedux.ThunkChainPhase,
    registrationError: null as ModelsRedux.IError | null,
    loginPhase: 'Never' as EnumsRedux.ThunkChainPhase,
    loginError: null as ModelsRedux.IError | null,
    checkAuthPhase: 'Never' as EnumsRedux.ThunkChainPhase,
    checkAuthError: null as ModelsRedux.IError | null,
    logoutPhase: 'Never' as EnumsRedux.ThunkChainPhase,
    logoutError: null as ModelsRedux.IError | null,
}
