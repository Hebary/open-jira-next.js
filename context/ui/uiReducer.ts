import { UIState } from "./";

type UIActionType =
  | { type: "[UI]-OPEN_SIDEBAR" }
  | { type: "[UI]-CLOSE_SIDEBAR" }
  | { type: "[UI]-IS_ADDING_ENTRY", payload: boolean }
  | { type: "[UI]-ON_DRAG_START" }
  | { type: "[UI]-ON_DRAG_END" }


export const uiReducer = (state: UIState, action: UIActionType): UIState => {

  switch (action.type) {

    case "[UI]-OPEN_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: true,
      };
      
    case "[UI]-CLOSE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: false,
      };
      
    case "[UI]-IS_ADDING_ENTRY": 
      return {
        ...state,
        isAddingEntry: action.payload,
      };
      
    case "[UI]-ON_DRAG_START": 
      return {
        ...state,
        isDragging: true,
      };
      
    case "[UI]-ON_DRAG_END": 
      return {
        ...state,
        isDragging: false,
      };

    default:
      return state;
  }
};
