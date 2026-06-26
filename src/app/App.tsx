import './App.css'
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectThemeMode} from "./app-selectors.ts";
import {getTheme} from "../common/theme/theme.ts";
import {Header} from "@/Header.tsx";
import {Main} from "@/app/Main.tsx";

export type FilterValueType = 'all' | 'active' | 'completed'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  return (
    <div className="app">
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  )
}


