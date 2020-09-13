import {FilterValueType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValueType
    id: string
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export const todoListReducer = (state: Array<TodoListType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            };
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
                return [...state];
            }
            return state;
        case 'CHANGE-TODOLIST-FILTER':
            let todoList2 = state.find(tl => tl.id === action.id);
            if (todoList2) {
                todoList2.filter = action.filter;
                return [...state];
            }
            return state;
        default:
            return state;
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListID}
}
export const AddTodoListAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todoListID}
}
export const ChangeTodoListFilterAC = (filter: FilterValueType, todoListID: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todoListID}
}