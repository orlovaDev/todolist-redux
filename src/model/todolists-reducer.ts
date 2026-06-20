import {FilterValueType, TodolistType} from "../app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')
export const changeTodolistTitleAC = createAction<{ title: TodolistType["title"], id: TodolistType["id"] }>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{ filter: FilterValueType, id: TodolistType["id"] }>('todolists/changeTodolistFilter')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
  return {payload: {title: title, id: nanoid()}}
})

const initialState: TodolistType[] = []

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    })

    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    })

    .addCase(changeTodolistFilterAC, (state, action) => {
      const todolist = state.find(todo => todo.id === action.payload.id)
      if (todolist) todolist.filter = action.payload.filter
    })

    .addCase(createTodolistAC, (state, action) => {
      state.push({id: action.payload.id, title: action.payload.title, filter: "all"})
    })
  //  можно написать дефолтный кейс , но можно не писать , он под капотом добавит его
})







