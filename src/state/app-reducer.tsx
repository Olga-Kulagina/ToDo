export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
    export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-APP-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'SET-APP-STATUS', status} as const)

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

type ActionsType = SetAppStatusActionType | SetAppErrorActionType