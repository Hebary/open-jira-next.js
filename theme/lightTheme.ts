import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#FFF2F2'
        },
        primary: {
            main: '#8EA7E9'
        },
        secondary: {
            main: '#7286D3'
        },
        error: {
            main: red.A400
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#7286D3'
                }

            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#fff',
                }
            }
         },
         MuiCard:{
            styleOverrides: {
                root:{
                    backgroundColor: '#E5E0FF',
                }
            }
         },
    }
});
  
  