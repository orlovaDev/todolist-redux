import {createTodolistAC, deleteTodolistAC, TodolistType} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const deleteTaskAC = createAction<{ id: Task["id"], todolistId: TodolistType['id'] }>("tasks/deleteTask")
export const createTaskAC = createAction<{ title: Task["title"], todolistId: TodolistType["id"] }>("tasks/createTask");
export const changeTaskStatusAC = createAction<{
  id: Task["id"],
  isDone: Task["isDone"],
  todolistId: TodolistType["id"]
}>("tasks/changeTaskStatus");

export const changeTaskTitleAC = createAction<{
  id: Task["id"],
  title: Task["title"],
  todolistId: TodolistType["id"]
}>("tasks/changeTaskTitle");

const initialState: TaskStateType = {}

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = []
    })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1);
      }
    })
    .addCase(createTaskAC, (state, action) => {
      state[action.payload.todolistId].unshift({
        id: nanoid(),
        title: action.payload.title,
        isDone: false
      })
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find(task => task.id === action.payload.id);
      if (task) {
        task.isDone = action.payload.isDone
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find(task => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title
      }
    })
})

export type Task = {
  id: string,
  title: string,
  isDone: boolean
}

export type TaskStateType = Record<string, Task[]>    // тоже самое что [todolistId: string]: TaskType[]




