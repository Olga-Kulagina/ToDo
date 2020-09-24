import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from './state/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, dispatchToTodoList] = useReducer(todoListReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'active'}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'Dog', isDone: false},
            {id: v1(), title: 'Cat', isDone: true},
            {id: v1(), title: 'Pig', isDone: false},
            {id: v1(), title: 'Horse', isDone: false}
        ]
    })


    function changeFilter(value: FilterValueType, todoListID: string) {
        const action = ChangeTodoListFilterAC(value, todoListID)
        dispatchToTodoList(action)
    }

    function removeTask(taskID: string, todoListID: string) {
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID))
    }


    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todoListID))
    }

    function changeTitle(id: string, title: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(id, title, todoListID))
    }


    function removeTodoList(todoListID: string) {
        dispatchToTodoList(RemoveTodoListAC(todoListID))
        dispatchToTasks(RemoveTodoListAC(todoListID))
    }

    const addTodoList = (title: string) => {
        let action = AddTodoListAC(title)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        dispatchToTodoList(ChangeTodoListTitleAC(newTitle, todoListID))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {

                            let tasksForTodoList = tasks[tl.id];

                            if (tl.filter === 'active') {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                            }

                            return (
                                <Grid item>
                                    <Paper elevation={3} style={{padding: '10px'}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTasksStatus={changeStatus}
                                        changeTasksTitle={changeTitle}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}/>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
