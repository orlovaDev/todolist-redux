import {CreateItemForm} from "./CreateItemForm.tsx";
import {TodolistType} from "@/model/todolists-reducer.ts";
import {createTaskAC, Task} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistTitle} from "@/TodolistTitle.tsx";
import {Tasks} from "@/Tasks.tsx";
import {FilterButtons} from "@/FilterButtons.tsx";

export type Props = {
  todolist: TodolistType;
}

export const TodolistItem = ({todolist}: Props) => {
  const dispatch = useAppDispatch();

  const createTask = (taskTitle: Task["title"]) => {
    dispatch(createTaskAC({title: taskTitle, todolistId: todolist.id}))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm
        createItem={createTask}
        maxTitleLength={15}
      />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
    ;
};

