import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from '../AppWithRedux';


type TaskPropsType = {
    task: TaskType
    todoListID: string
    onClickHandler: (taskID: string, todoListID: string) => void
    onChangeHandler: (id: string, isDone: boolean, todoListID: string) => void
    changeTasksTitle: (id: string, title: string, todoListID: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const {task, todoListID, onClickHandler, onChangeHandler, changeTasksTitle} = props

    const removeTask = useCallback(() => onClickHandler(task.id, todoListID), [])
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChangeHandler(task.id, e.currentTarget.checked, todoListID)
    }, [task.id, todoListID])
    const changeTaskTitle = useCallback((newValue: string) => {
        changeTasksTitle(task.id, newValue, todoListID)
    }, [task.id, todoListID])

    return (
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox checked={task.isDone} onChange={changeTaskStatus}
                      color={'primary'}/>
            <EditableSpan value={task.title} changeValue={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )
})
