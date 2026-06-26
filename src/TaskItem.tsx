import {Checkbox, IconButton, ListItem} from "@mui/material";
import {container} from "@/TodolistItem.styles.ts";
import {EditableSpan} from "@/EditableSpan.tsx";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from "@/model/tasks-reducer.ts";
import type {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
  task: Task,
  todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {

  const dispatch = useAppDispatch();

  const deleteTask = () => {
    dispatch(deleteTaskAC({todolistId, id: task.id}))
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(changeTaskStatusAC({id: task.id, isDone: newStatusValue, todolistId}))
  }

  const changeTaskTitle = (newTitle: Task["title"]) => {
    dispatch(changeTaskTitleAC({id: task.id, title: newTitle, todolistId}))
  }
  return (
    <ListItem
      sx={container}
      disablePadding
      className={task.isDone ? "is-done" : ""}
    >
      <Checkbox
        checked={task.isDone}
        onChange={changeTaskStatus}
        size="small"
        color="secondary"
        sx={{
          opacity: task.isDone ? 0.5 : 1,
        }}
      />

      <EditableSpan
        title={task.title}
        changeTitle={changeTaskTitle}
        isDone={task.isDone}
      />

      <IconButton
        onClick={deleteTask}
        size="small"
        color="secondary"
        sx={{
          opacity: task.isDone ? 0.4 : 1,
        }}
      >
        <DeleteForeverIcon />
      </IconButton>
    </ListItem>
  );
};

