import {List} from "@mui/material";
import {Task} from "@/model/tasks-reducer.ts";
import {getFilterTasks} from "@/utilites/getFilterTasks.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/task-selectors.ts";
import {TodolistType} from "@/model/todolists-reducer.ts";
import {TaskItem} from "@/TaskItem.tsx";

export type Props = {
  todolist: TodolistType;
}

export const Tasks = ({todolist}: Props) => {
  const {id, filter} = todolist;

  const tasks = useAppSelector(selectTasks)
  const filteredTasks = getFilterTasks(tasks[id], filter)

  return (
    <>
      {filteredTasks.length === 0
        ? <span>Tasks list is empty</span>
        : <List>
          {filteredTasks.map((task: Task) =>
               (
               <TaskItem key={task.id}
                         task={task}
                         todolistId={id}
               />
              ))}
        </List>}
    </>
  );
};

