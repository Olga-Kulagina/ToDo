import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '99efda20-dfa9-469b-8832-45007a73919e'
    }
})


type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: T
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${id}`, {title})

    }
}

type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: number
    startDate: string
    status: number
    title: string
    todoListId: string
}

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<Array<TaskType>>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string, description: string,
    completed: string, status: number, priority: number, startDate: string, deadline: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {
            title,
            description,
            completed,
            status,
            priority,
            startDate,
            deadline
        })
    }
}



