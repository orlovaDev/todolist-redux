import {AppBar, Box, Container, IconButton, Switch, Toolbar} from "@mui/material";
import {container} from "@/TodolistItem.styles.ts";
import MenuIcon from "@mui/icons-material/Menu";
import {NavButton} from "@/NavButton.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";



export const Header = () => {

  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch();

  const changeMode = () => {
    const nextMode = themeMode === 'light' ? 'dark' : 'light'
    dispatch(changeThemeModeAC({ themeMode: nextMode }))
  }

  return (
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
            <Switch
              checked={themeMode === 'dark'}
              onChange={changeMode}
            />
            <NavButton size={'small'}>Sign in</NavButton>
            <NavButton size={'small'}>Sign up</NavButton>
            <NavButton size={'small'}>Faq</NavButton>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

