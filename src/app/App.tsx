import './App.css'
import {TaskType, TodolistItem} from "../TodolistItem.tsx";
import {CreateItemForm} from "../CreateItemForm.tsx";
import {getFilterTasks} from "../utilites/getFilterTasks.ts";
import {AppBar, Box, Container, createTheme, CssBaseline, IconButton, Paper, Switch, Toolbar} from "@mui/material";
import Grid2 from '@mui/material/Grid2';
import MenuIcon from '@mui/icons-material/Menu'
import {container} from "../TodolistItem.styles.ts";
import {NavButton} from "../NavButton.ts";
import {ThemeProvider} from "@mui/material/styles";
import {changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC} from "../model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "../model/tasks-reducer.ts";
import {useState} from "react";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/task-selectors.ts";


export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

export type Task = {
  id: string,
  title: string,
  isDone: boolean
}

export type TaskStateType = Record<string, Task[]>    // тоже самое что [todolistId: string]: TaskType[]

export const App = () => {

  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch();

  // tasks
  const deleteTask = (payload: { taskId: TaskType["id"], todolistId: TodolistType["id"] }) => {
    const {taskId, todolistId} = payload
    dispatch(deleteTaskAC({todolistId: todolistId, id: taskId}))
  }

  const createTask = (payload: { title: TaskType["title"], todolistId: TodolistType["id"] }) => {
    const {title, todolistId} = payload
    dispatch(createTaskAC({title, todolistId}))
  }

  const changeTaskStatus = (payload: { taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"] }) => {
    const {taskId, isDone, todolistId} = payload
    dispatch(changeTaskStatusAC({id: taskId, isDone, todolistId}))
  }

  const changeTaskTitle = (payload: { taskId: TaskType["id"], title: TaskType["title"], todolistId: TodolistType["id"] }) => {
    const {taskId, title, todolistId} = payload
    dispatch(changeTaskTitleAC({id: taskId, title, todolistId}))
  }


  // todolists
  const deleteTodolist = (todolistId: TodolistType["id"]) => {
    dispatch(deleteTodolistAC({id: todolistId}))
  }

  const createTodolist = (title: TodolistType["title"]) => {
    dispatch(createTodolistAC(title))
  }

  const changeTodolistFilter = (payload: { filter: FilterValueType, todolistId: TodolistType["id"] }) => {
    const {filter, todolistId} = payload
    dispatch(changeTodolistFilterAC({ filter, id: todolistId }))
  }

  const changeTodolistTitle = (payload: { title: TodolistType["title"], todolistId: TodolistType["id"] }) => {
    const {title, todolistId} = payload
    dispatch(changeTodolistTitleAC({title, id: todolistId}))
  }

  //   UI
  const todolistsComponents = todolists.map(tl => {
    const filteredTasks = getFilterTasks(tasks[tl.id], tl.filter)
    return (
      <Grid2 key={tl.id}>
        <Paper
          elevation={6}
          sx={{padding: "15px"}}
        >
          <TodolistItem
            todolistId={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            deleteTask={deleteTask}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            filter={tl.filter}
            changeTodolistFilter={changeTodolistFilter}
            deleteTodolist={deleteTodolist}
            changeTodolistTitle={changeTodolistTitle}
          />
        </Paper>
      </Grid2>
    )
  })
  const [isDark, setDark] = useState(false)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#81efd6',
      },
      secondary: {
        main: '#1b806b'
      },
      mode: isDark ? "dark" : "light",
    },
  })
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Container
              maxWidth="lg"
              sx={container}
            >
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <Box>
                <Switch onChange={() => setDark(!isDark)} />
                <NavButton size={'small'}>Sign in</NavButton>
                <NavButton size={'small'}>Sign up</NavButton>
                <NavButton
                  size={'small'}
                  background={theme.palette.secondary.light}
                >Faq</NavButton>
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Grid2
            container
            sx={{p: "15px 0"}}
          >
            <CreateItemForm
              createItem={createTodolist}
              maxTitleLength={20}
            />
          </Grid2>
          <Grid2
            container
            spacing={8}
          >
            {todolistsComponents}
          </Grid2>
        </Container>
      </ThemeProvider>
    </div>
  )
}


