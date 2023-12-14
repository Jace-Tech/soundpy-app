/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice } from '@reduxjs/toolkit';
import { APP_USER_KEY, Storage } from '../../utils/storage';


type InitialStateType = {
  user: UserData | null;
  token: TokenData | null;
}
const data =  Storage.getItem(APP_USER_KEY)
const initialState: InitialStateType = { 
  user: data && data !== "null" ? JSON.parse(data as string).user : null,
  token: data && data !== "null" ? JSON.parse(data as string).token : null,
}

const userStore = createSlice({
  initialState, 
  name: 'userStore', 
  reducers: {  
    loginSucess: (state, action) => {
      Storage.setItem(APP_USER_KEY, JSON.stringify(action.payload!)) // {user, token}
      state.user = (action.payload as any).user satisfies UserData
      state.token = (action.payload as any).token
    },

    updateUser: (state, action) => {
      const data = {...state, user: action.payload}
      Storage.setItem(APP_USER_KEY, JSON.stringify(data))
      state.user = action.payload
    },
    logout: (state) => {
      Storage.removeItem(APP_USER_KEY)
      state.user = null
    }
  } 
})


export const { loginSucess, logout, updateUser } = userStore.actions

export default userStore.reducer
