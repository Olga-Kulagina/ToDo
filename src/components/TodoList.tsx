import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from '../App';

type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTasksStatus: (id: string, isDone: boolean, todoListID: string) => void
    filter:string
    selectAll: (value: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

export function TodoList(props: PropsType) {

    let [title, setTitle] = useState('');

    let [error, setError] = useState<string | null>(null)

    const AddTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id);
            setTitle('');
        } else {
            setError('Field is required')
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            AddTask();
        }
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

    const allSelectedHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.selectAll(e.currentTarget.checked, props.id)
    }

    const isSelectedAll = props.tasks.filter(t => t.isDone).length === props.tasks.length

    return (
        <div>
            <h3>{props.title} <button onClick={() => props.removeTodoList(props.id)}>X</button></h3>
            <div>
                <input value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={AddTask}>add</button>
                <input type='checkbox' checked={isSelectedAll} onChange={allSelectedHandler}/><span>Selected all</span>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTasksStatus(t.id, newIsDoneValue, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <span>{t.title}</span>
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