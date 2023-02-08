import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#FFF2F2'
        },
        primary: {
            main: '#8EA4E9'
        },
        secondary: {
            main: '#73AEC3'
        },
        error: {
            main: red.A400
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#main.primary'
                },
            },
            defaultProps: {
                elevation: 0
            }
        }        ,
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
         MuiButton:{
            styleOverrides: {
                root: {
                    color: '#FFF',
                    backgroundColor: 'main.primary',
                }
            }
        }
    }

});
  
  