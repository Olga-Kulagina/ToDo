import React, {ChangeEvent, useCallback} from 'react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';


export default {
    title: 'Task Stories',
    component: Task,
}

const removeTask = action('onClickHandler was clicked')
const changeTaskStatus = action('onChangeHandler was clicked')
const changeTaskTitle = action('changeTasksTitle was clicked')

export const TaskBase = (props: any) => {
    return (
        <>
            <Task task={{id: '1', isDone: true, title: 'Milk'}} todoListID={'todoListId1'}
                  onClickHandler={removeTask}
                  onChangeHandler={changeTaskStatus}
                  changeTasksTitle={changeTaskTitle}/>
            <Task task={{id: '1', isDone: false, title: 'Bread'}} todoListID={'todoListId1'}
                  onClickHandler={removeTask}
                  onChangeHandler={changeTaskStatus}
                  changeTasksTitle={changeTaskTitle}/>
        </>
    )
}