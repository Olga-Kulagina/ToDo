
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const getTasksThunkCreator = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some error'))
                }
            }
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err) => {
            dispatch(setAppErrorAC(err.message))
            dispatch(setAppStatusAC('failed'))
        })

}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const task = getState().tasks[todolistId]
        const currentTask = task.find((t) => {
            return t.id === taskId
        })
        if (currentTask) {
            dispatch(setAppStatusAC('loading'))
            todolistsAPI.updateTask(todolistId, taskId, {
                status: status,
                deadline: currentTask.deadline,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                title: currentTask.title
            }).then((res) => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
        }

    }

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const task = getState().tasks[todolistId]
        const currentTask = task.find((t) => {
            return t.id === taskId
        })
        if (currentTask) {
            dispatch(setAppStatusAC('loading'))
            todolistsAPI.updateTask(todolistId, taskId, {
                status: currentTask.status,
                deadline: currentTask.deadline,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                title: title
            }).then((res) => {
                dispatch(changeTaskTitleAC(taskId, title, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
        }

    }


