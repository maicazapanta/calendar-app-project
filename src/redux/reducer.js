import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addEventReducer = createSlice({
  name: "events",
  initialState,
  reducers: {
    //here we will write our reducer
    //Adding events
    addEvents: (state, action) => {
      state.push(action.payload);
      return state;
    },
    //remove events
    removeEvents: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    //update events
    updateEvents: (state, action) => {
      return state.map((event) => {
        if (event.id === action.payload.id) {
          return {
            ...event,
            item: action.payload.item,
          };
        }
        return event;
      });
    },
    //completed
    completeEvents: (state, action) => {
      return state.map((event) => {
        if (event.id === action.payload) {
          return {
            ...event,
            completed: true,
          };
        }
        return event;
      });
    },
  },
});

export const { addEvents, removeEvents, updateEvents, completeEvents } =
  addEventReducer.actions;
export const reducer = addEventReducer.reducer;
