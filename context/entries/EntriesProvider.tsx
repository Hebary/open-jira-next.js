import { FC, useReducer, useEffect } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import  { entriesApi } from '../../apis'
import { useSnackbar } from 'notistack';

interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface EntriesState {
    entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
   entries: []
}

export const EntriesProvider: FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar()
    //Method
    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description })
        dispatch({ type: '[Entry] - ADD_ENTRY', payload: data })
    }


    const updateEntry = async ({_id, description, status}: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}` ,{ description, status });
            dispatch({ type: '[Entry] - UPDATE_ENTRY', payload: data })
            //snackbar after update entry
            if(showSnackbar) {
            
                enqueueSnackbar(`Entry successfully update`,{
                variant:'success',
                autoHideDuration:1500,
                anchorOrigin: {
                    vertical:'top',
                    horizontal:'right'
                    }
                });
            }
        } catch (error) {
            console.log({error});
        }
        
    }
    const deleteEntry = async (entry: Entry, showSnackbar = false)  => {
        try {
            const { data } = await entriesApi.delete(`/entries/${entry._id}`);
            dispatch({ type: '[Entry] - DELETE_ENTRY' })
            state.entries = state.entries.filter((e) => e._id !== entry._id);
            // snackbar after delete entry
            if(showSnackbar) {
                enqueueSnackbar(`${ data.message }`,{
                variant:'error',
                autoHideDuration:1500,
                anchorOrigin: {
                    vertical:'top',
                    horizontal:'right'
                    }
                });
            }
        } catch (error) {
            console.log({error});
        }
        
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] - REFRESH_ENTRIES', payload: data })
    }

    useEffect(() => {
        refreshEntries();
    },[]);


    return (
        <EntriesContext.Provider
            value={{
                    ...state,
                    //methods
                    addNewEntry,
                    updateEntry,
                    deleteEntry
                    
                }}>
            {children}
        </EntriesContext.Provider>
    )
}
