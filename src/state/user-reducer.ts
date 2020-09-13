export type UserType = {
    name: string
    age: number
    childrenCount: number
}


type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: UserType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age + 1};
        case 'INCREMENTCHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount + 1};
        case 'CHANGE-NAME':
            return {...state, name: action.newName}
        default:
            throw new Error('I dont understand this action type')
    }
}