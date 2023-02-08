import { useContext, FC } from 'react'
import NextLink from 'next/link'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { AppBar, Toolbar, IconButton, Typography} from "@mui/material";
import { UIContext } from '../../context/ui'

export const Navbar: FC = () => {

  const { openSidebar } = useContext(UIContext)
  
  return (
    <AppBar 
      position='sticky'
      sx={{
          height: '60px',
          justifyContent:'center',
          marginBottom:'15px'
        }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <IconButton
          onClick = { openSidebar }
        >
          <MenuOutlinedIcon />
        </IconButton>
          <NextLink href={'/'} style={{textDecoration: 'none'}}>
            <Typography  variant="h5"  color='#FFF2F2'>Open Jira App</Typography>
          </NextLink>
        <IconButton sx={{ml:5}}
          onClick= { () => console.log('Dark theme on') }
        >
          <DarkModeOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
