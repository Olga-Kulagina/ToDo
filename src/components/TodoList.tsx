import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {FilterValueType, TaskType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';

type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTasksStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTasksTitle: (id: string, title: string, todoListID: string) => void
    filter: string
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export const TodoList = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.id, props.addTask])

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title);
    }, [props.id, props.changeTodoListTitle])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = (() => {
        props.changeFilter('active', props.id)
    })
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
                <IconButton onClick={() => props.removeTodoList(props.id)}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodolist.map(t => {

                        return (
                            <Task
                                key={t.id}
                                task={t}
                                todoListID={props.id}
                                onClickHandler={props.removeTask}
                                onChangeHandler={props.changeTasksStatus}
                                changeTasksTitle={props.changeTasksTitle}
                            />

                        )
                    })
                }
            </div>

            <div>
                <Button variant='outlined'
                        color={props.filter === 'all' ? 'secondary' : 'primary'}
                        onClick={onAllClickHandler}>All</Button>
                <Button variant='outlined'
                        color={props.filter === 'active' ? 'secondary' : 'primary'}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant='outlined'
                        color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>

    )
})