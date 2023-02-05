import { FC, useContext, useMemo } from 'react';
import { Paper, List } from "@mui/material";

import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui';

import {  EntryStatus } from '../../interfaces';
import { EntryCard } from "./";

import styles from './EntryList.module.css'



interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }: Props) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    const entriesByStatus = useMemo( 
            () => entries.filter( entry => entry.status === status), 
        [entries, status]
    ); 
    
    const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }
    
    const onDropEntry = (e: React.DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text');
        const entry = entries.find( entry => entry._id === id )!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
        
    }

    return (
        <div 
            onDrop={ onDropEntry }
            onDragOver={ allowDrop }
            className={ isDragging ? styles.dragging : '' }
        >
            <Paper 
                sx={{height:'calc( 100vh - 180px )', boxShadow:0 , overflow:'hidden', background:'transparent', p: 1 }}>
                { /*opacity changes according to dragging*/ }
                <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all .4s' }}>
                    {   
                        entriesByStatus.map( entry => (
                            <EntryCard key={ entry._id } entry={ entry }/>
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
