import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed';

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
    [key: string] : Array<TaskType>
}

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'active'}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
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
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }

    }

    function removeTask(taskID: string, todoListID: string) {
        let todoList = tasks[todoListID];
        tasks[todoListID] = todoList.filter(t => t.id !== taskID);
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoList = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoList];
        setTasks({...tasks})
    }


    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoList = tasks[todoListID];
        let task = todoList.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    function changeTitle(id: string, title: string, todoListID: string) {
        let todoList = tasks[todoListID];
        let task = todoList.find(t => t.id === id)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function selectAll(value: boolean, todoListID: string) {
        let todoList = tasks[todoListID];
        const newTasks = todoList.map(t => ({...t, isDone: value}))
        setTasks({newTasks})
    }

    function removeTodoList(todoListID: string) {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListID);
        setTodoLists(newTodoLists)
        delete tasks[todoListID];
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        let newTodoListID = v1();
        let newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: 'all'
        };
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks,
            [newTodoListID]: []
        })
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID);
        if(todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
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
                            selectAll={selectAll}
                            removeTodoList={removeTodoList}
                            changeTodoListTitle={changeTodoListTitle}/>
                    )
                })
            }


        </div>
    );
}

export default App;
