import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTasksStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTasksTitle: (id: string, title: string, todoListID: string) => void
    filter:string
    selectAll: (value: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

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
                <button onClick={() => props.removeTodoList(props.id)}>X</button></h3>
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

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <EditableSpan value={t.title} changeValue={changeTasksTitle} />
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>

    )
}