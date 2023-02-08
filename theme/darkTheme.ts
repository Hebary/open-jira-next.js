import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#0F4C75'
    },
    secondary: {
      main: "#5B8FB9",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    
      MuiAppBar:{
        styleOverrides: {
          root:{
            backgroundColor: '#0F4C75'
          },
          
        },
        defaultProps:{
          elevation: 0
        }
      }
    },
});
