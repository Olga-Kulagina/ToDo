import React, {useEffect, useState} from 'react'
import {taskAPI} from '../api/todolist-api';

export default {
    title: 'TASKS-API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '014978ab-7f47-4729-9581-6457276f8008'
        taskAPI.getTasks(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '014978ab-7f47-4729-9581-6457276f8008'
        let title = 'Kavabanga'
        taskAPI.createTask(todolistId, title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '014978ab-7f47-4729-9581-6457276f8008'
        let taskId = 'de47c2cd-9277-4bd0-ad77-0c02e015692c'
        taskAPI.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '014978ab-7f47-4729-9581-6457276f8008'
        let taskId = 'd315a014-3793-4c1b-85aa-189d28e7a95d'
        let title = 'XXXXXXXX'
        let description = 'sdsd'
        let completed = 'sd'
        let status = 1
        let priority = 1
        let startDate = ''
        let deadline = ''
        taskAPI.updateTask(todolistId, taskId, title, description, completed, status,
            priority, startDate, deadline).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
