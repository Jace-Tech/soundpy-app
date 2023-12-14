/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice } from '@reduxjs/toolkit';
import { APP_CARD_STYLE, APP_MODE_KEY, APP_SHOW_AMOUNT_KEY, Storage } from '../../utils/storage';


type CardType =  "bordered" | "bg";
type InitialStateType = {
  mode: "light" | "dark";
  hideAmount: boolean;
  cardStyle: CardType
}
const initialState: InitialStateType = { 
  mode: Storage.getItem(APP_MODE_KEY) as ("light" | "dark") || "light",
  hideAmount: Boolean(Storage.getItem(APP_SHOW_AMOUNT_KEY)),
  cardStyle: Storage.getItem(APP_CARD_STYLE) || "bordered"
}

const settingsSlice = createSlice({
  initialState, 
  name: 'settings', 
  reducers: {  
    setAppMode: (state, action) => {
      Storage.setItem(APP_MODE_KEY, action.payload! as string)
      state.mode = action.payload!
    },
    changeAmountMode: (state, action) => {
      Storage.setItem(APP_SHOW_AMOUNT_KEY, action.payload!)
      state.hideAmount = action.payload! as boolean;
    },
    changeCardStyle: (state, action) => {
      Storage.setItem(APP_CARD_STYLE, action.payload! as CardType)
      state.cardStyle = action.payload! as CardType
    }
  } 
})


export const { setAppMode, changeAmountMode, changeCardStyle } = settingsSlice.actions
export default settingsSlice.reducer
