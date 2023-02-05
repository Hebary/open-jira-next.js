import { createContext } from 'react';


interface ContextUIProps {
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    
    isAddingEntry: boolean
    setIsAddingaEntry: (value:boolean) => void;
    
    isDragging: boolean;
    startDragging: () => void;
    endDragging: () => void;
}

export const UIContext = createContext( {} as ContextUIProps );