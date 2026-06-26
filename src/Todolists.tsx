import {TodolistItem} from "@/TodolistItem.tsx";
import Grid2 from "@mui/material/Grid2";
import {Paper} from "@mui/material";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";

export const Todolists = () => {

  const todolists = useAppSelector(selectTodolists)
  // const tasks = useAppSelector(selectTasks)

  return (
    <>
      {todolists.map(todolist => (
          <Grid2 key={todolist.id}>
            <Paper elevation={6} sx={{padding: "15px"}}>
              <TodolistItem
                todolist={todolist}
              />
            </Paper>
          </Grid2>
        )
      )}
    </>
  );
};

