import { createSlice } from "@reduxjs/toolkit";



const userInitialState = {
  user:null
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: userInitialState,
  reducers: {
    setUserstate (state,action){
      state.user = action.payload.user
    },
    updateUser (state,action) {
      const user = state.user;
      user[action.payload.key] = action.payload.value
    }
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
