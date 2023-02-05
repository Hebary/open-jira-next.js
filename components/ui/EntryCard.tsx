import { useContext } from "react";
import { Card, CardActionArea, CardContent, CardActions, Typography } from "@mui/material";
import { UIContext } from '../../context/ui/UIContext';
import { Entry } from '../../interfaces';



interface Props {
    entry: Entry
}

export const EntryCard: React.FC<Props> = ({ entry }: Props) => {
    
    const { startDragging, endDragging } = useContext(UIContext);

    
    const onDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('text', entry._id);
        startDragging();
    }
 
 
    return (
        <Card sx={{ mb: 1 }}
        //Dragg events
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ endDragging }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace:'pre-line' }}> 
                        { entry.description }  
                    </Typography>
                </CardContent>


                <CardActions sx={{display:'flex', justifyContent:'end', pr:2}}>
                    <Typography variant='body2' sx={{ whiteSpace:'pre-line' }}>
                        {/* {entry.createdAt}  */} 30 minutes ago
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
};
