import { useContext } from 'react'

import { UIContext } from '../../context/ui';

import { FC } from 'react'
import { Box, Drawer, List, ListItemIcon, Typography }  from "@mui/material"
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import OutboxOutlinedIcon from '@mui/icons-material/OutboxOutlined';
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from '@mui/material/ListItemButton';

export const Sidebar: FC = () => {
  
    const { isSidebarOpen, closeSidebar } = useContext(UIContext)

    return (
        <Drawer
            anchor='left'
            open={ isSidebarOpen }
            onClose={ closeSidebar }
        >
            <Box sx={{padding:'5px 10px'}}>
                <Typography variant='h6' sx={{textAlign:'center', mt: 2}}>Menu</Typography>
            </Box>

            <List>
                {   
                    menuItems.map((text, index) => (
                        <ListItemButton  key={ text }>
                            <ListItemIcon>
                                {index % 2 === 0 ? <ForwardToInboxOutlinedIcon /> : <OutboxOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText primary={ text }/>
                        </ListItemButton>
                        )
                    )
                }
            </List>
        </Drawer>
    )
}

const menuItems = [
    'Inbox',
    'Outbox',
    'Send Email',
    'Drafts'
];
