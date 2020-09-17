import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from './todolist-reducer';
import {v1} from 'uuid';
import {FilterValueType, TodoListType} from '../App';
import {tasksReducer} from './tasks-reducer';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const startStateTasks = {
        [todolistId1]: [],
        [todolistId2]: [],
    }

    const action = RemoveTodoListAC(todolistId1)

    const endStateTodolists = todoListReducer(startState, action)
    const endStatetasks = tasksReducer(startStateTasks, action)
    const tasksId = Object.keys(endStatetasks)

    expect(endStateTodolists.length).toBe(1);
    expect(endStateTodolists[0].id).toBe(todolistId2);
    expect(tasksId.length).toBe(1);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startStateTodolists: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const startStateTasks = {
        [todolistId1]: [],
        [todolistId2]: [],

    }

    const action = AddTodoListAC(newTodolistTitle)

    const endStateTodolists = todoListReducer(startStateTodolists, action)
    const endStatetasks = tasksReducer(startStateTasks, action)

    const tasksId = Object.keys(endStatetasks)

    expect(endStateTodolists.length).toBe(3);
    expect(endStateTodolists[2].title).toBe(newTodolistTitle);
    expect(endStateTodolists[2].id).toBe(tasksId[2])
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListReducer(startState, ChangeTodoListTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValueType = "completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    };

    const endState = todoListReducer(startState, ChangeTodoListFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



