import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {TaskStateType, TodolistType} from "../app/App.tsx";
import {TaskType} from "../TodolistItem.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const deleteTaskAC = createAction<{ id: TaskType["id"], todolistId: TodolistType['id'] }>("tasks/deleteTask")
export const createTaskAC = createAction<{ title: TaskType["title"], todolistId: TodolistType["id"] }>("tasks/createTask");
export const changeTaskStatusAC = createAction<{
  id: TaskType["id"],
  isDone: TaskType["isDone"],
  todolistId: TodolistType["id"]
}>("tasks/changeTaskStatus");

export const changeTaskTitleAC = createAction<{
  id: TaskType["id"],
  title: TaskType["title"],
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




