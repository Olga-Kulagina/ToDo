import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '99efda20-dfa9-469b-8832-45007a73919e'
    }
})


type TodolistType= {
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
        return instance.get<Array<TodolistType>>('todo-lists',)
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{item: TodolistType}>>('todo-lists',
            {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${id}`, {title})

    }

}