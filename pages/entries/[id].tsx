import { ChangeEvent, useState, useMemo, useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router'
import { Card, CardHeader, Grid, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Layout } from "@/components/layout"
import { Entry, EntryStatus } from "@/interfaces";

import { dbEntries } from '@/db';
import { EntriesContext } from '@/context/entries';
import { dateFunctions } from '@/utils';
import { grey } from '@mui/material/colors';

interface Props {
    entry: Entry
}

export const EntryEdition: NextPage<Props> = ({ entry }) => {

    const validStatus : EntryStatus[] = ['pending', 'in-progress', 'finished']
   
    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(()=> inputValue.length<=0 && touched, [inputValue, touched])
    
    const { updateEntry,  deleteEntry } = useContext(EntriesContext)
    const router = useRouter()
    
    const onChangeFieldEvent = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }
    
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        if( validStatus.some( status => status === e.target.value) ){
            setStatus( e.target.value as EntryStatus );
        }
    }    

    const onSave = () => {
        if(inputValue.length === 0) return;

        const entryToUpdate: Entry = {
            ...entry,
            description:inputValue,
            status
        }

        updateEntry(entryToUpdate, true);
        setTimeout(() => {
            router.push('/')
        },1500)
    }
    const onDelete = () => {
        deleteEntry(entry, true);
        setTimeout(() => {
            router.push('/')
        },1500)
    }
    return (
        <Layout title={`${inputValue.substring(0,22) + '...'}`}>
            
            <Grid
                container
                className='animate'
                justifyContent={'center'}
                sx={{ mt:2 }}
            >
                <Grid
                    item
                    xs={ 12 }
                    sm={ 8 }
                    md={ 6 }
                >
                    <Card sx={{ p:1, pb:2 }}>
                        <CardHeader 
                            title='Entry' 
                            subheader={`Created ${dateFunctions.getFormatDistanceToNow(entry.createdAt)} ago`}
                        />
                        <CardContent
                        >
                            <TextField
                                fullWidth
                                placeholder='Edit Entry'
                                sx={{ mt: 1, mb: 1}}
                                autoFocus
                                multiline
                                label='New Entry'
                                onBlur= { () => setTouched( !touched ) }
                                onChange={ onChangeFieldEvent }
                                value={ inputValue }
                                helperText={ isNotValid && 'Field is required' }
                                error={ isNotValid }
                            />

                            <FormControl>
                                <FormLabel sx={{ my:1 }}>
                                    Status:
                                </FormLabel>
                                <RadioGroup 
                                    row 
                                    onChange={onStatusChange}
                                    value={ status }
                                    >
                                    {
                                            validStatus.map((status)=>
                                        ( 
                                            <FormControlLabel 
                                                key={status}
                                                value={status}
                                                control={<Radio/>}
                                                label={ capitalize(status) }
                                            />
                                        )
                                    )}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions sx={{justifyContent:'end', mb:.5}}>
                            <Button 
                                variant="contained" 
                                sx={{mr: 4}} 
                                endIcon={ <SaveAsOutlinedIcon/> }
                                onClick={onSave}
                                disabled={ inputValue.length<=0}
                                >
                                Save Changes
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>

            </Grid>

            <IconButton
                sx={{
                    position:'fixed',
                    bottom:30,
                    right:30,
                    backgroundColor:grey[900],
                }}
                onClick={ onDelete }
                >
                <DeleteOutlinedIcon/>
            </IconButton>
        
        </Layout>
    )
}
// You should use getServerSideProps when you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { id } = ctx.params as { id: string }
    
    const entry = await dbEntries.getEntryById(id)

    if(!entry) {
        return {
            redirect : {
                destination : '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
    
}

export default EntryEdition