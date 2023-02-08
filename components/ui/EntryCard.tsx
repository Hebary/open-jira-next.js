import { FC, useContext } from "react";
import { useRouter } from 'next/router'
import { Card, CardActionArea, CardContent, CardActions, Typography } from "@mui/material";
import { UIContext } from '../../context/ui';
import { Entry } from '@/interfaces';
import { dateFunctions } from "@/utils";



interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }: Props) => {
    
    const { startDragging, endDragging } = useContext(UIContext);
    const router = useRouter();
    
    const onDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('text', entry._id);
        startDragging();
    }


    const handleClick = () => {
        router.push(`/entries/${entry._id}`)
    }    
 
    return (
        <Card sx={{ mb: 1 } }
        //Drag events
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ endDragging }
            onClick={ handleClick }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace:'pre-line' }}> 
                        { entry.description }  
                    </Typography>
                </CardContent>


                <CardActions sx={{display:'flex', justifyContent:'end', pr:2}}>
                    <Typography variant='body2' sx={{ whiteSpace:'pre-line' }}>
                        { dateFunctions.getFormatDistanceToNow( entry.createdAt)  }
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
};
