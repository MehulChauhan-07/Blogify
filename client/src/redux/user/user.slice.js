import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const payload = action.payload;
      state.isLoggedIn = true;
      state.user = payload;
      // Log user data for debugging
      console.log("User data saved to Redux:", payload);
    },
    removeUser: (state, action) => {
      console.log("Removing user data from Redux");
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
