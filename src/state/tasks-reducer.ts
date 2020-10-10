import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolist-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}
export type addTasksType = {
    type: 'ADD-TASKS'
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | addTasksType
    | AddTodolistActionType
    | RemoveTodolistActionType

let initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = {...state}
            let todoList = stateCopy[action.todoListID];
            stateCopy[action.todoListID] = todoList.filter(t => t.id !== action.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            let stateCopy = {...state}
            let newTask = {id: v1(), title: action.title, isDone: false};
            let todoList = stateCopy[action.todoListID];
            stateCopy[action.todoListID] = [newTask, ...todoList];
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, isDone: action.isDone}
                    : t);
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t => {
                    if (t.id !== action.taskId) {
                        return t
                    } else {
                        return {...t, title: action.title}
                    }
                })
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todoListID, taskId}
}
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todoListID}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
