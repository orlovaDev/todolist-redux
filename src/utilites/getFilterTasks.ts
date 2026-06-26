import {FilterValueType} from "../app/App.tsx";
import {Task} from "@/model/tasks-reducer.ts";

export const getFilterTasks = (tasks: Task[], filter: FilterValueType) => {
  let filteredTasks = tasks

  if (filter === "active") {
    filteredTasks = tasks.filter(t => !t.isDone)
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.isDone)
  }

  return filteredTasks
}