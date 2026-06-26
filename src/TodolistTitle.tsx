import {EditableSpan} from "@/EditableSpan.tsx";
import {IconButton} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTodolistTitleAC, deleteTodolistAC, TodolistType} from "@/model/todolists-reducer.ts";

export type Props = {
  todolist: TodolistType;
}

export const TodolistTitle = ({todolist}: Props) => {
  const {id, title} = todolist;

  const dispatch = useAppDispatch();

  const changeTodolistTitle = (newTitle: TodolistType["title"]) => {
    dispatch(changeTodolistTitleAC({title: newTitle, id}))
  }
  const deleteTodolist = () => {
    dispatch(deleteTodolistAC({id}))
  }

  return (
    <h3>
      <EditableSpan
        isDone={false}
        title={title}
        changeTitle={changeTodolistTitle}
      />
      <IconButton
        onClick={deleteTodolist}
        size="small"
        color="secondary"
      >
        <DeleteForeverIcon />
      </IconButton>
    </h3>
  );
};

