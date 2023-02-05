import { useReducer } from 'react';
import { UIContext, uiReducer } from './';


interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface UIState {
    isSidebarOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

export const UI_INITIAL_STATE: UIState = {
   isSidebarOpen: false,
   isAddingEntry: false,
   isDragging: false,
}

export const UIProvider: React.FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);


     const openSidebar = () => {
        dispatch({
            type: '[UI]-OPEN_SIDEBAR',
        })
    }
     const closeSidebar = () => {
        dispatch({
            type: '[UI]-CLOSE_SIDEBAR',
        })
    }

    const setIsAddingaEntry = (value:boolean) => {
        dispatch({
            type: '[UI]-IS_ADDING_ENTRY',
            payload: value,
        })
    }

    const startDragging = () => {
        dispatch({
            type: '[UI]-ON_DRAG_START',
        })
    }

    const endDragging = () => {
        dispatch({
            type: '[UI]-ON_DRAG_END',
        })
    }

    return (
        <UIContext.Provider
            value={{
                    ...state,
                    // functions / methods
                    closeSidebar,
                    openSidebar,

                    setIsAddingaEntry,

                    startDragging,
                    endDragging,
                }}>
            {children}
        </UIContext.Provider>
    )
}
