import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {FilterValueType, TaskType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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

export const TodoList = React.memo ((props: PropsType) => {
    console.log("Todolist called")

    const addTask = useCallback ((title: string) => {
        props.addTask(title, props.id);
    }, [])

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title);
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
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

            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTasksStatus(t.id, newIsDoneValue, props.id)
                        }

                        const changeTasksTitle = (title: string) => {
                            props.changeTasksTitle(t.id, title, props.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox checked={t.isDone} onChange={onChangeHandler}
                                color={'primary'}/>
                                <EditableSpan value={t.title} changeValue={changeTasksTitle}/>
                                <IconButton onClick={onClickHandler}>
                                    <Delete />
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
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