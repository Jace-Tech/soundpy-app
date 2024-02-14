/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice } from '@reduxjs/toolkit';


type InitialStateType = {
  contents: ContentFeedType[];
}

const initialState: InitialStateType = { 
    contents: []
}

const dataStore = createSlice({
  initialState, 
  name: 'dataStore', 
  reducers: { 
    populateContent: (state, action) => {
      state.contents = action.payload
    },
  } 
})


export const { populateContent } = dataStore.actions
export default dataStore.reducer
