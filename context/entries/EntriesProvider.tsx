import { FC, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import  { entriesApi } from '../../apis'

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


    //Method
    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description })
        dispatch({ type: '[Entry] - ADD_ENTRY', payload: data })
    }


    const updateEntry = async ({_id, description, status}: Entry) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}` ,{ description, status });
            dispatch({ type: '[Entry] - UPDATE_ENTRY', payload: data })
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
                    
                }}>
            {children}
        </EntriesContext.Provider>
    )
}
