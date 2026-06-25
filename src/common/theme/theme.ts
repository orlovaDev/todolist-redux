 import {createTheme} from "@mui/material";
 import {ThemeMode} from "../../app/app-reducer.ts";

 export const getTheme = (themeMode: ThemeMode) => {
   const isDark = themeMode === 'dark';

   return createTheme({
     palette: {
       mode: isDark ? "dark" : "light",
       primary: {
         main: isDark ? '#A67C65' : '#3D251E',
       },
       secondary: {
         main: isDark ? '#F2E6E0' : '#8A5A44',
       },
       background: {
         default: isDark ? '#1E1614' : '#F5EBE6',
         paper: isDark ? '#2D201D' : '#FFFFFF',
       },
       text: {
         primary: isDark ? '#F2E6E0' : '#3D251E',
         secondary: isDark ? '#A67C65' : '#8A5A44',
       },
     },
   });
 };