import {FilterValueType} from "@/app/App.tsx";
import {changeTodolistFilterAC, TodolistType} from "@/model/todolists-reducer.ts";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import {container} from "@/TodolistItem.styles.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

export type Props = {
  todolist: TodolistType;
}

export const FilterButtons = ({todolist}: Props) => {
  const {id, filter} = todolist;
  const dispatch = useAppDispatch();

  const changeTodolistFilter = (payload: { filter: FilterValueType, todolistId: TodolistType["id"] }) => {
    const {filter, todolistId} = payload
    dispatch(changeTodolistFilterAC({filter, id: todolistId}))
  }

  return (
    <Box sx={container}>
      <Button
        size="small"
        disableElevation
        variant="contained"
        color={filter === "all" ? "secondary" : "primary"}
        onClick={() => changeTodolistFilter({filter: 'all', todolistId: id})}
      >
        All
      </Button>

      <Button
        size="small"
        disableElevation
        variant="contained"
        color={filter === "active" ? "secondary" : "primary"}
        onClick={() => changeTodolistFilter({filter: 'active', todolistId: id})}
      >
        Active
      </Button>

      <Button
        size="small"
        disableElevation
        variant="contained"
        color={filter === "completed" ? "secondary" : "primary"}
        onClick={() => changeTodolistFilter({filter: 'completed', todolistId: id})}
      >
        Completed
      </Button>
    </Box>
  );
}
