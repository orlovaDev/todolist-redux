import {Container} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import {CreateItemForm} from "@/CreateItemForm.tsx";
import {createTodolistAC, TodolistType} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolists} from "@/Todolists.tsx";

export const Main = () => {
  const dispatch = useAppDispatch();

  const createTodolist = (title: TodolistType["title"]) => {
    dispatch(createTodolistAC(title))
  }
  return (
    <Container maxWidth="lg">
      <Grid2 container sx={{p: "15px 0"}}>
        <CreateItemForm createItem={createTodolist} maxTitleLength={20} />
      </Grid2>
      <Grid2 container spacing={8}>
        <Todolists />
      </Grid2>
    </Container>
  );
};

