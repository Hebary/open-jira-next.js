import { EntriesState } from "./";
import { Entry } from "../../interfaces";

type EntriesActionType =
  | { type: "[Entry] - ADD_ENTRY"; payload: Entry }
  | { type: "[Entry] - UPDATE_ENTRY"; payload: Entry }
  | { type: "[Entry] - REFRESH_ENTRIES"; payload: Entry[] };

export const entriesReducer = ( state: EntriesState,  action: EntriesActionType): EntriesState => {
    switch (action.type) {
        case "[Entry] - ADD_ENTRY":
          return {
            ...state,
            entries: [...state.entries, action.payload],
        };

        case "[Entry] - UPDATE_ENTRY":

          return {
            ...state,
            entries: state.entries.map(entry => {

              if( entry._id === action.payload._id ){

                entry.status = action.payload.status;
                entry.description = action.payload.description;

              }

              return entry;
            }),
          };
        case "[Entry] - REFRESH_ENTRIES":
          return {
            ...state,
            entries: [...action.payload],
          }

        default:
          return state;
  }
};
