import { useContext } from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { UIContext } from '../../context/ui'


export const Navbar: React.FC = () => {

  const { openSidebar } = useContext(UIContext)

  return (
    <AppBar 
      position='sticky'
      sx={{
          height: '80px',
          justifyContent:'center',
          marginBottom:'15px'
        }}
    >
      <Toolbar>
        <IconButton
          onClick={ openSidebar }
        >
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant="h6">Open Jira</Typography>
      </Toolbar>
    </AppBar>
  );
};
